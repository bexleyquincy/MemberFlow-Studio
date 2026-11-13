import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Shield,
  Save,
  Check,
  RefreshCw,
  LogOut,
  LayoutDashboard,
  Globe,
  User,
  Home,
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  Download,
  Upload,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  SiteConfig,
  Project,
  ServiceItem,
  Testimonial,
  FaqItem,
  FOUNDER_HERO_IMAGE,
  FOUNDER_STORY_IMAGE,
  HOME_HERO_DEFAULT_IMAGE,
  SERVICES_HERO_DEFAULT_IMAGE,
  PORTFOLIO_HERO_DEFAULT_IMAGE,
  WHY_CHOOSE_GROWTH_IMAGE,
  CLASSROOM_DESIGN_HUB_IMAGE,
  DY_SALSA_CLASSROOM_URL,
  DY_SALSA_LANDING_URL,
  GLAM_CRAFTER_CLASSROOM_URL,
  INITIAL_TESTIMONIALS
} from '../data/siteData';
import type { FullSiteBackup } from '../App';
import {
  AdminSession,
  getStoredAdminSession,
  verifyStoredAdminSession,
  logoutAdmin
} from '../utils/adminAuth';
import { AdminSecurityGate } from './admin/AdminSecurityGate';
import { ImageInputField } from './admin/ImageInputField';
import { AdminProjectListEditor } from './admin/AdminProjectListEditor';
import { CtaActionEditor } from './admin/CtaActionEditor';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (newConfig: SiteConfig) => void;
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
  classroomProjects: Project[];
  onUpdateClassrooms: (projects: Project[]) => void;
  landingProjects: Project[];
  onUpdateLandings: (projects: Project[]) => void;
  featuredCaseStudy: Project;
  onUpdateFeaturedCaseStudy: (study: Project) => void;
  testimonials: Testimonial[];
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  faqItems: FaqItem[];
  onUpdateFaq: (items: FaqItem[]) => void;
  onImportBackup: (backup: FullSiteBackup) => void;
  onResetToDefaults: () => void;
}

type AdminSectionId =
  | 'overview'
  | 'brand'
  | 'founder'
  | 'home'
  | 'services'
  | 'portfolio'
  | 'testimonials';

const NAV_ITEMS: Array<{ id: AdminSectionId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'overview', label: 'Overview & Backup', icon: LayoutDashboard },
  { id: 'brand', label: 'Brand, Nav & SEO', icon: Globe },
  { id: 'founder', label: 'Founder & About', icon: User },
  { id: 'home', label: 'Home Page', icon: Home },
  { id: 'services', label: 'Services Page', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio & Case Study', icon: FolderKanban },
  { id: 'testimonials', label: 'Testimonials & FAQ', icon: MessageSquareQuote }
];

const InputLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-300 mb-1">
    {children}
  </label>
);

