import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Mail, MessageSquare, User, Sparkles, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactEmail: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactEmail
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [communityType, setCommunityType] = useState('New Skool Community');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Form submission status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic front-end sanity check
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Primary Netlify serverless endpoint (also works via Vite dev middleware and Netlify redirects)
      const endpoint = '/.netlify/functions/send-contact';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service: communityType,
          subject: subject.trim() || `Inquiry from ${name.trim()} (${communityType})`,
          message: message.trim(),
          website_hp: honeypot // Anti-spam honeypot
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        // SUCCESS STATE: Clear fields only upon confirmed delivery
        setSuccessMessage(
          "Thank you for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible."
        );
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setHoneypot('');
      } else {
        // ERROR STATE: Do not clear user inputs
        const msg = data.error || "Your message couldn't be sent right now. Please try again in a moment or contact us directly by email.";
        setErrorMessage(msg);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback message per specification
      setErrorMessage(
        "Your message couldn't be sent right now. Please try again in a moment or contact us directly by email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#10192B] border border-[#202E43] rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202E43] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {successMessage ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-1 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Community Transformation</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Let's Work Together
                </h3>
                <p className="text-sm text-[#AAB7CC]">
                  Tell Testimony Samuel about your Skool community goals, classroom needs, or growth vision.
                </p>
              </div>

              {/* Error Alert Box */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">
                    {errorMessage}
                    <div className="mt-1">
                      Direct Email:{' '}
                      <a href={`mailto:${contactEmail}`} className="text-white font-semibold underline">
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from real users, caught by spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#202E43]/60 border border-[#202E43] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                      Email Address <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#202E43]/60 border border-[#202E43] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      disabled={isSubmitting}
                      value={communityType}
                      onChange={(e) => setCommunityType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#202E43]/60 border border-[#202E43] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                    >
                      <option value="Skool Community Setup">Skool Community Setup</option>
                      <option value="Classroom & Course Setup">Classroom & Course Setup</option>
                      <option value="Member Onboarding">Member Onboarding Architecture</option>
                      <option value="Community Management">Community Management & Moderation</option>
                      <option value="Engagement & Experience">Engagement & Experience Systems</option>
                      <option value="Community Growth & Social Media">Community Growth & Social Media</option>
                      <option value="Community Landing Page">Community Landing Page Design</option>
                      <option value="Full Transformation">Full End-to-End Transformation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. New Skool Launch Timeline"
                      className="w-full px-3 py-2.5 bg-[#202E43]/60 border border-[#202E43] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Project Details & Goals <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <textarea
                      rows={3}
                      required
                      disabled={isSubmitting}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your community topic, current challenges, or target launch date..."
                      className="w-full pl-9 pr-3 py-2.5 bg-[#202E43]/60 border border-[#202E43] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 text-center sm:text-left">
                    Recipient: <span className="text-blue-400 font-medium">{contactEmail}</span>
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
