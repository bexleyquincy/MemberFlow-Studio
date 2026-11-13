import React from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  TrendingUp,
  HeartHandshake,
  Settings,
  Award,
  Zap
} from 'lucide-react';
import {
  CtaConfig,
  SiteConfig,
  FOUNDER_HERO_IMAGE,
  FOUNDER_STORY_IMAGE,
  CLASSROOM_DESIGN_HUB_IMAGE
} from '../data/siteData';
import { LinkableImage } from '../components/LinkableImage';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  onOpenContact: () => void;
  onExecuteCta: (cta: CtaConfig | undefined, fallbackAction?: () => void) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  siteConfig,
  onOpenContact,
  onExecuteCta
}) => {
  const ap = siteConfig.aboutPage;
  const vis = siteConfig.sectionVisibility;
  const storyParagraphs = (siteConfig.founderStory || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const pillarIcons = [TrendingUp, Settings, Users, Zap];
  const philosophyIcons = [Award, Users, TrendingUp, HeartHandshake];

  return (
    <div className="min-h-screen text-slate-100 bg-[#10192B]">
      {/* SECTION 1 — FOUNDER-LED HERO */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        {siteConfig.theme.showAmbientGlow && (
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>⭐</span>
                <span>{ap.heroEyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                {ap.heroHeadlineLine1} <br />
                {ap.heroHeadlineLine2}{' '}
                <span className="text-blue-500 relative inline-block">
                  {ap.heroHighlightWord}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-500"
                    viewBox="0 0 160 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C45 3 115 3 158 9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#AAB7CC] leading-relaxed max-w-xl">
                I'm <span className="text-white font-bold">{siteConfig.founderName}</span>, —{' '}
                {siteConfig.founderBio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onExecuteCta(ap.heroPrimaryCtaAction, onOpenContact)}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{ap.heroPrimaryCtaAction?.label || ap.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onExecuteCta(ap.heroSecondaryCtaAction, () => {
                      const el = document.getElementById('founder-story');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    })
                  }
                  className="px-6 py-3.5 rounded-full bg-[#152033] hover:bg-[#202E43] text-white font-semibold text-sm border border-[#202E43] flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{ap.heroSecondaryCtaAction?.label || ap.heroSecondaryCta}</span>
                </button>
              </div>

              {/* Founder quote card */}
              <div className="p-4 rounded-xl bg-[#152033]/80 border border-[#202E43] max-w-md">
                <p className="text-xs text-slate-300 italic">
                  "{siteConfig.tagline} {ap.heroQuoteText}"
                </p>
                <div className="text-[11px] font-bold text-blue-400 mt-2">
                  — {siteConfig.founderName}, {siteConfig.founderTitle}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                  <LinkableImage
                    src={siteConfig.founderHeroImage || FOUNDER_HERO_IMAGE}
                    fallbackSrc={FOUNDER_HERO_IMAGE}
                    alt={siteConfig.founderName}
                    imageLink={siteConfig.founderHeroImageLink}
                    onExecuteAction={onExecuteCta}
                    className="w-full h-auto object-cover object-top max-h-[520px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10192B] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-right pointer-events-none">
                  <div className="font-heading italic font-extrabold text-lg sm:text-xl text-white drop-shadow-md">
                    {ap.heroGreetingPrefix} {siteConfig.founderName}
                  </div>
                  <div className="text-xs text-blue-300 flex items-center justify-end gap-1">
                    <span>{ap.heroRoleCallout}</span>
                    <span>↳</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FOUNDER STORY */}
      <section id="founder-story" className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-xl p-3">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 relative">
                  <LinkableImage
                    src={siteConfig.founderStoryImage || FOUNDER_STORY_IMAGE}
                    fallbackSrc={FOUNDER_STORY_IMAGE}
                    alt={`${siteConfig.founderName} Speaking`}
                    imageLink={siteConfig.founderStoryImageLink}
                    onExecuteAction={onExecuteCta}
                    className="w-full h-full object-cover object-top"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#10192B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#202E43] text-white pointer-events-none">
                    <span className="text-xs font-bold block">{siteConfig.founderName}</span>
                    <span className="text-[10px] text-blue-400">{ap.storyImageBadgeRole}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                {ap.storyEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                {ap.storyHeading}
              </h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {storyParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                {ap.storyPillars.map((pillar, idx) => {
                  const IconComp = pillarIcons[idx % pillarIcons.length];
                  return (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{pillar}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onExecuteCta(ap.storyCtaAction, () => onNavigate('/services'))}
                  className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>{ap.storyCtaAction?.label || ap.storyCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MY PHILOSOPHY */}
      {vis.showFounderPhilosophy && (
        <section className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                {ap.philosophyEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                {ap.philosophyHeading}{' '}
                <span className="text-blue-500">{ap.philosophyHighlight}</span>
              </h2>
              <p className="text-base text-[#AAB7CC]">{ap.philosophySubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ap.philosophyCards.map((card, idx) => {
                const IconComp = philosophyIcons[idx % philosophyIcons.length];
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-lg text-white">{card.title}</h3>
                      <p className="text-xs text-[#AAB7CC] leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4 — SKILLS & CAPABILITIES */}
      {vis.showFounderSkills && (
        <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  {ap.skillsEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {ap.skillsHeading}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">{ap.skillsDescription}</p>

                <div className="space-y-3.5 pt-2">
                  {ap.skillsList.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200"
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{skill}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onExecuteCta(ap.skillsCtaAction, () => onNavigate('/services'))}
                    className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                  >
                    <span>{ap.skillsCtaAction?.label || ap.skillsCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-[#DCE3EF] bg-white shadow-xl p-3">
                  <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <LinkableImage
                      src={ap.skillsImage || CLASSROOM_DESIGN_HUB_IMAGE}
                      alt="Skool Dashboard Showcase"
                      fallbackSrc={CLASSROOM_DESIGN_HUB_IMAGE}
                      imageLink={ap.skillsImageLink}
                      onExecuteAction={onExecuteCta}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5 — HOW I WORK */}
      {vis.showFounderProcess && (
        <section className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                {ap.processEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                {ap.processHeading}{' '}
                <span className="text-blue-500">{ap.processHighlight}</span>
              </h2>
              <p className="text-base text-[#AAB7CC]">{ap.processSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ap.processSteps.map((step, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-[#152033] border border-[#202E43] space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-heading font-extrabold text-lg flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">{step.title}</h3>
                  <p className="text-sm text-[#AAB7CC] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6 — FINAL CONVERSION BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                {ap.ctaHeading}
              </h2>
              <p className="text-base sm:text-lg text-blue-100">{ap.ctaSubtitle}</p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onExecuteCta(ap.ctaButtonAction, onOpenContact)}
                className="px-8 py-4 rounded-full bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-base shadow-2xl active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{ap.ctaButtonAction?.label || ap.ctaButtonText}</span>
                <ArrowRight className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