const SectionCard: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children
}) => (
  <div className="p-5 rounded-xl bg-[#152033] border border-[#202E43] space-y-4">
    <div className="border-b border-[#202E43] pb-3">
      <h3 className="text-sm font-bold font-heading text-white">{title}</h3>
      {subtitle && <p className="text-xs text-[#AAB7CC] mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  siteConfig,
  onUpdateSiteConfig,
  services,
  onUpdateServices,
  classroomProjects,
  onUpdateClassrooms,
  landingProjects,
  onUpdateLandings,
  featuredCaseStudy,
  onUpdateFeaturedCaseStudy,
  testimonials,
  onUpdateTestimonials,
  faqItems,
  onUpdateFaq,
  onImportBackup,
  onResetToDefaults
}) => {
  const [session, setSession] = useState<AdminSession | null>(() => getStoredAdminSession());
  const [activeSection, setActiveSection] = useState<AdminSectionId>('overview');

  const [configDraft, setConfigDraft] = useState<SiteConfig>(siteConfig);
  const [caseStudyDraft, setCaseStudyDraft] = useState<Project>(featuredCaseStudy);
  const [hasUnsavedConfig, setHasUnsavedConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [confirmReset, setConfirmReset] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  // New Testimonial & FAQ drafts
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    avatarUrl: INITIAL_TESTIMONIALS[0].avatarUrl,
    quote: '',
    rating: 5
  });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newPlatform, setNewPlatform] = useState('');

  // Verify stored session when modal opens
  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    verifyStoredAdminSession().then((verified) => {
      if (mounted) setSession(verified);
    });
    return () => {
      mounted = false;
    };
  }, [isOpen]);

  // Keep draft synchronized with prop updates
  useEffect(() => {
    setConfigDraft(siteConfig);
    setCaseStudyDraft(featuredCaseStudy);
    setHasUnsavedConfig(false);
  }, [siteConfig, featuredCaseStudy, isOpen]);

  if (!isOpen) return null;

  // Enforce strict security gate until authenticated
  if (!session) {
    return (
      <AdminSecurityGate
        onAuthenticated={(verifiedSession) => setSession(verifiedSession)}
        onClose={onClose}
      />
    );
  }

  const patchConfig = (updater: (prev: SiteConfig) => SiteConfig) => {
    setConfigDraft((prev) => updater(prev));
    setHasUnsavedConfig(true);
  };

  const handleSaveAll = () => {
    onUpdateSiteConfig(configDraft);
    onUpdateFeaturedCaseStudy(caseStudyDraft);
    setHasUnsavedConfig(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSignOut = () => {
    logoutAdmin();
    setSession(null);
  };

  const handleExportJson = () => {
    const payload: FullSiteBackup = {
      siteConfig: configDraft,
      services,
      classroomProjects,
      landingProjects,
      featuredCaseStudy: caseStudyDraft,
      testimonials,
      faqItems
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `memberflow-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupMessage('Full website JSON backup downloaded.');
    setTimeout(() => setBackupMessage(null), 3500);
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as FullSiteBackup;
      onImportBackup(parsed);
      setBackupMessage('Website configuration restored from backup successfully!');
    } catch {
      setBackupMessage('Invalid backup file. Please upload a valid MemberFlow JSON export.');
    } finally {
      if (importInputRef.current) importInputRef.current.value = '';
      setTimeout(() => setBackupMessage(null), 4000);
    }
  };

  const handleAddService = () => {
    const num = String(services.length + 1).padStart(2, '0');
    const created: ServiceItem = {
      id: `service-${Date.now()}`,
      number: num,
      title: 'New Skool Service',
      description: 'Describe how this service helps Skool community owners scale.',
      iconName: 'Sparkles',
      deliverables: ['Custom strategy call', 'Full implementation', 'Member walkthrough'],
      cta: {
        label: 'Inquire About New Skool Service',
        actionType: 'contact_popup',
        target: ''
      }
    };
    onUpdateServices([...services, created]);
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.quote.trim()) return;
    const item: Testimonial = {
      id: `test-${Date.now()}`,
      name: newTestimonial.name.trim(),
      role: newTestimonial.role.trim() || 'Community Owner',
      avatarUrl: newTestimonial.avatarUrl || INITIAL_TESTIMONIALS[0].avatarUrl,
      quote: newTestimonial.quote.trim(),
      rating: newTestimonial.rating
    };
    onUpdateTestimonials([...testimonials, item]);
    setNewTestimonial({
      name: '',
      role: '',
      avatarUrl: INITIAL_TESTIMONIALS[0].avatarUrl,
      quote: '',
      rating: 5
    });
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    onUpdateFaq([
      ...faqItems,
      {
        id: `faq-${Date.now()}`,
        question: newFaq.question.trim(),
        answer: newFaq.answer.trim()
      }
    ]);
    setNewFaq({ question: '', answer: '' });
  };

  const inputCls =
    'w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-6xl h-[92vh] bg-[#10192B] border border-[#202E43] rounded-2xl shadow-2xl flex flex-col text-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="MemberFlow Admin Control Studio"
      >
        {/* Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#202E43] flex flex-wrap items-center justify-between gap-3 bg-[#152033]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold font-heading text-white truncate">
                  MemberFlow Admin Control Studio
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified: {session.email}
                </span>
              </div>
              <p className="text-[11px] text-[#AAB7CC] hidden sm:block">
                Full 100% manual control over pages, text, founder story, images, SEO, services, and portfolio.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 px-2">
                <Check className="w-4 h-4" /> Saved
              </span>
            )}

            <button
              type="button"
              onClick={handleSaveAll}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                hasUnsavedConfig
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{hasUnsavedConfig ? 'Save Changes*' : 'Save All'}</span>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              title="Lock panel and sign out"
              className="px-3 py-2 rounded-xl bg-[#0D1525] hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-[#202E43] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202E43] transition-colors"
              aria-label="Close admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Layout: Sidebar + Content */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Navigation Rail */}
          <aside className="md:w-60 shrink-0 bg-[#0D1525] border-b md:border-b-0 md:border-r border-[#202E43] p-2 sm:p-3 flex md:flex-col gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#152033]'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Scrollable Workspace */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* ===============================================================
                1. OVERVIEW & BACKUP
               =============================================================== */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[#152033] border border-[#202E43]">
                    <div className="text-2xl font-extrabold font-heading text-white">
                      {services.length}
                    </div>
                    <div className="text-xs text-[#AAB7CC]">Core Services</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#152033] border border-[#202E43]">
                    <div className="text-2xl font-extrabold font-heading text-white">
                      {classroomProjects.length}
                    </div>
                    <div className="text-xs text-[#AAB7CC]">Classroom Projects</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#152033] border border-[#202E43]">
                    <div className="text-2xl font-extrabold font-heading text-white">
                      {landingProjects.length}
                    </div>
                    <div className="text-xs text-[#AAB7CC]">Landing Pages</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#152033] border border-[#202E43]">
                    <div className="text-2xl font-extrabold font-heading text-white">
                      {testimonials.length + faqItems.length}
                    </div>
                    <div className="text-xs text-[#AAB7CC]">Reviews & FAQs</div>
                  </div>
                </div>

                <SectionCard
                  title="Quick Control Shortcuts"
                  subtitle="Jump straight to any section of the MemberFlow Studio website."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {NAV_ITEMS.filter((n) => n.id !== 'overview').map((nav) => {
                      const IconComp = nav.icon;
                      return (
                        <button
                          key={nav.id}
                          type="button"
                          onClick={() => setActiveSection(nav.id)}
                          className="p-3.5 rounded-xl bg-[#0D1525] hover:bg-[#19263D] border border-[#202E43] text-left flex items-center gap-3 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{nav.label}</div>
                            <div className="text-[11px] text-slate-400">Edit copy & images</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Backup, Restore & Factory Reset"
                  subtitle="Export your entire website setup as a JSON file, restore from a backup, or reset defaults."
                >
                  {backupMessage && (
                    <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                      {backupMessage}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup</span>
                    </button>

                    <input
                      ref={importInputRef}
                      type="file"
                      accept="application/json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => importInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-[#0D1525] hover:bg-[#19263D] border border-[#202E43] text-white text-xs font-semibold flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-blue-400" />
                      <span>Import JSON Backup</span>
                    </button>

                    {!confirmReset ? (
                      <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 ml-auto"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset All to Defaults</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 ml-auto bg-rose-500/15 border border-rose-500/40 px-3 py-1.5 rounded-xl">
                        <span className="text-xs text-rose-200">Reset entire site?</span>
                        <button
                          type="button"
                          onClick={() => {
                            onResetToDefaults();
                            setConfirmReset(false);
                          }}
                          className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                        >
                          Yes, Reset
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmReset(false)}
                          className="px-2.5 py-1 rounded bg-slate-700 text-slate-200 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===============================================================
                2. BRAND, NAVIGATION, FOOTER, SEO & SECTION VISIBILITY
               =============================================================== */}
            {activeSection === 'brand' && (
              <div className="space-y-6">
                <SectionCard
                  title="Brand Identity & Contact Email"
                  subtitle="Controls header/footer brand lockup, tagline, and primary inquiry recipient."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputLabel>Brand Name</InputLabel>
                      <input
                        type="text"
                        value={configDraft.brandName}
                        onChange={(e) => patchConfig((p) => ({ ...p, brandName: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Brand Subtext</InputLabel>
                      <input
                        type="text"
                        value={configDraft.brandSubtext}
                        onChange={(e) =>
                          patchConfig((p) => ({ ...p, brandSubtext: e.target.value }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Tagline</InputLabel>
                      <input
                        type="text"
                        value={configDraft.tagline}
                        onChange={(e) => patchConfig((p) => ({ ...p, tagline: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Direct Inquiry Email</InputLabel>
                      <input
                        type="email"
                        value={configDraft.contactEmail}
                        onChange={(e) =>
                          patchConfig((p) => ({ ...p, contactEmail: e.target.value }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Top Navigation Labels & CTA">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <InputLabel>Home Link</InputLabel>
                      <input
                        type="text"
                        value={configDraft.navigation.homeLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            navigation: { ...p.navigation, homeLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Services Link</InputLabel>
                      <input
                        type="text"
                        value={configDraft.navigation.servicesLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            navigation: { ...p.navigation, servicesLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Portfolio Link</InputLabel>
                      <input
                        type="text"
                        value={configDraft.navigation.portfolioLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            navigation: { ...p.navigation, portfolioLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>About Link</InputLabel>
                      <input
                        type="text"
                        value={configDraft.navigation.aboutLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            navigation: { ...p.navigation, aboutLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>FAQ Link</InputLabel>
                      <input
                        type="text"
                        value={configDraft.navigation.faqLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            navigation: { ...p.navigation, faqLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <CtaActionEditor
                    title="Header Primary CTA Button"
                    value={configDraft.navigation.ctaAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        navigation: {
                          ...p.navigation,
                          ctaLabel: nextAction.label,
                          ctaAction: nextAction
                        }
                      }))
                    }
                  />
                </SectionCard>

                <SectionCard title="Footer Text & Social Media Links">
                  <div className="space-y-3">
                    <div>
                      <InputLabel>Footer Bio Description</InputLabel>
                      <textarea
                        rows={2}
                        value={configDraft.footer.description}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            footer: { ...p.footer, description: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <InputLabel>Primary Specialty Line</InputLabel>
                        <input
                          type="text"
                          value={configDraft.footer.specialtyPrimary}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              footer: { ...p.footer, specialtyPrimary: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>Secondary Platforms Line</InputLabel>
                        <input
                          type="text"
                          value={configDraft.footer.specialtySecondary}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              footer: { ...p.footer, specialtySecondary: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>Copyright Line</InputLabel>
                        <input
                          type="text"
                          value={configDraft.footer.copyrightText}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              footer: { ...p.footer, copyrightText: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>Founded By Line</InputLabel>
                        <input
                          type="text"
                          value={configDraft.footer.foundedByText}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              footer: { ...p.footer, foundedByText: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <InputLabel>YouTube URL</InputLabel>
                        <input
                          type="text"
                          value={configDraft.socials.youtube}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              socials: { ...p.socials, youtube: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>Instagram URL</InputLabel>
                        <input
                          type="text"
                          value={configDraft.socials.instagram}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              socials: { ...p.socials, instagram: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>LinkedIn URL</InputLabel>
                        <input
                          type="text"
                          value={configDraft.socials.linkedin}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              socials: { ...p.socials, linkedin: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>X / Twitter URL</InputLabel>
                        <input
                          type="text"
                          value={configDraft.socials.x}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              socials: { ...p.socials, x: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="SEO Metadata & Section Visibility Controls">
                  <div className="space-y-3">
                    <div>
                      <InputLabel>Browser Page Title (SEO)</InputLabel>
                      <input
                        type="text"
                        value={configDraft.seo.title}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            seo: { ...p.seo, title: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Meta Description (SEO)</InputLabel>
                      <textarea
                        rows={2}
                        value={configDraft.seo.description}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            seo: { ...p.seo, description: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>

                    <div className="pt-2">
                      <InputLabel>Toggle Individual Website Sections On / Off</InputLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                        {[
                          { key: 'showPlatformsStrip', label: 'Trusted Platforms Strip' },
                          { key: 'showHomeServices', label: 'Home: Services Overview' },
                          { key: 'showHomePortfolio', label: 'Home: Featured Portfolio' },
                          { key: 'showWhyChooseUs', label: 'Home: Why Choose Us' },
                          { key: 'showTestimonials', label: 'Home: Client Testimonials' },
                          { key: 'showFaq', label: 'Home: FAQ Accordion' },
                          { key: 'showCaseStudy', label: 'Portfolio: Featured Case Study' },
                          { key: 'showFounderPhilosophy', label: 'About: Philosophy Cards' },
                          { key: 'showFounderSkills', label: 'About: Skills & Mockup' },
                          { key: 'showFounderProcess', label: 'About: 3-Step Process' }
                        ].map((toggle) => {
                          const k = toggle.key as keyof SiteConfig['sectionVisibility'];
                          const active = configDraft.sectionVisibility[k];
                          return (
                            <button
                              key={toggle.key}
                              type="button"
                              onClick={() =>
                                patchConfig((p) => ({
                                  ...p,
                                  sectionVisibility: {
                                    ...p.sectionVisibility,
                                    [k]: !active
                                  }
                                }))
                              }
                              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-colors ${
                                active
                                  ? 'bg-blue-600/15 border-blue-500/40 text-white'
                                  : 'bg-[#0D1525] border-[#202E43] text-slate-400'
                              }`}
                            >
                              <span>{toggle.label}</span>
                              {active ? (
                                <Eye className="w-4 h-4 text-blue-400" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===============================================================
                3. FOUNDER & ABOUT PAGE (STORY IMAGE, TEXT & ALL SECTIONS)
               =============================================================== */}
            {activeSection === 'founder' && (
              <div className="space-y-6">
                <SectionCard
                  title="Founder Profile & About Hero"
                  subtitle="Edit founder identity, bio, quote, and hero portrait image."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputLabel>Founder Name</InputLabel>
                      <input
                        type="text"
                        value={configDraft.founderName}
                        onChange={(e) =>
                          patchConfig((p) => ({ ...p, founderName: e.target.value }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Founder Title</InputLabel>
                      <input
                        type="text"
                        value={configDraft.founderTitle}
                        onChange={(e) =>
                          patchConfig((p) => ({ ...p, founderTitle: e.target.value }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Hero Headline Line 1</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.heroHeadlineLine1}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, heroHeadlineLine1: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <InputLabel>Line 2</InputLabel>
                        <input
                          type="text"
                          value={configDraft.aboutPage.heroHeadlineLine2}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              aboutPage: { ...p.aboutPage, heroHeadlineLine2: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>Blue Highlight</InputLabel>
                        <input
                          type="text"
                          value={configDraft.aboutPage.heroHighlightWord}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              aboutPage: { ...p.aboutPage, heroHighlightWord: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <InputLabel>Founder Hero Bio</InputLabel>
                    <textarea
                      rows={2}
                      value={configDraft.founderBio}
                      onChange={(e) => patchConfig((p) => ({ ...p, founderBio: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <InputLabel>Founder Hero Quote</InputLabel>
                    <input
                      type="text"
                      value={configDraft.aboutPage.heroQuoteText}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          aboutPage: { ...p.aboutPage, heroQuoteText: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <CtaActionEditor
                      title="About Hero Primary CTA"
                      value={configDraft.aboutPage.heroPrimaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          aboutPage: {
                            ...p.aboutPage,
                            heroPrimaryCta: nextAction.label,
                            heroPrimaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                    <CtaActionEditor
                      title="About Hero Secondary CTA"
                      value={configDraft.aboutPage.heroSecondaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          aboutPage: {
                            ...p.aboutPage,
                            heroSecondaryCta: nextAction.label,
                            heroSecondaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                  </div>

                  <ImageInputField
                    label="Founder Hero Portrait Image"
                    value={configDraft.founderHeroImage}
                    onChange={(val) =>
                      patchConfig((p) => ({ ...p, founderHeroImage: val }))
                    }
                    defaultValue={FOUNDER_HERO_IMAGE}
                    imageLink={configDraft.founderHeroImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({ ...p, founderHeroImageLink: nextLink }))
                    }
                  />
                </SectionCard>

                <SectionCard
                  title="Founder Story Image & Narrative Text"
                  subtitle="Directly controls the My Story section on the About page — separate paragraphs with a blank line."
                >
                  <ImageInputField
                    label="Founder Story Image"
                    value={configDraft.founderStoryImage}
                    onChange={(val) =>
                      patchConfig((p) => ({ ...p, founderStoryImage: val }))
                    }
                    defaultValue={FOUNDER_STORY_IMAGE}
                    aspectClass="w-20 h-24"
                    imageLink={configDraft.founderStoryImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({ ...p, founderStoryImageLink: nextLink }))
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <InputLabel>Story Eyebrow</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.storyEyebrow}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, storyEyebrow: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Story Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.storyHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, storyHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Image Badge Role</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.storyImageBadgeRole}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, storyImageBadgeRole: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <InputLabel>Founder Story Full Text (Paragraphs)</InputLabel>
                    <textarea
                      rows={6}
                      value={configDraft.founderStory}
                      onChange={(e) =>
                        patchConfig((p) => ({ ...p, founderStory: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <InputLabel>4 Story Pillars</InputLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {configDraft.aboutPage.storyPillars.map((pillar, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={pillar}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.aboutPage.storyPillars];
                              copy[idx] = e.target.value;
                              return {
                                ...p,
                                aboutPage: { ...p.aboutPage, storyPillars: copy }
                              };
                            })
                          }
                          className={inputCls}
                        />
                      ))}
                    </div>
                  </div>
                  <CtaActionEditor
                    title="Founder Story Section CTA Button"
                    value={configDraft.aboutPage.storyCtaAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        aboutPage: {
                          ...p.aboutPage,
                          storyCtaText: nextAction.label,
                          storyCtaAction: nextAction
                        }
                      }))
                    }
                  />
                </SectionCard>

                <SectionCard title="My Philosophy & 4 Core Values">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.philosophyHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, philosophyHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Blue Highlight</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.philosophyHighlight}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, philosophyHighlight: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <InputLabel>Philosophy Subtitle</InputLabel>
                    <textarea
                      rows={2}
                      value={configDraft.aboutPage.philosophySubtitle}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          aboutPage: { ...p.aboutPage, philosophySubtitle: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {configDraft.aboutPage.philosophyCards.map((card, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0D1525] border border-[#202E43] space-y-2">
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.aboutPage.philosophyCards];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              return {
                                ...p,
                                aboutPage: { ...p.aboutPage, philosophyCards: copy }
                              };
                            })
                          }
                          className={inputCls}
                          placeholder="Card Title"
                        />
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.aboutPage.philosophyCards];
                              copy[idx] = { ...copy[idx], description: e.target.value };
                              return {
                                ...p,
                                aboutPage: { ...p.aboutPage, philosophyCards: copy }
                              };
                            })
                          }
                          className={inputCls}
                          placeholder="Card Description"
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Skills, Capabilities Mockup Image & Process">
                  <div>
                    <InputLabel>Skills Heading</InputLabel>
                    <input
                      type="text"
                      value={configDraft.aboutPage.skillsHeading}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          aboutPage: { ...p.aboutPage, skillsHeading: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <CtaActionEditor
                    title="Skills Section CTA Button"
                    value={configDraft.aboutPage.skillsCtaAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        aboutPage: {
                          ...p.aboutPage,
                          skillsCtaText: nextAction.label,
                          skillsCtaAction: nextAction
                        }
                      }))
                    }
                  />

                  <div>
                    <InputLabel>Skills Intro Description</InputLabel>
                    <textarea
                      rows={2}
                      value={configDraft.aboutPage.skillsDescription}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          aboutPage: { ...p.aboutPage, skillsDescription: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {configDraft.aboutPage.skillsList.map((skill, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          patchConfig((p) => {
                            const copy = [...p.aboutPage.skillsList];
                            copy[idx] = e.target.value;
                            return {
                              ...p,
                              aboutPage: { ...p.aboutPage, skillsList: copy }
                            };
                          })
                        }
                        className={inputCls}
                      />
                    ))}
                  </div>

                  <ImageInputField
                    label="Skills Showcase Dashboard Image"
                    value={configDraft.aboutPage.skillsImage}
                    onChange={(val) =>
                      patchConfig((p) => ({
                        ...p,
                        aboutPage: { ...p.aboutPage, skillsImage: val }
                      }))
                    }
                    defaultValue={CLASSROOM_DESIGN_HUB_IMAGE}
                    imageLink={configDraft.aboutPage.skillsImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        aboutPage: { ...p.aboutPage, skillsImageLink: nextLink }
                      }))
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {configDraft.aboutPage.processSteps.map((step, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0D1525] border border-[#202E43] space-y-2">
                        <InputLabel>Step {idx + 1}</InputLabel>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.aboutPage.processSteps];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              return {
                                ...p,
                                aboutPage: { ...p.aboutPage, processSteps: copy }
                              };
                            })
                          }
                          className={inputCls}
                        />
                        <textarea
                          rows={2}
                          value={step.description}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.aboutPage.processSteps];
                              copy[idx] = { ...copy[idx], description: e.target.value };
                              return {
                                ...p,
                                aboutPage: { ...p.aboutPage, processSteps: copy }
                              };
                            })
                          }
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <InputLabel>Bottom CTA Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.ctaHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, ctaHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Bottom CTA Subtitle</InputLabel>
                      <input
                        type="text"
                        value={configDraft.aboutPage.ctaSubtitle}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            aboutPage: { ...p.aboutPage, ctaSubtitle: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <CtaActionEditor
                    title="About Page Bottom Banner CTA"
                    value={configDraft.aboutPage.ctaButtonAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        aboutPage: {
                          ...p.aboutPage,
                          ctaButtonText: nextAction.label,
                          ctaButtonAction: nextAction
                        }
                      }))
                    }
                  />
                </SectionCard>
              </div>
            )}

            {/* ===============================================================
                4. HOME PAGE EDITOR
               =============================================================== */}
            {activeSection === 'home' && (
              <div className="space-y-6">
                <SectionCard title="Home Hero Section & Floating Badges">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Eyebrow Badge</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.heroEyebrow}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, heroEyebrow: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Headline Line 1</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.heroHeadlineLine1}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, heroHeadlineLine1: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Headline Line 2 Prefix</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.heroHeadlineLine2}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, heroHeadlineLine2: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Blue Highlight Word</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.heroHighlightWord}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, heroHighlightWord: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <InputLabel>Hero Subtitle</InputLabel>
                    <textarea
                      rows={2}
                      value={configDraft.homePage.heroSubtitle}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: { ...p.homePage, heroSubtitle: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <InputLabel>Overlay Script Text</InputLabel>
                    <input
                      type="text"
                      value={configDraft.homePage.heroScriptText}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: { ...p.homePage, heroScriptText: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <CtaActionEditor
                      title="Home Hero Primary CTA"
                      value={configDraft.homePage.heroPrimaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: {
                            ...p.homePage,
                            heroPrimaryCta: nextAction.label,
                            heroPrimaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                    <CtaActionEditor
                      title="Home Hero Secondary CTA"
                      value={configDraft.homePage.heroSecondaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: {
                            ...p.homePage,
                            heroSecondaryCta: nextAction.label,
                            heroSecondaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                  </div>

                  <ImageInputField
                    label="Home Hero Showcase Image"
                    value={configDraft.homePage.heroImage}
                    onChange={(val) =>
                      patchConfig((p) => ({
                        ...p,
                        homePage: { ...p.homePage, heroImage: val }
                      }))
                    }
                    defaultValue={HOME_HERO_DEFAULT_IMAGE}
                    imageLink={configDraft.homePage.heroImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        homePage: { ...p.homePage, heroImageLink: nextLink }
                      }))
                    }
                  />
                </SectionCard>

                <SectionCard title="Hero Credibility Metrics & Platforms Strip">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#0D1525] border border-[#202E43] space-y-2">
                      <InputLabel>Metric 1 Value & Label</InputLabel>
                      <input
                        type="text"
                        value={configDraft.metrics.membersSupported}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            metrics: { ...p.metrics, membersSupported: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                      <input
                        type="text"
                        value={configDraft.metrics.membersLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            metrics: { ...p.metrics, membersLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D1525] border border-[#202E43] space-y-2">
                      <InputLabel>Metric 2 Value & Label</InputLabel>
                      <input
                        type="text"
                        value={configDraft.metrics.clientSatisfaction}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            metrics: { ...p.metrics, clientSatisfaction: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                      <input
                        type="text"
                        value={configDraft.metrics.satisfactionLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            metrics: { ...p.metrics, satisfactionLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D1525] border border-[#202E43] space-y-2">
                      <InputLabel>Metric 3 Value & Label</InputLabel>
                      <input
                        type="text"
                        value={configDraft.metrics.growthStrategies}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            metrics: { ...p.metrics, growthStrategies: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                      <input
                        type="text"
                        value={configDraft.metrics.growthLabel}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            metrics: { ...p.metrics, growthLabel: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <InputLabel>Platforms Strip Heading & Badges</InputLabel>
                    <input
                      type="text"
                      value={configDraft.homePage.platformsHeading}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: { ...p.homePage, platformsHeading: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                    <div className="flex flex-wrap gap-2 pt-1">
                      {configDraft.homePage.platformsList.map((plat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D1525] border border-[#202E43] text-xs text-white"
                        >
                          {plat}
                          <button
                            type="button"
                            onClick={() =>
                              patchConfig((p) => ({
                                ...p,
                                homePage: {
                                  ...p.homePage,
                                  platformsList: p.homePage.platformsList.filter((_, i) => i !== idx)
                                }
                              }))
                            }
                            className="text-rose-400 hover:text-rose-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={newPlatform}
                          onChange={(e) => setNewPlatform(e.target.value)}
                          placeholder="Add platform..."
                          className="px-2.5 py-1 bg-[#0D1525] border border-[#202E43] rounded-lg text-xs text-white w-32"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newPlatform.trim()) return;
                            patchConfig((p) => ({
                              ...p,
                              homePage: {
                                ...p.homePage,
                                platformsList: [...p.homePage.platformsList, newPlatform.trim()]
                              }
                            }));
                            setNewPlatform('');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Why Choose Us & Growth Engine Image">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Section Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.whyHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, whyHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Growth Card Title</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.whyEngineTitle}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, whyEngineTitle: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <InputLabel>Why Choose Subtitle</InputLabel>
                    <input
                      type="text"
                      value={configDraft.homePage.whySubtitle}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: { ...p.homePage, whySubtitle: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <ImageInputField
                    label="Why Choose Us 3D Growth Illustration"
                    value={configDraft.homePage.whyGrowthImage}
                    onChange={(val) =>
                      patchConfig((p) => ({
                        ...p,
                        homePage: { ...p.homePage, whyGrowthImage: val }
                      }))
                    }
                    defaultValue={WHY_CHOOSE_GROWTH_IMAGE}
                    imageLink={configDraft.homePage.whyGrowthImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        homePage: { ...p.homePage, whyGrowthImageLink: nextLink }
                      }))
                    }
                  />

                  <CtaActionEditor
                    title="Why Choose Us CTA Button"
                    value={configDraft.homePage.whyCtaAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        homePage: {
                          ...p.homePage,
                          whyCtaText: nextAction.label,
                          whyCtaAction: nextAction
                        }
                      }))
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {configDraft.homePage.whyCards.map((card, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0D1525] border border-[#202E43] space-y-2">
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.homePage.whyCards];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              return { ...p, homePage: { ...p.homePage, whyCards: copy } };
                            })
                          }
                          className={inputCls}
                        />
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) =>
                            patchConfig((p) => {
                              const copy = [...p.homePage.whyCards];
                              copy[idx] = { ...copy[idx], description: e.target.value };
                              return { ...p, homePage: { ...p.homePage, whyCards: copy } };
                            })
                          }
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Home Section Headings, Buttons & Final CTA Banner">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Services Section Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.servicesHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, servicesHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Portfolio Section Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.portfolioHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, portfolioHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Final CTA Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.ctaHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, ctaHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Final CTA Subtitle</InputLabel>
                      <input
                        type="text"
                        value={configDraft.homePage.ctaSubtitle}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            homePage: { ...p.homePage, ctaSubtitle: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <CtaActionEditor
                      title="Services Section Button"
                      value={configDraft.homePage.servicesCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: {
                            ...p.homePage,
                            servicesCtaText: nextAction.label,
                            servicesCtaAction: nextAction
                          }
                        }))
                      }
                    />
                    <CtaActionEditor
                      title="Portfolio Section Button"
                      value={configDraft.homePage.portfolioCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          homePage: {
                            ...p.homePage,
                            portfolioCtaText: nextAction.label,
                            portfolioCtaAction: nextAction
                          }
                        }))
                      }
                    />
                  </div>

                  <CtaActionEditor
                    title="Home Final Banner CTA Button"
                    value={configDraft.homePage.ctaButtonAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        homePage: {
                          ...p.homePage,
                          ctaButtonText: nextAction.label,
                          ctaButtonAction: nextAction
                        }
                      }))
                    }
                  />
                </SectionCard>
              </div>
            )}

            {/* ===============================================================
                5. SERVICES PAGE & CORE SERVICES CRUD
               =============================================================== */}
            {activeSection === 'services' && (
              <div className="space-y-6">
                <SectionCard title="Services Page Hero & Process Image">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <InputLabel>Headline Line 1</InputLabel>
                      <input
                        type="text"
                        value={configDraft.servicesPage.heroHeadlineLine1}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            servicesPage: { ...p.servicesPage, heroHeadlineLine1: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Headline Line 2</InputLabel>
                      <input
                        type="text"
                        value={configDraft.servicesPage.heroHeadlineLine2}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            servicesPage: { ...p.servicesPage, heroHeadlineLine2: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Highlight Word</InputLabel>
                      <input
                        type="text"
                        value={configDraft.servicesPage.heroHighlightWord}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            servicesPage: { ...p.servicesPage, heroHighlightWord: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <InputLabel>Hero Subtitle</InputLabel>
                    <textarea
                      rows={2}
                      value={configDraft.servicesPage.heroSubtitle}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          servicesPage: { ...p.servicesPage, heroSubtitle: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <CtaActionEditor
                      title="Services Hero Primary CTA"
                      value={configDraft.servicesPage.heroPrimaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          servicesPage: {
                            ...p.servicesPage,
                            heroPrimaryCta: nextAction.label,
                            heroPrimaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                    <CtaActionEditor
                      title="Services Hero Secondary CTA"
                      value={configDraft.servicesPage.heroSecondaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          servicesPage: {
                            ...p.servicesPage,
                            heroSecondaryCta: nextAction.label,
                            heroSecondaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                  </div>

                  <ImageInputField
                    label="Services Hero Image"
                    value={configDraft.servicesPage.heroImage}
                    onChange={(val) =>
                      patchConfig((p) => ({
                        ...p,
                        servicesPage: { ...p.servicesPage, heroImage: val }
                      }))
                    }
                    defaultValue={SERVICES_HERO_DEFAULT_IMAGE}
                    imageLink={configDraft.servicesPage.heroImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        servicesPage: { ...p.servicesPage, heroImageLink: nextLink }
                      }))
                    }
                  />

                  <ImageInputField
                    label="How It Works Illustration Image"
                    value={configDraft.servicesPage.processImage}
                    onChange={(val) =>
                      patchConfig((p) => ({
                        ...p,
                        servicesPage: { ...p.servicesPage, processImage: val }
                      }))
                    }
                    defaultValue={WHY_CHOOSE_GROWTH_IMAGE}
                    imageLink={configDraft.servicesPage.processImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        servicesPage: { ...p.servicesPage, processImageLink: nextLink }
                      }))
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Services Final Banner Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.servicesPage.ctaHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            servicesPage: { ...p.servicesPage, ctaHeading: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Services Final Banner Subtitle</InputLabel>
                      <input
                        type="text"
                        value={configDraft.servicesPage.ctaSubtitle}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            servicesPage: { ...p.servicesPage, ctaSubtitle: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <CtaActionEditor
                    title="Services Bottom Banner CTA"
                    value={configDraft.servicesPage.ctaButtonAction}
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        servicesPage: {
                          ...p.servicesPage,
                          ctaButtonText: nextAction.label,
                          ctaButtonAction: nextAction
                        }
                      }))
                    }
                  />
                </SectionCard>

                <SectionCard
                  title={`Core Services (${services.length})`}
                  subtitle="Edits apply immediately across both the Home Page and Services Page."
                >
                  <div className="space-y-3">
                    {services.map((srv, idx) => (
                      <div
                        key={srv.id}
                        className="p-4 rounded-xl bg-[#0D1525] border border-[#202E43] space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-blue-400">
                            Service #{srv.number}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateServices(services.filter((item) => item.id !== srv.id))
                            }
                            className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg"
                            title="Delete service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const copy = [...services];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              onUpdateServices(copy);
                            }}
                            className={inputCls}
                            placeholder="Service Title"
                          />
                          <input
                            type="text"
                            value={srv.number}
                            onChange={(e) => {
                              const copy = [...services];
                              copy[idx] = { ...copy[idx], number: e.target.value };
                              onUpdateServices(copy);
                            }}
                            className={inputCls}
                            placeholder="01"
                          />
                          <select
                            value={srv.iconName}
                            onChange={(e) => {
                              const copy = [...services];
                              copy[idx] = { ...copy[idx], iconName: e.target.value };
                              onUpdateServices(copy);
                            }}
                            className={inputCls}
                          >
                            <option value="Settings">Settings Icon</option>
                            <option value="BookOpen">BookOpen Icon</option>
                            <option value="Compass">Compass Icon</option>
                            <option value="Users">Users Icon</option>
                            <option value="Sparkles">Sparkles Icon</option>
                            <option value="TrendingUp">TrendingUp Icon</option>
                            <option value="Share2">Share2 Icon</option>
                            <option value="Zap">Zap Icon</option>
                          </select>
                        </div>

                        <textarea
                          rows={2}
                          value={srv.description}
                          onChange={(e) => {
                            const copy = [...services];
                            copy[idx] = { ...copy[idx], description: e.target.value };
                            onUpdateServices(copy);
                          }}
                          className={inputCls}
                        />

                        <div>
                          <InputLabel>Deliverables (one per line)</InputLabel>
                          <textarea
                            rows={3}
                            value={srv.deliverables.join('\n')}
                            onChange={(e) => {
                              const copy = [...services];
                              copy[idx] = {
                                ...copy[idx],
                                deliverables: e.target.value
                                  .split('\n')
                                  .map((s) => s.trim())
                                  .filter(Boolean)
                              };
                              onUpdateServices(copy);
                            }}
                            className={inputCls}
                          />
                        </div>

                        <CtaActionEditor
                          title={`Service #${srv.number} CTA Button`}
                          value={
                            srv.cta || {
                              label: `Inquire About ${srv.title}`,
                              actionType: 'contact_popup',
                              target: ''
                            }
                          }
                          onChange={(nextAction) => {
                            const copy = [...services];
                            copy[idx] = { ...copy[idx], cta: nextAction };
                            onUpdateServices(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Service</span>
                  </button>
                </SectionCard>

                <SectionCard title="In-Depth Service Showcase Blocks (A, B, C)">
                  <div className="space-y-4">
                    {configDraft.servicesPage.blocks.map((block, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#0D1525] border border-[#202E43] space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <InputLabel>Block Tag</InputLabel>
                            <input
                              type="text"
                              value={block.tag}
                              onChange={(e) =>
                                patchConfig((p) => {
                                  const copy = [...p.servicesPage.blocks];
                                  copy[idx] = { ...copy[idx], tag: e.target.value };
                                  return {
                                    ...p,
                                    servicesPage: { ...p.servicesPage, blocks: copy }
                                  };
                                })
                              }
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <InputLabel>Block Title</InputLabel>
                            <input
                              type="text"
                              value={block.title}
                              onChange={(e) =>
                                patchConfig((p) => {
                                  const copy = [...p.servicesPage.blocks];
                                  copy[idx] = { ...copy[idx], title: e.target.value };
                                  return {
                                    ...p,
                                    servicesPage: { ...p.servicesPage, blocks: copy }
                                  };
                                })
                              }
                              className={inputCls}
                            />
                          </div>
                        </div>

                        <div>
                          <InputLabel>Block Description</InputLabel>
                          <textarea
                            rows={2}
                            value={block.description}
                            onChange={(e) =>
                              patchConfig((p) => {
                                const copy = [...p.servicesPage.blocks];
                                copy[idx] = { ...copy[idx], description: e.target.value };
                                return {
                                  ...p,
                                  servicesPage: { ...p.servicesPage, blocks: copy }
                                };
                              })
                            }
                            className={inputCls}
                          />
                        </div>

                        <CtaActionEditor
                          title={`Block ${idx + 1} CTA Button & Destination`}
                          value={block.ctaAction}
                          onChange={(nextAction) =>
                            patchConfig((p) => {
                              const copy = [...p.servicesPage.blocks];
                              copy[idx] = {
                                ...copy[idx],
                                ctaText: nextAction.label,
                                ctaAction: nextAction
                              };
                              return {
                                ...p,
                                servicesPage: { ...p.servicesPage, blocks: copy }
                              };
                            })
                          }
                        />

                        <ImageInputField
                          label={`Block ${idx + 1} Showcase Image`}
                          value={block.imageUrl}
                          onChange={(val) =>
                            patchConfig((p) => {
                              const copy = [...p.servicesPage.blocks];
                              copy[idx] = { ...copy[idx], imageUrl: val };
                              return {
                                ...p,
                                servicesPage: { ...p.servicesPage, blocks: copy }
                              };
                            })
                          }
                          defaultValue={CLASSROOM_DESIGN_HUB_IMAGE}
                          imageLink={block.imageLink}
                          onImageLinkChange={(nextLink) =>
                            patchConfig((p) => {
                              const copy = [...p.servicesPage.blocks];
                              copy[idx] = { ...copy[idx], imageLink: nextLink };
                              return {
                                ...p,
                                servicesPage: { ...p.servicesPage, blocks: copy }
                              };
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===============================================================
                6. PORTFOLIO & CASE STUDY
               =============================================================== */}
            {activeSection === 'portfolio' && (
              <div className="space-y-6">
                <SectionCard title="Portfolio Hero Banner & Copy">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Hero Headline</InputLabel>
                      <input
                        type="text"
                        value={configDraft.portfolioPage.heroHeadlineLine1}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            portfolioPage: { ...p.portfolioPage, heroHeadlineLine1: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Blue Highlight Word</InputLabel>
                      <input
                        type="text"
                        value={configDraft.portfolioPage.heroHighlightWord}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            portfolioPage: { ...p.portfolioPage, heroHighlightWord: e.target.value }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <InputLabel>Hero Subtitle</InputLabel>
                    <textarea
                      rows={2}
                      value={configDraft.portfolioPage.heroSubtitle}
                      onChange={(e) =>
                        patchConfig((p) => ({
                          ...p,
                          portfolioPage: { ...p.portfolioPage, heroSubtitle: e.target.value }
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <CtaActionEditor
                      title="Portfolio Hero Primary CTA"
                      value={configDraft.portfolioPage.heroPrimaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          portfolioPage: {
                            ...p.portfolioPage,
                            heroPrimaryCta: nextAction.label,
                            heroPrimaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                    <CtaActionEditor
                      title="Portfolio Hero Secondary CTA"
                      value={configDraft.portfolioPage.heroSecondaryCtaAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          portfolioPage: {
                            ...p.portfolioPage,
                            heroSecondaryCta: nextAction.label,
                            heroSecondaryCtaAction: nextAction
                          }
                        }))
                      }
                    />
                  </div>

                  <ImageInputField
                    label="Portfolio Hero Image"
                    value={configDraft.portfolioPage.heroImage}
                    onChange={(val) =>
                      patchConfig((p) => ({
                        ...p,
                        portfolioPage: { ...p.portfolioPage, heroImage: val }
                      }))
                    }
                    defaultValue={PORTFOLIO_HERO_DEFAULT_IMAGE}
                    imageLink={configDraft.portfolioPage.heroImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        portfolioPage: { ...p.portfolioPage, heroImageLink: nextLink }
                      }))
                    }
                  />
                </SectionCard>

                <SectionCard title="Skool Classroom Portfolio">
                  <AdminProjectListEditor
                    title="Classroom Projects"
                    noun="Classroom"
                    projects={classroomProjects}
                    defaultImageUrl={DY_SALSA_CLASSROOM_URL}
                    defaultCategory="Skool Classroom Design"
                    onUpdate={onUpdateClassrooms}
                  />
                </SectionCard>

                <SectionCard title="Community Landing Pages Portfolio">
                  <AdminProjectListEditor
                    title="Landing Page Projects"
                    noun="Landing Page"
                    projects={landingProjects}
                    defaultImageUrl={DY_SALSA_LANDING_URL}
                    defaultCategory="Community Landing Page"
                    onUpdate={onUpdateLandings}
                  />
                </SectionCard>

                <SectionCard
                  title="Featured Case Study Spotlight"
                  subtitle="Controls the spotlight section and modal preview on the Portfolio page."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <InputLabel>Section Heading</InputLabel>
                      <input
                        type="text"
                        value={configDraft.portfolioPage.caseStudyHeading}
                        onChange={(e) =>
                          patchConfig((p) => ({
                            ...p,
                            portfolioPage: {
                              ...p.portfolioPage,
                              caseStudyHeading: e.target.value
                            }
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <InputLabel>Case Study Title (Lightbox)</InputLabel>
                      <input
                        type="text"
                        value={caseStudyDraft.title}
                        onChange={(e) => {
                          setCaseStudyDraft({ ...caseStudyDraft, title: e.target.value });
                          setHasUnsavedConfig(true);
                        }}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <InputLabel>Case Study Description</InputLabel>
                    <textarea
                      rows={2}
                      value={caseStudyDraft.description}
                      onChange={(e) => {
                        setCaseStudyDraft({ ...caseStudyDraft, description: e.target.value });
                        setHasUnsavedConfig(true);
                      }}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <InputLabel>Case Study Execution Overview</InputLabel>
                    <textarea
                      rows={3}
                      value={caseStudyDraft.overview || ''}
                      onChange={(e) => {
                        setCaseStudyDraft({ ...caseStudyDraft, overview: e.target.value });
                        setHasUnsavedConfig(true);
                      }}
                      className={inputCls}
                    />
                  </div>

                  <CtaActionEditor
                    title="Case Study CTA Button"
                    value={configDraft.portfolioPage.caseStudyCtaAction}
                    allowCaseStudy
                    onChange={(nextAction) =>
                      patchConfig((p) => ({
                        ...p,
                        portfolioPage: {
                          ...p.portfolioPage,
                          caseStudyCtaText: nextAction.label,
                          caseStudyCtaAction: nextAction
                        }
                      }))
                    }
                  />

                  <ImageInputField
                    label="Featured Case Study Image"
                    value={caseStudyDraft.imageUrl}
                    onChange={(val) => {
                      setCaseStudyDraft({ ...caseStudyDraft, imageUrl: val });
                      setHasUnsavedConfig(true);
                    }}
                    defaultValue={GLAM_CRAFTER_CLASSROOM_URL}
                    imageLink={configDraft.portfolioPage.caseStudyImageLink}
                    onImageLinkChange={(nextLink) =>
                      patchConfig((p) => ({
                        ...p,
                        portfolioPage: { ...p.portfolioPage, caseStudyImageLink: nextLink }
                      }))
                    }
                  />

                  <div className="pt-3 border-t border-[#202E43] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <InputLabel>Portfolio Final Banner Heading</InputLabel>
                        <input
                          type="text"
                          value={configDraft.portfolioPage.ctaHeading}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              portfolioPage: { ...p.portfolioPage, ctaHeading: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <InputLabel>Portfolio Final Banner Subtitle</InputLabel>
                        <input
                          type="text"
                          value={configDraft.portfolioPage.ctaSubtitle}
                          onChange={(e) =>
                            patchConfig((p) => ({
                              ...p,
                              portfolioPage: { ...p.portfolioPage, ctaSubtitle: e.target.value }
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <CtaActionEditor
                      title="Portfolio Bottom Banner CTA"
                      value={configDraft.portfolioPage.ctaButtonAction}
                      onChange={(nextAction) =>
                        patchConfig((p) => ({
                          ...p,
                          portfolioPage: {
                            ...p.portfolioPage,
                            ctaButtonText: nextAction.label,
                            ctaButtonAction: nextAction
                          }
                        }))
                      }
                    />
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===============================================================
                7. TESTIMONIALS & FAQ CRUD
               =============================================================== */}
            {activeSection === 'testimonials' && (
              <div className="space-y-6">
                <SectionCard title={`Client Testimonials (${testimonials.length})`}>
                  <div className="space-y-3">
                    {testimonials.map((t, idx) => (
                      <div
                        key={t.id}
                        className="p-4 bg-[#0D1525] rounded-xl border border-[#202E43] space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-blue-400">{t.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateTestimonials(testimonials.filter((item) => item.id !== t.id))
                            }
                            className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) => {
                              const copy = [...testimonials];
                              copy[idx] = { ...copy[idx], name: e.target.value };
                              onUpdateTestimonials(copy);
                            }}
                            className={inputCls}
                            placeholder="Client Name"
                          />
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) => {
                              const copy = [...testimonials];
                              copy[idx] = { ...copy[idx], role: e.target.value };
                              onUpdateTestimonials(copy);
                            }}
                            className={inputCls}
                            placeholder="Role / Community"
                          />
                          <select
                            value={t.rating}
                            onChange={(e) => {
                              const copy = [...testimonials];
                              copy[idx] = { ...copy[idx], rating: Number(e.target.value) };
                              onUpdateTestimonials(copy);
                            }}
                            className={inputCls}
                          >
                            {[5, 4, 3, 2, 1].map((r) => (
                              <option key={r} value={r}>
                                {r} Stars
                              </option>
                            ))}
                          </select>
                        </div>

                        <textarea
                          rows={2}
                          value={t.quote}
                          onChange={(e) => {
                            const copy = [...testimonials];
                            copy[idx] = { ...copy[idx], quote: e.target.value };
                            onUpdateTestimonials(copy);
                          }}
                          className={inputCls}
                        />

                        <ImageInputField
                          label="Client Avatar Image"
                          value={t.avatarUrl}
                          onChange={(val) => {
                            const copy = [...testimonials];
                            copy[idx] = { ...copy[idx], avatarUrl: val };
                            onUpdateTestimonials(copy);
                          }}
                          defaultValue={INITIAL_TESTIMONIALS[0].avatarUrl}
                          aspectClass="w-12 h-12"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add testimonial */}
                  <form
                    onSubmit={handleAddTestimonial}
                    className="p-4 rounded-xl bg-[#0D1525] border border-dashed border-[#2A3B56] space-y-3"
                  >
                    <h5 className="text-xs font-bold uppercase text-blue-400">
                      Add New Testimonial
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={newTestimonial.name}
                        onChange={(e) =>
                          setNewTestimonial({ ...newTestimonial, name: e.target.value })
                        }
                        className={inputCls}
                      />
                      <input
                        type="text"
                        placeholder="Role / Community"
                        value={newTestimonial.role}
                        onChange={(e) =>
                          setNewTestimonial({ ...newTestimonial, role: e.target.value })
                        }
                        className={inputCls}
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Client review quote..."
                      value={newTestimonial.quote}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, quote: e.target.value })
                      }
                      className={inputCls}
                    />
                    <ImageInputField
                      label="New Client Avatar"
                      value={newTestimonial.avatarUrl}
                      onChange={(val) => setNewTestimonial({ ...newTestimonial, avatarUrl: val })}
                      defaultValue={INITIAL_TESTIMONIALS[0].avatarUrl}
                      aspectClass="w-12 h-12"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Testimonial</span>
                    </button>
                  </form>
                </SectionCard>

                <SectionCard title={`Frequently Asked Questions (${faqItems.length})`}>
                  <div className="space-y-3">
                    {faqItems.map((faq, idx) => (
                      <div
                        key={faq.id || idx}
                        className="p-4 bg-[#0D1525] rounded-xl border border-[#202E43] space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-blue-400">FAQ #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateFaq(faqItems.filter((_, i) => i !== idx))}
                            className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const copy = [...faqItems];
                            copy[idx] = { ...copy[idx], question: e.target.value };
                            onUpdateFaq(copy);
                          }}
                          className={inputCls}
                          placeholder="Question"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const copy = [...faqItems];
                            copy[idx] = { ...copy[idx], answer: e.target.value };
                            onUpdateFaq(copy);
                          }}
                          className={inputCls}
                          placeholder="Answer"
                        />
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleAddFaq}
                    className="p-4 rounded-xl bg-[#0D1525] border border-dashed border-[#2A3B56] space-y-2.5"
                  >
                    <h5 className="text-xs font-bold uppercase text-blue-400">Add New FAQ</h5>
                    <input
                      type="text"
                      placeholder="Question..."
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                      className={inputCls}
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer..."
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                      className={inputCls}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ Item</span>
                    </button>
                  </form>
                </SectionCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
