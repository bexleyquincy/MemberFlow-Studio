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
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Award,
  Zap,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { SiteConfig, Project, Testimonial, FAQ_ITEMS } from '../data/siteData';

interface HomePageProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  classroomProjects: Project[];
  landingProjects: Project[];
  testimonials: Testimonial[];
  onOpenContact: () => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  siteConfig,
  classroomProjects,
  landingProjects,
  testimonials,
  onOpenContact,
  onSelectProject
}) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // 4 Featured Projects for Homepage Section 4
  const featuredFourProjects = [
    classroomProjects[0] || {
      id: 'h-1',
      title: 'Skool Classroom Design',
      category: 'Engaging & Organized',
      description: 'Structured sequential course levels and video modules.',
      imageUrl: 'https://img.sanishtech.com/u/b23962d874c57145a61ed60d99809bf2.png'
    },
    landingProjects[1] || {
      id: 'h-2',
      title: 'Digital Creator Community',
      category: 'Premium Landing Page',
      description: 'Chic sales and community landing page presenting membership tiers.',
      imageUrl: 'https://img.sanishtech.com/u/7b9e61d8e6f0a3f5cf3e3f287d13c677.png'
    },
    landingProjects[0] || {
      id: 'h-3',
      title: 'Real Estate Community',
      category: 'High-Converting Page',
      description: 'Investor portal landing page designed with clear value propositions.',
      imageUrl: 'https://img.sanishtech.com/u/f37e41f7ca3c29592e3dde20e6a5e849.png'
    },
    classroomProjects[1] || {
      id: 'h-4',
      title: 'Design & Apparel Community',
      category: 'Modern Classroom Setup',
      description: 'Multi-tiered craft masterclass with visual resource libraries.',
      imageUrl: 'https://img.sanishtech.com/u/d18df1c25ca09bab0a6239b84996b116.png'
    }
  ];

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
          SECTION 1 — PREMIUM HERO
          Exact match to Reference 1:
          - Left: Eyebrow "Skool Community Experts", headline "Better Systems. Stronger Communities."
          - Highlight "Communities" in electric blue.
          - CTAs: "Explore Our Services", "Watch Our Work"
          - 3 Credibility indicators: 500+ Community Members, 100% Client Satisfaction, Real Growth Strategies
          - Right: Confident professional Black female business professional, layered Skool mockups,
            badges "Grow Your Community", "Engage More Members", "Build. Grow. Thrive."
      ========================================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#202E43]/60 bg-radial-gradient">
        {/* Ambient decorative glow */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Editorial & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
                <span>🚀</span>
                <span>Skool Community Experts</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                Better Systems. <br className="hidden sm:inline" />
                Stronger <span className="text-blue-500 relative inline-block">
                  Communities.
                  {/* Subtle curved underline vector */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 9C58 3 142 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              {/* Supporting description */}
              <p className="text-base sm:text-lg text-[#AAB7CC] leading-relaxed max-w-xl">
                We help Skool community owners build, organize, manage and <span className="text-white font-medium">grow thriving communities</span> through expert setup, engaging classrooms and strategic growth.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Explore Our Services</span>
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
                  <span>Watch Our Work</span>
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
                      Community Members Supported
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
                      Client Satisfaction
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
                      Growth Strategies
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Layered visual composition matching Reference 1 */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main hero image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#202E43] bg-gradient-to-b from-[#18253B] to-[#10192B]">
                  {/* Portrait photo from Reference 1 */}
                  <img
                    src="/assets/aistudio/MemberFlow_Studio_Community_Growth_Landing_Page_650bab7d.png"
                    alt="MemberFlow Studio Community Growth"
                    className="w-full h-auto object-cover object-top max-h-[520px]"
                  />
                  
                  {/* Subtle bottom gradient to blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10192B] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>

                {/* Floating Card: Grow Your Community */}
                <div className="absolute -top-4 right-2 sm:right-6 bg-[#10192B]/95 backdrop-blur-md border border-[#202E43] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 animate-bounce-subtle">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Grow Your</div>
                    <div className="text-[11px] font-semibold text-blue-400 -mt-0.5">Community</div>
                  </div>
                </div>

                {/* Floating Card: Engage More Members */}
                <div className="absolute top-1/3 -right-2 sm:-right-4 bg-[#10192B]/95 backdrop-blur-md border border-[#202E43] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Engage</div>
                    <div className="text-[11px] font-semibold text-blue-400 -mt-0.5">More Members</div>
                  </div>
                </div>

                {/* Handwritten-style script */}
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="font-heading italic font-bold text-xl sm:text-2xl text-white/90 drop-shadow-md">
                    Build. Grow. Thrive.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — TRUSTED PLATFORMS STRIP
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

      {/* =========================================================================
          SECTION 3 — SERVICES OVERVIEW (Soft White Contrast)
      ========================================================================== */}
      <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              End-to-End Skool Community Solutions
            </h2>
            <p className="text-base text-slate-600">
              From setup to growth, we provide everything you need to create a powerful, engaging and profitable community.
            </p>
          </div>

          {/* 6 Core Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Community Setup
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Launch a professional, well-structured Skool community tailored to your brand and ready for members.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Community Management
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Keep your community organized, supported and highly engaged so hosts can focus on delivering value.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Member Experience
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Improve onboarding, classroom navigation and the overall member journey to ensure long-term retention.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Community Growth
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Grow your membership with proven conversion funnels, event campaigns, and member acquisition strategies.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Social Media Management
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Amplify your community across platforms, turn social followers into committed active Skool members.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#DCE3EF] shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">
                And More...
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get custom support for your unique needs, including custom course uploads, gamification, and integrations.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('/services')}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 inline-flex items-center gap-2 transition-all"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — FEATURED PORTFOLIO (Dark Navy)
      ========================================================================== */}
      <section id="portfolio-section" className="py-20 bg-[#10192B] border-b border-[#202E43]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                Our Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                See Our Work <span className="text-blue-500">in Action</span>
              </h2>
              <p className="text-sm sm:text-base text-[#AAB7CC] max-w-xl">
                Explore real examples of Skool classrooms and stunning landing pages we've created.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/portfolio')}
              className="px-6 py-2.5 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 shrink-0"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Project Preview Cards */}
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

      {/* =========================================================================
          SECTION 5 — WHY CHOOSE MEMBERFLOW (Soft White with 3D Growth Illustration)
      ========================================================================== */}
      <section className="py-20 bg-[#F5F7FB] text-slate-900 border-b border-[#DCE3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: 5 Values */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Your Success is Our Priority
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                We go beyond setup. We partner with you to <span className="font-semibold text-slate-900">build a community that lasts and grows</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                <div className="p-4 rounded-xl bg-white border border-[#DCE3EF] shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Expertise</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Focused knowledge of community systems and growth.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCE3EF] shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Tailored Solutions</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Strategies customized for your community's exact goals.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCE3EF] shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Dedicated Support</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Real people, real support whenever you need assistance.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCE3EF] shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Proven Results</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Turn your community into an engaging, profitable business.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>Let's Build Together</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D-inspired growth illustration visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-blue-500/10 via-white to-blue-600/10 border border-blue-200 shadow-xl">
                <div className="text-center space-y-4">
                  {/* Visual 3D blocks / trophy illustration element */}
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40">
                    <TrendingUp className="w-12 h-12" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    Community Growth Engine
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Transform passive spectators into vocal, engaged brand ambassadors with systematic gamification and structured learning paths.
                  </p>
                  
                  <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-3 text-left">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Member Retention</span>
                      <div className="text-lg font-bold text-blue-600">High Engagement</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Course Completion</span>
                      <div className="text-lg font-bold text-blue-600">Structured Paths</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — CLIENT TESTIMONIALS (Dark Navy)
      ========================================================================== */}
      <section className="py-20 bg-[#0C1423] border-b border-[#202E43]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              What Our Clients Say
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Real Results. <span className="text-blue-500">Happy Clients.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#AAB7CC]">
              Hear from hosts who transformed their Skool communities with MemberFlow Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-2xl bg-[#152033] border border-[#202E43] shadow-lg flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Star rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#202E43]/60">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
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

      {/* =========================================================================
          FAQ ACCORDION (Linked from navigation)
      ========================================================================== */}
      <section id="faq" className="py-20 bg-[#10192B] border-b border-[#202E43]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider">
              Answers & Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#AAB7CC]">
              Everything you need to know about partnering with MemberFlow Studio.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
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

      {/* =========================================================================
          SECTION 7 — FINAL CONVERSION BANNER (Electric Blue Gradient)
      ========================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                <span>🚀</span>
                <span>Ready to Level Up?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Ready to Level Up Your Skool Community?
              </h2>
              <p className="text-base sm:text-lg text-blue-100">
                Let's turn your community into a thriving, engaging and profitable space.
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
