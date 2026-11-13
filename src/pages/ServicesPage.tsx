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
  Check,
  Zap,
  Share2,
  Plus
} from 'lucide-react';
import {
  CtaConfig,
  ServiceItem,
  SiteConfig,
  SERVICES_HERO_DEFAULT_IMAGE,
  WHY_CHOOSE_GROWTH_IMAGE,
  CLASSROOM_DESIGN_HUB_IMAGE
} from '../data/siteData';
import { LinkableImage } from '../components/LinkableImage';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  services: ServiceItem[];
  onOpenContact: () => void;
  onExecuteCta: (cta: CtaConfig | undefined, fallbackAction?: () => void) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  siteConfig,
  services,
  onOpenContact,
  onExecuteCta
}) => {
  const sp = siteConfig.servicesPage;

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

  const indicatorIcons = [Users, Zap, CheckCircle2];

  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* SECTION 1 — SERVICES HERO */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        {siteConfig.theme.showAmbientGlow && (
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>⭐</span>
                <span>{sp.heroEyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                {sp.heroHeadlineLine1} <br />
                {sp.heroHeadlineLine2}{' '}
                <span className="text-blue-500 relative inline-block">
                  {sp.heroHighlightWord}
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
                {sp.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onExecuteCta(sp.heroPrimaryCtaAction, onOpenContact)}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{sp.heroPrimaryCtaAction?.label || sp.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onExecuteCta(sp.heroSecondaryCtaAction, () => {
                      const el = document.getElementById('core-services');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    })
                  }
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{sp.heroSecondaryCtaAction?.label || sp.heroSecondaryCta}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#202E43]/60">
                {sp.heroIndicators.map((ind, idx) => {
                  const IconComp = indicatorIcons[idx % indicatorIcons.length];
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">{ind.title}</div>
                        <div className="text-[10px] sm:text-xs text-[#AAB7CC]">{ind.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                <LinkableImage
                  src={sp.heroImage || SERVICES_HERO_DEFAULT_IMAGE}
                  alt={`${siteConfig.brandName} Services Showcase`}
                  fallbackSrc={SERVICES_HERO_DEFAULT_IMAGE}
                  imageLink={sp.heroImageLink}
                  onExecuteAction={onExecuteCta}
                  className="w-full h-auto object-cover object-top max-h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CORE SERVICES OVERVIEW */}
      <section id="core-services" className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
              {sp.coreEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              {sp.coreHeading}
            </h2>
            <p className="text-base text-slate-600">{sp.coreSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const IconComponent = getServiceIcon(s.iconName);

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
                      <span className="text-xs font-bold font-mono text-slate-400">{s.number}</span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{s.description}</p>

                    <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      {s.deliverables.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onExecuteCta(s.cta, onOpenContact)}
                      className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1.5"
                    >
                      <span>{s.cta?.label || `Inquire About ${s.title}`}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — DETAILED SERVICE SHOWCASE */}
      <section className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider">
              {sp.detailsEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              {sp.detailsHeading}{' '}
              <span className="text-blue-500">{sp.detailsHighlight}</span>
            </h2>
            <p className="text-base text-[#AAB7CC]">{sp.detailsSubtitle}</p>
          </div>

          {sp.blocks.map((block, index) => {
            const imageLeft = index % 2 === 1;
            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className={`lg:col-span-6 space-y-5 ${imageLeft ? 'order-1 lg:order-2' : ''}`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {block.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    {block.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#AAB7CC] leading-relaxed">
                    {block.description}
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    {block.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <button
                      onClick={() => onExecuteCta(block.ctaAction, onOpenContact)}
                      className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide inline-flex items-center gap-2"
                    >
                      <span>{block.ctaAction?.label || block.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className={`lg:col-span-6 ${imageLeft ? 'order-2 lg:order-1' : ''}`}>
                  <div className="rounded-2xl overflow-hidden border border-[#202E43] bg-[#152033] shadow-xl p-3">
                    <LinkableImage
                      src={block.imageUrl}
                      alt={block.title}
                      fallbackSrc={CLASSROOM_DESIGN_HUB_IMAGE}
                      imageLink={block.imageLink}
                      onExecuteAction={onExecuteCta}
                      className="w-full h-auto rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — HOW WE WORK */}
      <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
              {sp.processEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              {sp.processHeading}
            </h2>
            <p className="text-base text-slate-600">{sp.processSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {sp.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-[#DCE3EF] shadow-sm relative space-y-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-heading">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-lg p-2">
                <LinkableImage
                  src={sp.processImage || WHY_CHOOSE_GROWTH_IMAGE}
                  alt={sp.processHeading}
                  fallbackSrc={WHY_CHOOSE_GROWTH_IMAGE}
                  imageLink={sp.processImageLink}
                  onExecuteAction={onExecuteCta}
                  className="w-full h-auto rounded-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FINAL CONVERSION BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                {sp.ctaHeading}
              </h2>
              <p className="text-base sm:text-lg text-blue-100">{sp.ctaSubtitle}</p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onExecuteCta(sp.ctaButtonAction, onOpenContact)}
                className="px-8 py-4 rounded-full bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-base shadow-2xl active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{sp.ctaButtonAction?.label || sp.ctaButtonText}</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
