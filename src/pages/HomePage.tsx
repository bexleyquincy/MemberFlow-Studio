import React from 'react';
import {
  Users,
  Star,
  TrendingUp,
  ArrowRight,
  Play,
  Settings,
  BookOpen,
  Compass,
  Share2,
  Plus,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  ChevronDown
} from 'lucide-react';
import {
  SiteConfig,
  Project,
  ServiceItem,
  Testimonial,
  FaqItem,
  GLAM_CRAFTER_CLASSROOM_URL,
  DY_SALSA_CLASSROOM_URL,
  DY_SALSA_LANDING_URL,
  LANDING_REAL_ESTATE_IMAGE,
  HOME_HERO_DEFAULT_IMAGE,
  WHY_CHOOSE_GROWTH_IMAGE,
  CLASSROOM_DESIGN_HUB_IMAGE
} from '../data/siteData';

interface HomePageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  services: ServiceItem[];
  classroomProjects: Project[];
  landingProjects: Project[];
  testimonials: Testimonial[];
  faqItems: FaqItem[];
  onOpenContact: () => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  siteConfig,
  services,
  classroomProjects,
  landingProjects,
  testimonials,
  faqItems,
  onOpenContact,
  onSelectProject
}) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
  const hp = siteConfig.homePage;
  const vis = siteConfig.sectionVisibility;

  // 4 Featured Projects for Homepage Section 4
  const featuredFourProjects = [
    classroomProjects[0] || {
      id: 'h-1',
      title: 'The Glam Crafter Empire Classroom',
      category: 'Premium Community Classroom',
      description: 'Multi-tiered craft masterclass with categorized visual resource libraries.',
      imageUrl: GLAM_CRAFTER_CLASSROOM_URL
    },
    landingProjects[0] || {
      id: 'h-2',
      title: 'DY Salsa Dance Academy Landing Page',
      category: 'Dance & Fitness Community',
      description: 'Vibrant conversion-focused landing page for an online dance academy.',
      imageUrl: DY_SALSA_LANDING_URL
    },
    landingProjects[1] || {
      id: 'h-3',
      title: 'Evergreen Real Estate Community Landing Page',
      category: 'Real Estate Community',
      description: 'Investor portal landing page designed with clear value propositions.',
      imageUrl: LANDING_REAL_ESTATE_IMAGE
    },
    classroomProjects[1] || {
      id: 'h-4',
      title: 'DY Salsa Dance Academy Classroom',
      category: 'Skool Classroom Design',
      description: 'Structured sequential course levels, video modules, and practice drills.',
      imageUrl: DY_SALSA_CLASSROOM_URL
    }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Settings':
        return Settings;
      case 'BookOpen':
        return BookOpen;
      case 'Compass':
        return Compass;
      case 'Users':
        return Users;
      case 'Sparkles':
        return Sparkles;
      case 'Share2':
        return Share2;
      case 'Zap':
        return Zap;
      case 'Plus':
        return Plus;
      default:
        return TrendingUp;
    }
  };

  const whyIcons = [Award, Zap, ShieldCheck, TrendingUp];

  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* SECTION 1 — PREMIUM HERO */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        {siteConfig.theme.showAmbientGlow && (
          <>
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: Editorial & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>🚀</span>
                <span>{hp.heroEyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                {hp.heroHeadlineLine1} <br className="hidden sm:inline" />
                {hp.heroHeadlineLine2}{' '}
                <span className="text-blue-500 relative inline-block">
                  {hp.heroHighlightWord}
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
                {hp.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{hp.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('portfolio-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onNavigate('/portfolio');
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{hp.heroSecondaryCta}</span>
                </button>
              </div>

              {/* 3 Credibility Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#202E43]/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm sm:text-base text-white tabular-nums">
                      {siteConfig.metrics.membersSupported}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#AAB7CC] leading-tight">
                      {siteConfig.metrics.membersLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm sm:text-base text-white tabular-nums">
                      {siteConfig.metrics.clientSatisfaction}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#AAB7CC] leading-tight">
                      {siteConfig.metrics.satisfactionLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm sm:text-base text-white">
                      {siteConfig.metrics.growthStrategies}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#AAB7CC] leading-tight">
                      {siteConfig.metrics.growthLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Layered visual composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                  <img
                    src={hp.heroImage || HOME_HERO_DEFAULT_IMAGE}
                    alt={`${siteConfig.brandName} Community Growth`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.includes('MemberFlow_Studio_Community_Growth_Landing_Page')) {
                        img.src = HOME_HERO_DEFAULT_IMAGE;
                      }
                    }}
                    className="w-full h-auto object-cover object-top max-h-[520px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10192B] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>

                {/* Floating Card 1 */}
                <div className="absolute -top-4 right-2 sm:right-6 bg-[#10192B]/95 backdrop-blur-md border border-[#202E43] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 animate-bounce-subtle">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{hp.heroBadgeTopTitle}</div>
                    <div className="text-[11px] font-semibold text-blue-400 -mt-0.5">
                      {hp.heroBadgeTopSubtitle}
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute top-1/3 -right-2 sm:-right-4 bg-[#10192B]/95 backdrop-blur-md border border-[#202E43] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{hp.heroBadgeMidTitle}</div>
                    <div className="text-[11px] font-semibold text-blue-400 -mt-0.5">
                      {hp.heroBadgeMidSubtitle}
                    </div>
                  </div>
                </div>

                {/* Handwritten-style script */}
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="font-heading italic font-bold text-xl sm:text-2xl text-white/90 drop-shadow-md">
                    {hp.heroScriptText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUSTED PLATFORMS STRIP */}
      {vis.showPlatformsStrip && (
        <section className="py-7 bg-[#0C1423] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-xs uppercase font-bold tracking-widest text-slate-400 shrink-0 text-center md:text-left">
                {hp.platformsHeading}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-bold">
                {hp.platformsList.map((name, idx) => (
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

      {/* SECTION 3 — SERVICES OVERVIEW */}
      {vis.showHomeServices && (
        <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                {hp.servicesEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                {hp.servicesHeading}
              </h2>
              <p className="text-base text-slate-600">{hp.servicesSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((srv) => {
                const IconComponent = getServiceIcon(srv.iconName);
                return (
                  <div
                    key={srv.id}
                    className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{srv.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('/services')}
                className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 inline-flex items-center gap-2 transition-all"
              >
                <span>{hp.servicesCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4 — FEATURED PORTFOLIO */}
      {vis.showHomePortfolio && (
        <section id="portfolio-section" className="py-20 bg-[#10192B] border-b border-[#202E43]/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                  {hp.portfolioEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  {hp.portfolioHeading}{' '}
                  <span className="text-blue-500">{hp.portfolioHighlight}</span>
                </h2>
                <p className="text-sm sm:text-base text-[#AAB7CC] max-w-xl">
                  {hp.portfolioSubtitle}
                </p>
              </div>

              <button
                onClick={() => onNavigate('/portfolio')}
                className="px-6 py-2.5 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 shrink-0"
              >
                <span>{hp.portfolioCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredFourProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#152033] border border-[#202E43] hover:border-blue-500/60 shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0A101D]">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#152033] via-transparent to-transparent opacity-30" />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">
                        {p.category}
                      </div>
                      <h3 className="font-heading font-bold text-base text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-[#202E43]/60 mt-4">
                      <span className="text-xs text-[#AAB7CC] group-hover:text-white transition-colors">
                        View Project
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5 — WHY CHOOSE MEMBERFLOW */}
      {vis.showWhyChooseUs && (
        <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  {hp.whyEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {hp.whyHeading}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                  {hp.whySubtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                  {hp.whyCards.map((card, idx) => {
                    const IconComp = whyIcons[idx % whyIcons.length];
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#DCE3EF] shadow-sm flex items-start gap-3.5"
                      >
                        <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{card.title}</h4>
                          <p className="text-xs text-slate-600 mt-0.5">{card.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenContact}
                    className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                  >
                    <span>{hp.whyCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-white border border-[#DCE3EF] shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F7FB]">
                    <img
                      src={hp.whyGrowthImage || WHY_CHOOSE_GROWTH_IMAGE}
                      alt={hp.whyEngineTitle}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== WHY_CHOOSE_GROWTH_IMAGE) {
                          img.src = WHY_CHOOSE_GROWTH_IMAGE;
                        }
                      }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-3 bg-white">
                    <div className="text-center">
                      <h3 className="font-heading font-extrabold text-lg text-slate-900">
                        {hp.whyEngineTitle}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">{hp.whyEngineDescription}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
                      <div className="bg-[#F5F7FB] p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">
                          {hp.whyStat1Label}
                        </span>
                        <div className="text-sm font-bold text-blue-600">{hp.whyStat1Value}</div>
                      </div>
                      <div className="bg-[#F5F7FB] p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">
                          {hp.whyStat2Label}
                        </span>
                        <div className="text-sm font-bold text-blue-600">{hp.whyStat2Value}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6 — CLIENT TESTIMONIALS */}
      {vis.showTestimonials && (
        <section className="py-20 bg-[#0C1423] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                {hp.testimonialsEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                {hp.testimonialsHeading}{' '}
                <span className="text-blue-500">{hp.testimonialsHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base text-[#AAB7CC]">{hp.testimonialsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(Math.max(1, Math.min(5, t.rating || 5)))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed italic">"{t.quote}"</p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#202E43]/60">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">{t.name}</h4>
                      <p className="text-xs text-[#AAB7CC]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ ACCORDION */}
      {vis.showFaq && (
        <section id="faq" className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider">
                {hp.faqEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                {hp.faqHeading}
              </h2>
              <p className="text-sm text-[#AAB7CC]">{hp.faqSubtitle}</p>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={item.id || idx}
                    className="rounded-xl border border-[#202E43] bg-[#152033] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-white hover:text-blue-400 transition-colors"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#AAB7CC] leading-relaxed border-t border-[#202E43]/40 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7 — FINAL CONVERSION BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                <span>🚀</span>
                <span>{hp.ctaBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                {hp.ctaHeading}
              </h2>
              <p className="text-base sm:text-lg text-blue-100">{hp.ctaSubtitle}</p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-base shadow-2xl active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{hp.ctaButtonText}</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
