import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Eye, 
  Filter, 
  Plus, 
  Award,
  Users,
  TrendingUp,
  Layout,
  Maximize2
} from 'lucide-react';
import { Project, SiteConfig, FEATURED_CASE_STUDY } from '../data/siteData';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  classroomProjects: Project[];
  landingProjects: Project[];
  onOpenContact: () => void;
  onSelectProject: (project: Project) => void;
  onOpenAdmin: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  siteConfig,
  classroomProjects,
  landingProjects,
  onOpenContact,
  onSelectProject,
  onOpenAdmin
}) => {
  const [filterType, setFilterType] = useState<'all' | 'classrooms' | 'landings'>('all');

  const platforms = [
    { name: 'Skool', highlight: true },
    { name: 'Wix', highlight: false },
    { name: 'Squarespace', highlight: false },
    { name: 'Circle.so', highlight: false },
    { name: 'Mighty Networks', highlight: false },
    { name: 'Kajabi', highlight: false }
  ];

  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* =========================================================================
          SECTION 1 — PORTFOLIO HERO (Visual match to Reference 3)
      ========================================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>⭐</span>
                <span>Our Portfolio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                See Our Work <br />
                <span className="text-blue-500 relative inline-block">
                  in Action
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 9C58 3 142 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#AAB7CC] leading-relaxed max-w-xl">
                Explore real examples of Skool classrooms and community landing pages we've designed, organized and optimized for growth.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('classrooms-gallery');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Our Work</span>
                </button>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-6 pt-6 border-t border-[#202E43]/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Premium Designs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Real Results</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual from Reference 3 */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                <img
                  src="/assets/aistudio/MemberFlow_Studio_Portfolio_Showcase_3b2ddf1e.png"
                  alt="MemberFlow Studio Portfolio Showcase"
                  className="w-full h-auto object-cover object-top max-h-[500px]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — PLATFORM EXPERIENCE STRIP
      ========================================================================== */}
      <section className="py-7 bg-[#0C1423] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs uppercase font-bold tracking-widest text-slate-400 shrink-0 text-center md:text-left">
              Trusted by Community Owners Across Industries:
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-bold">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-1.5 transition-colors ${
                    p.highlight ? 'text-white font-extrabold text-base tracking-wide' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.highlight && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-[#152033] rounded-xl border border-[#202E43]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#AAB7CC] hover:text-white'
              }`}
            >
              All Projects ({classroomProjects.length + landingProjects.length})
            </button>
            <button
              onClick={() => setFilterType('classrooms')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'classrooms' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#AAB7CC] hover:text-white'
              }`}
            >
              Classroom Setups ({classroomProjects.length})
            </button>
            <button
              onClick={() => setFilterType('landings')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'landings' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#AAB7CC] hover:text-white'
              }`}
            >
              Landing Pages ({landingProjects.length})
            </button>
          </div>

          <button
            onClick={onOpenAdmin}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Admin: Add Real Project Screenshots</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — SKOOL CLASSROOM PORTFOLIO
      ========================================================================== */}
      {(filterType === 'all' || filterType === 'classrooms') && (
        <section id="classrooms-gallery" className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  Skool Classroom Designs
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Professional Classroom Setups
                </h2>
                <p className="text-base text-slate-600 max-w-xl">
                  Organized, beautiful and engaging classrooms that keep your members focused and coming back.
                </p>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing {classroomProjects.length} Classroom Architectures
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {classroomProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#DCE3EF] shadow-md hover:shadow-2xl hover:border-blue-400 transition-all flex flex-col"
                >
                  {/* Browser/Device Frame */}
                  <div className="bg-[#10192B] px-4 py-2.5 flex items-center gap-2 border-b border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] text-slate-400 font-mono ml-2 truncate">
                      skool.com/{p.id}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          {p.category}
                        </span>
                        {p.highlight && (
                          <span className="text-[11px] font-semibold text-slate-500">
                            {p.highlight}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-blue-600">
                      <span>Click to view high-res preview</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4 — COMMUNITY LANDING PAGE PORTFOLIO
      ========================================================================== */}
      {(filterType === 'all' || filterType === 'landings') && (
        <section id="landing-gallery" className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                  Community Landing Pages
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  High-Converting <span className="text-blue-500">Landing Pages</span>
                </h2>
                <p className="text-base text-[#AAB7CC] max-w-xl">
                  Stunning, conversion-focused landing pages that attract the right audience and turn visitors into active members.
                </p>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Showing {landingProjects.length} Custom Community Funnels
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {landingProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="group cursor-pointer bg-[#152033] rounded-2xl overflow-hidden border border-[#202E43] shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all flex flex-col"
                >
                  {/* Browser chrome */}
                  <div className="bg-[#0A101D] px-4 py-2.5 flex items-center gap-2 border-b border-[#202E43]">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] text-slate-400 font-mono ml-2 truncate">
                      preview.memberflowstudio.com/{p.id}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0A101D]">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                          {p.category}
                        </span>
                        {p.highlight && (
                          <span className="text-[11px] font-semibold text-slate-400">
                            {p.highlight}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[#AAB7CC] mt-2 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#202E43]/60 mt-4 flex items-center justify-between text-xs font-semibold text-blue-400">
                      <span>Click to view full design</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 5 — FEATURED PROJECT / CASE STUDY (Asymmetric Spotlight)
      ========================================================================== */}
      <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Featured Case Study
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                From Vision to a Thriving Community
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                See how we transformed an idea into a well-structured, engaging and growth-ready Skool community for <span className="font-semibold text-slate-900">The Glam Crafter Empire</span>.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Complete Skool Setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Organized Classrooms & Custom Thumbnails</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Engaging Member Experience & 3-Step Onboarding</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Growth-Focused Design & Funnels</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onSelectProject(FEATURED_CASE_STUDY)}
                  className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>View Case Study Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div 
                onClick={() => onSelectProject(FEATURED_CASE_STUDY)}
                className="cursor-pointer group rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-xl p-3 hover:border-blue-400 transition-all"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src="https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png"
                    alt="The Glam Crafter Empire"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — OUR CAPABILITIES (Dark Navy 5 Indicators)
      ========================================================================== */}
      <section className="py-16 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-3xl font-extrabold font-heading text-white tabular-nums mb-1">
                {siteConfig.metrics.majorProjects}
              </div>
              <div className="text-xs text-[#AAB7CC]">Major Projects Delivered</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-3xl font-extrabold font-heading text-white tabular-nums mb-1">
                {siteConfig.metrics.clientSatisfaction}
              </div>
              <div className="text-xs text-[#AAB7CC]">Client Focus & Quality</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-2xl font-extrabold font-heading text-white mb-1">
                Creative
              </div>
              <div className="text-xs text-[#AAB7CC]">Tailored Solutions</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-2xl font-extrabold font-heading text-white mb-1">
                Growth Driven
              </div>
              <div className="text-xs text-[#AAB7CC]">Retention Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — FINAL CONVERSION BANNER
      ========================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Ready to Get Similar Results?
              </h2>
              <p className="text-base sm:text-lg text-blue-100">
                Let's create a stunning community experience for you.
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
