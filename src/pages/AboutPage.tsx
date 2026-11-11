import React from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  BookOpen, 
  Settings, 
  Compass, 
  Share2, 
  Award,
  Zap,
  Mail
} from 'lucide-react';
import { SiteConfig } from '../data/siteData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  onOpenContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  siteConfig,
  onOpenContact
}) => {
  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* =========================================================================
          SECTION 1 — FOUNDER-LED HERO (Visual match to Reference 4)
          Includes:
          - Eyebrow: "About MemberFlow Studio"
          - Headline: "Building Communities That Grow." (Grow in electric blue)
          - Testimony Samuel introduction
          - CTAs: "Let's Work Together", "Watch My Story"
          - Right: Confident smiling founder portrait, Skool mockups behind,
            handwritten arrow "Hi, I'm Testimony Samuel"
      ========================================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>⭐</span>
                <span>About MemberFlow Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                Building Communities <br />
                That <span className="text-blue-500 relative inline-block">
                  Grow.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500" viewBox="0 0 160 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 9C45 3 115 3 158 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#AAB7CC] leading-relaxed max-w-xl">
                I'm <span className="text-white font-bold">{siteConfig.founderName}</span>, and I help Skool community owners build, organize and grow thriving communities through strategic setup, better member experiences and ongoing support.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Let's Work Together</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('founder-story');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch My Story</span>
                </button>
              </div>

              {/* Founder quote pill */}
              <div className="p-4 rounded-xl bg-[#152033]/80 border border-[#202E43] max-w-md">
                <p className="text-xs text-slate-300 italic">
                  "{siteConfig.tagline} A platform without structure is noise; with deliberate systems, it becomes transformational."
                </p>
                <div className="text-[11px] font-bold text-blue-400 mt-2">
                  — {siteConfig.founderName}, Founder
                </div>
              </div>
            </div>

            {/* Right Hero Visual from Reference 4 */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                  <img
                    src={siteConfig.founderHeroImage || "/assets/aistudio/Skool_Community_Growth_Dashboard_1f90cb40.png"}
                    onError={(e) => {
                      // Fallback to local asset if external image fails
                      const target = e.currentTarget;
                      if (!target.src.includes('Skool_Community_Growth_Dashboard_1f90cb40.png')) {
                        target.src = '/assets/aistudio/Skool_Community_Growth_Dashboard_1f90cb40.png';
                      }
                    }}
                    alt={siteConfig.founderName}
                    className="w-full h-auto object-cover object-top max-h-[520px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10192B] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>

                {/* Handwritten Callout: Hi, I'm Testimony Samuel */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-right">
                  <div className="font-heading italic font-extrabold text-lg sm:text-xl text-white drop-shadow-md">
                    Hi, I'm {siteConfig.founderName}
                  </div>
                  <div className="text-xs text-blue-300 flex items-center justify-end gap-1">
                    <span>Founder & Community Architect</span>
                    <span>↳</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — FOUNDER STORY (Soft White Surface)
      ========================================================================== */}
      <section id="founder-story" className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder presentation picture */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-xl p-3">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 relative">
                  <img
                    src="https://img.sanishtech.com/u/443ac159dcce6c7643714cda0ea75c0e.png"
                    alt={`${siteConfig.founderName} Speaking`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#10192B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#202E43] text-white">
                    <span className="text-xs font-bold block">{siteConfig.founderName}</span>
                    <span className="text-[10px] text-blue-400">Skool Community Specialist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Story narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                My Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                From Passion to Purpose
              </h2>
              
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  My journey started with a deep interest in online communities and a desire to help people connect, learn and grow.
                </p>
                <p>
                  Today, through MemberFlow Studio, I focus on helping community owners create better-organized Skool experiences, improve their classroom structures and make their communities easier and more enjoyable for members to navigate.
                </p>
                <p>
                  I believe a successful community is about more than simply having a platform. It's about creating an environment where people understand where to start, know what to do next and feel encouraged to participate.
                </p>
              </div>

              {/* 4 Pillars Card */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Community Growth Expert</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Skool Setup & Management</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Member Experience Specialist</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Digital Growth Strategist</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>Explore What I Do</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — MY PHILOSOPHY (Dark Navy 4 Cards)
      ========================================================================== */}
      <section className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              My Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Better Communities. <span className="text-blue-500">Greater Impact.</span>
            </h2>
            <p className="text-base text-[#AAB7CC]">
              I believe online communities can transform lives, build real connections and create lasting value when they are well structured, thoughtfully managed and designed around their members.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-white">
                  Quality Over Quantity
                </h3>
                <p className="text-xs text-[#AAB7CC] leading-relaxed">
                  Focus on creating meaningful member experiences rather than simply chasing raw follower numbers.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-white">
                  Members First
                </h3>
                <p className="text-xs text-[#AAB7CC] leading-relaxed">
                  Make it effortless for members to find content, participate in discussions, and feel heard.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-white">
                  Continuous Improvement
                </h3>
                <p className="text-xs text-[#AAB7CC] leading-relaxed">
                  Consistently test engagement strategies, refine module pathways, and improve retention loops.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-white">
                  Long-Term Partnership
                </h3>
                <p className="text-xs text-[#AAB7CC] leading-relaxed">
                  Build relationships centered around reliable support, transparent advice, and shared success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — SKILLS & CAPABILITIES (Soft White Surface)
      ========================================================================== */}
      <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 6 Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                My Expertise
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Skills & Capabilities
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                With a practical, community-focused approach, I bring together the skills needed to create organized, engaging and growth-ready community experiences.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">01. Skool Community Setup</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">02. Classroom & Course Management</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">03. Member Onboarding Architecture</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">04. Engagement & Experience Improvement</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">05. Social Media Management</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">06. Community Growth Strategy</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>Explore My Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Laptop / Community Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-xl p-3">
                <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src="https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png"
                    alt="Skool Dashboard Showcase"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — HOW I WORK (Dark Navy 3-Step Process)
      ========================================================================== */}
      <section className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              My Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              A Simple Process. <span className="text-blue-500">Real Results.</span>
            </h2>
            <p className="text-base text-[#AAB7CC]">
              I follow a clear and proven process to deliver exceptional community experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#152033] border border-[#202E43] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-heading font-extrabold text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Discover
              </h3>
              <p className="text-sm text-[#AAB7CC] leading-relaxed">
                Understand your goals. We start by learning about your audience, current setup, and the challenges you want to solve.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#152033] border border-[#202E43] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-heading font-extrabold text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Build
              </h3>
              <p className="text-sm text-[#AAB7CC] leading-relaxed">
                Set up, organize and implement solutions—from classroom architecture to onboarding flows and engagement mechanisms.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#152033] border border-[#202E43] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-heading font-extrabold text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Grow
              </h3>
              <p className="text-sm text-[#AAB7CC] leading-relaxed">
                Optimize and support. We ensure smooth day-to-day operations and execute initiatives that maintain long-term retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — FINAL CONVERSION BANNER
      ========================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Let's Build Your Dream Community Together.
              </h2>
              <p className="text-base sm:text-lg text-blue-100">
                Ready to create a better Skool community experience? Let's discuss your goals today.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-base shadow-2xl active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Contact Me Today</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
