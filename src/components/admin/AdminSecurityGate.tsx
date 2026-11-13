import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, Loader2, X, ShieldCheck } from 'lucide-react';
import {
  authenticateAdmin,
  AdminSession,
  getLockoutRemainingSeconds
} from '../../utils/adminAuth';

interface AdminSecurityGateProps {
  onAuthenticated: (session: AdminSession) => void;
  onClose: () => void;
}

export const AdminSecurityGate: React.FC<AdminSecurityGateProps> = ({
  onAuthenticated,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockSeconds, setLockSeconds] = useState<number>(() => getLockoutRemainingSeconds());

  useEffect(() => {
    if (lockSeconds <= 0) return;
    const timer = setInterval(() => {
      const rem = getLockoutRemainingSeconds();
      setLockSeconds(rem);
      if (rem <= 0) setError(null);
    }, 1000);
    return () => clearInterval(timer);
  }, [lockSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockSeconds > 0 || isChecking) return;
    setError(null);
    setIsChecking(true);

    try {
      const result = await authenticateAdmin(email, password);
      if (result.success && result.session) {
        setEmail('');
        setPassword('');
        onAuthenticated(result.session);
      } else {
        setError(result.error || 'Invalid credentials. Access denied.');
        if (result.retryAfter && result.retryAfter > 0) {
          setLockSeconds(result.retryAfter);
        }
      }
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-md bg-[#10192B] border border-[#202E43] rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="Admin Security Verification"
      >
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202E43] transition-colors"
          aria-label="Close security prompt"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2.5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Lock className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-[10px] font-bold uppercase tracking-widest text-blue-300">
              <ShieldCheck className="w-3 h-3" />
              <span>Restricted Access</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
              Admin Control Gate
            </h2>
            <p className="text-xs text-[#AAB7CC] leading-relaxed">
              Sign in with your authorized administrator email and password to manage MemberFlow Studio.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                {error}
                {lockSeconds > 0 && (
                  <div className="mt-1 font-mono text-[11px] text-rose-200">
                    Retry available in {lockSeconds}s
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  disabled={isChecking || lockSeconds > 0}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#152033] border border-[#202E43] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300 mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  disabled={isChecking || lockSeconds > 0}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#152033] border border-[#202E43] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isChecking || lockSeconds > 0}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Access...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Admin Panel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
