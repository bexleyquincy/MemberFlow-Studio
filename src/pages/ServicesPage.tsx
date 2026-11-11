import React from 'react';
import { 
  Settings, 
  BookOpen, 
  Compass, 
  Users, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Layers,
  Check,
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react';
import { CORE_SERVICES, SiteConfig } from '../data/siteData';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  onOpenContact: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  siteConfig,
  onOpenContact
}) => {
  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* =========================================================================
          SECTION 1 — SERVICES HERO (Visual match to Reference 2)
      ========================================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>⭐</span>
                <span>Our Services</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                Complete Skool <br />
                Community <span className="text-blue-500 relative inline-block">
                  Solutions
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 9C58 3 142 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#AAB7CC] leading-relaxed max-w-xl">
                From setup to growth, we provide the expertise and support you need to build, manage and scale thriving online communities.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('core-services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch How It Works</span>
                </button>
              </div>

              {/* 3 Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#202E43]/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">Expert Support</div>
                    <div className="text-[10px] sm:text-xs text-[#AAB7CC]">Every Step of the Way</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">Proven Strategies</div>
                    <div className="text-[10px] sm:text-xs text-[#AAB7CC]">for Real Growth</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">Trusted by</div>
                    <div className="text-[10px] sm:text-xs text-[#AAB7CC]">Community Owners</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual matching Reference 2 */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                <img
                  src="/assets/aistudio/MemberFlow_Studio_Services_Showcase_353900ae.png"
                  alt="MemberFlow Studio Services Showcase"
                  className="w-full h-auto object-cover object-top max-h-[500px]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — CORE SERVICES OVERVIEW (Soft White Surface)
      ========================================================================== */}
      <section id="core-services" className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Core Services
            </h2>
            <p className="text-base text-slate-600">
              Everything you need to build, manage and grow a successful Skool community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((s) => {
              const IconComponent = 
                s.id === 'service-01' ? Settings :
                s.id === 'service-02' ? BookOpen :
                s.id === 'service-03' ? Compass :
                s.id === 'service-04' ? Users :
                s.id === 'service-05' ? Sparkles : TrendingUp;

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-400">
                        {s.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {s.description}
                    </p>

                    <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      {s.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <button
                      onClick={onOpenContact}
                      className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1.5"
                    >
                      <span>Inquire About {s.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — DETAILED SERVICE SHOWCASE (Dark Navy Alternating)
      ========================================================================== */}
      <section className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider">
              Service Details
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              In-Depth Services <span className="text-blue-500">for Maximum Impact</span>
            </h2>
            <p className="text-base text-[#AAB7CC]">
              Get expert solutions tailored to your community's unique needs.
            </p>
          </div>

          {/* Block A: Build & Organize */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Block A — Foundation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Skool Community Setup & Classroom Architecture
              </h3>
              <p className="text-sm sm:text-base text-[#AAB7CC] leading-relaxed">
                From initial group settings and permissions to full curriculum layout, we construct an intuitive learning space that keeps students engaged and prevents drop-off.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Custom thumbnail graphics and unified color styling</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Sequential course progression and resource attachments</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Clear category guidelines that eliminate discussion clutter</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide inline-flex items-center gap-2"
                >
                  <span>Build My Classroom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#202E43] bg-[#152033] shadow-xl p-3">
                <img
                  src="https://img.sanishtech.com/u/b23962d874c57145a61ed60d99809bf2.png"
                  alt="Skool Classroom Architecture"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Block B: Welcome & Engage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-[#202E43] bg-[#152033] shadow-xl p-3">
                <img
                  src="https://img.sanishtech.com/u/7b9e61d8e6f0a3f5cf3e3f287d13c677.png"
                  alt="Member Onboarding Journey"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Block B — Retention
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Member Onboarding & Active Engagement Systems
              </h3>
              <p className="text-sm sm:text-base text-[#AAB7CC] leading-relaxed">
                First impressions dictate whether members stay for months or vanish in days. We craft welcome checklists, automated introductions, and community gamification.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>3-step "Start Here" orientation flow for quick wins</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Weekly prompts, member spotlights, and win-sharing routines</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Leaderboard rewards and level unlock strategies</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide inline-flex items-center gap-2"
                >
                  <span>Improve Engagement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Block C: Manage & Grow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Block C — Scaling
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Community Management, Social Media & Growth
              </h3>
              <p className="text-sm sm:text-base text-[#AAB7CC] leading-relaxed">
                Free up your time as a founder. We handle moderation, daily community operations, announcement broadcasting, and strategic social funnel generation.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Daily queue moderation and spam suppression</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Organic social-to-Skool lead funnel architecture</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Dedicated routine operational reports and metrics</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide inline-flex items-center gap-2"
                >
                  <span>Scale My Community</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#202E43] bg-[#152033] shadow-xl p-3">
                <img
                  src="https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png"
                  alt="Community Management Systems"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — HOW WE WORK (Process Timeline)
      ========================================================================== */}
      <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-base text-slate-600">
              Getting started is simple. Just follow these easy steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#DCE3EF] shadow-sm relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-heading">
                1
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Share Your Goals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tell us about your community, audience, current bottlenecks, and what you want to achieve with your Skool group.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#DCE3EF] shadow-sm relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-heading">
                2
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Get a Strategy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive a custom action plan tailored to your community needs, covering classroom architecture, onboarding, and growth.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#DCE3EF] shadow-sm relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-heading">
                3
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                See the Results
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We implement and organize everything. Watch your members navigate seamlessly, engage actively, and grow sustainably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — FINAL CONVERSION BANNER
      ========================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Ready to Transform Your Skool Community?
              </h2>
              <p className="text-base sm:text-lg text-blue-100">
                Let's build, grow and manage your community together.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-base shadow-2xl active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
