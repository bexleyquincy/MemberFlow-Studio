import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Plus,
  Award,
  TrendingUp,
  Maximize2
} from 'lucide-react';
import {
  CtaConfig,
  Project,
  SiteConfig,
  PORTFOLIO_HERO_DEFAULT_IMAGE,
  CLASSROOM_DESIGN_HUB_IMAGE,
  LANDING_REAL_ESTATE_IMAGE
} from '../data/siteData';
import { LinkableImage } from '../components/LinkableImage';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  classroomProjects: Project[];
  landingProjects: Project[];
  featuredCaseStudy: Project;
  onOpenContact: () => void;
  onSelectProject: (project: Project) => void;
  onOpenAdmin: () => void;
  onExecuteCta: (cta: CtaConfig | undefined, fallbackAction?: () => void) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  siteConfig,
  classroomProjects,
  landingProjects,
  featuredCaseStudy,
  onOpenContact,
  onSelectProject,
  onOpenAdmin,
  onExecuteCta
}) => {
  const [filterType, setFilterType] = useState<'all' | 'classrooms' | 'landings'>('all');
  const pp = siteConfig.portfolioPage;
  const vis = siteConfig.sectionVisibility;

  const handleProjectClick = (p: Project) => {
    if (p.clickAction && p.clickAction.actionType !== 'none') {
      onExecuteCta(p.clickAction, () => onSelectProject(p));
    } else {
      onSelectProject(p);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* SECTION 1 — PORTFOLIO HERO */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        {siteConfig.theme.showAmbientGlow && (
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>⭐</span>
                <span>{pp.heroEyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                {pp.heroHeadlineLine1} <br />
                <span className="text-blue-500 relative inline-block">
                  {pp.heroHighlightWord}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-500"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C58 3 142 3 198 9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#AAB7CC] leading-relaxed max-w-xl">
                {pp.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onExecuteCta(pp.heroPrimaryCtaAction, onOpenContact)}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{pp.heroPrimaryCtaAction?.label || pp.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onExecuteCta(pp.heroSecondaryCtaAction, () => {
                      const el = document.getElementById('classrooms-gallery');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    })
                  }
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{pp.heroSecondaryCtaAction?.label || pp.heroSecondaryCta}</span>
                </button>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-[#202E43]/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">{pp.heroBadge1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">{pp.heroBadge2}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                <LinkableImage
                  src={pp.heroImage || PORTFOLIO_HERO_DEFAULT_IMAGE}
                  alt={`${siteConfig.brandName} Portfolio Showcase`}
                  fallbackSrc={PORTFOLIO_HERO_DEFAULT_IMAGE}
                  imageLink={pp.heroImageLink}
                  onExecuteAction={onExecuteCta}
                  className="w-full h-auto object-cover object-top max-h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PLATFORM EXPERIENCE STRIP */}
      {vis.showPlatformsStrip && (
        <section className="py-7 bg-[#0C1423] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-xs uppercase font-bold tracking-widest text-slate-400 shrink-0 text-center md:text-left">
                {siteConfig.homePage.platformsHeading}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-bold">
                {siteConfig.homePage.platformsList.map((name, idx) => (
                  <div
                    key={`${name}-${idx}`}
                    className={`flex items-center gap-1.5 transition-colors ${
                      idx === 0
                        ? 'text-white font-extrabold text-base tracking-wide'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {idx === 0 && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
            <span>Admin: Manage Portfolio & Screenshots</span>
          </button>
        </div>
      </section>

      {/* SECTION 3 — SKOOL CLASSROOM PORTFOLIO */}
      {(filterType === 'all' || filterType === 'classrooms') && (
        <section id="classrooms-gallery" className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  {pp.classroomsEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {pp.classroomsHeading}
                </h2>
                <p className="text-base text-slate-600 max-w-xl">{pp.classroomsSubtitle}</p>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing {classroomProjects.length} Classroom Architectures
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {classroomProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProjectClick(p)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#DCE3EF] shadow-md hover:shadow-2xl hover:border-blue-400 transition-all flex flex-col"
                >
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
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== CLASSROOM_DESIGN_HUB_IMAGE) {
                          img.src = CLASSROOM_DESIGN_HUB_IMAGE;
                        }
                      }}
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
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{p.description}</p>
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

      {/* SECTION 4 — COMMUNITY LANDING PAGE PORTFOLIO */}
      {(filterType === 'all' || filterType === 'landings') && (
        <section id="landing-gallery" className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                  {pp.landingsEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  {pp.landingsHeading}
                </h2>
                <p className="text-base text-[#AAB7CC] max-w-xl">{pp.landingsSubtitle}</p>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Showing {landingProjects.length} Custom Community Funnels
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {landingProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProjectClick(p)}
                  className="group cursor-pointer bg-[#152033] rounded-2xl overflow-hidden border border-[#202E43] shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all flex flex-col"
                >
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
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== LANDING_REAL_ESTATE_IMAGE) {
                          img.src = LANDING_REAL_ESTATE_IMAGE;
                        }
                      }}
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
                      <p className="text-sm text-[#AAB7CC] mt-2 line-clamp-2">{p.description}</p>
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

      {/* SECTION 5 — FEATURED PROJECT / CASE STUDY */}
      {vis.showCaseStudy && (
        <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  {pp.caseStudyEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {pp.caseStudyHeading}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {featuredCaseStudy.description}
                </p>

                <div className="space-y-3 pt-2">
                  {pp.caseStudyBullets.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={() =>
                      onExecuteCta(pp.caseStudyCtaAction, () => onSelectProject(featuredCaseStudy))
                    }
                    className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                  >
                    <span>{pp.caseStudyCtaAction?.label || pp.caseStudyCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="group rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-xl p-3 hover:border-blue-400 transition-all">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                    <LinkableImage
                      src={featuredCaseStudy.imageUrl}
                      alt={featuredCaseStudy.title}
                      fallbackSrc={CLASSROOM_DESIGN_HUB_IMAGE}
                      imageLink={pp.caseStudyImageLink}
                      onExecuteAction={onExecuteCta}
                      className="w-full h-full object-cover object-top"
                      wrapperClassName="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6 — OUR CAPABILITIES */}
      <section className="py-16 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-3xl font-extrabold font-heading text-white tabular-nums mb-1">
                {siteConfig.metrics.majorProjects}
              </div>
              <div className="text-xs text-[#AAB7CC]">{siteConfig.metrics.majorProjectsLabel}</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-3xl font-extrabold font-heading text-white tabular-nums mb-1">
                {siteConfig.metrics.clientSatisfaction}
              </div>
              <div className="text-xs text-[#AAB7CC]">Client Focus & Quality</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-2xl font-extrabold font-heading text-white mb-1">
                {pp.metric3Value}
              </div>
              <div className="text-xs text-[#AAB7CC]">{pp.metric3Label}</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#152033] border border-[#202E43]">
              <div className="text-2xl font-extrabold font-heading text-white mb-1">
                {pp.metric4Value}
              </div>
              <div className="text-xs text-[#AAB7CC]">{pp.metric4Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CONVERSION BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                {pp.ctaHeading}
              </h2>
              <p className="text-base sm:text-lg text-blue-100">{pp.ctaSubtitle}</p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onExecuteCta(pp.ctaButtonAction, onOpenContact)}
                className="px-8 py-4 rounded-full bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-base shadow-2xl active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{pp.ctaButtonAction?.label || pp.ctaButtonText}</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
