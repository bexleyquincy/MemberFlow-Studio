import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { AdminModal } from './components/AdminModal';
import { LightboxModal } from './components/LightboxModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import {
  SiteConfig,
  Project,
  ServiceItem,
  Testimonial,
  FaqItem,
  INITIAL_SITE_CONFIG,
  CORE_SERVICES,
  INITIAL_CLASSROOM_PROJECTS,
  INITIAL_LANDING_PAGE_PROJECTS,
  FEATURED_CASE_STUDY,
  INITIAL_TESTIMONIALS,
  FAQ_ITEMS,
  CLASSROOM_DESIGN_HUB_IMAGE,
  LANDING_REAL_ESTATE_IMAGE,
  sanitizeSiteConfig,
  sanitizeProjects,
  sanitizeFeaturedCaseStudy,
  sanitizeTestimonials
} from './data/siteData';

const STORAGE_KEYS = {
  siteConfig: 'memberflow_site_config',
  services: 'memberflow_services',
  classrooms: 'memberflow_classroom_projects',
  landings: 'memberflow_landing_projects',
  caseStudy: 'memberflow_featured_case_study',
  testimonials: 'memberflow_testimonials',
  faq: 'memberflow_faq_items'
};

export interface FullSiteBackup {
  siteConfig: SiteConfig;
  services: ServiceItem[];
  classroomProjects: Project[];
  landingProjects: Project[];
  featuredCaseStudy: Project;
  testimonials: Testimonial[];
  faqItems: FaqItem[];
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      const p = window.location.pathname;
      if (['/services', '/portfolio', '/about'].includes(p)) return p;
    }
    return '/';
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.siteConfig);
      if (saved) {
        const sanitized = sanitizeSiteConfig(JSON.parse(saved));
        localStorage.setItem(STORAGE_KEYS.siteConfig, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SITE_CONFIG;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.services);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return CORE_SERVICES;
  });

  const [classroomProjects, setClassroomProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.classrooms);
      if (saved) {
        const sanitized = sanitizeProjects(
          JSON.parse(saved),
          INITIAL_CLASSROOM_PROJECTS,
          CLASSROOM_DESIGN_HUB_IMAGE
        );
        localStorage.setItem(STORAGE_KEYS.classrooms, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CLASSROOM_PROJECTS;
  });

  const [landingProjects, setLandingProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.landings);
      if (saved) {
        const sanitized = sanitizeProjects(
          JSON.parse(saved),
          INITIAL_LANDING_PAGE_PROJECTS,
          LANDING_REAL_ESTATE_IMAGE
        );
        localStorage.setItem(STORAGE_KEYS.landings, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LANDING_PAGE_PROJECTS;
  });

  const [featuredCaseStudy, setFeaturedCaseStudy] = useState<Project>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.caseStudy);
      if (saved) {
        const sanitized = sanitizeFeaturedCaseStudy(JSON.parse(saved));
        localStorage.setItem(STORAGE_KEYS.caseStudy, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch (e) {
      console.error(e);
    }
    return FEATURED_CASE_STUDY;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.testimonials);
      if (saved) {
        const sanitized = sanitizeTestimonials(JSON.parse(saved));
        localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(sanitized));
        return sanitized;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TESTIMONIALS;
  });

  const [faqItems, setFaqItems] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.faq);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return FAQ_ITEMS;
  });

  // Modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState<Project | null>(null);

  // Sync SEO metadata & accent color dynamically
  useEffect(() => {
    if (siteConfig.seo?.title) {
      document.title = siteConfig.seo.title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && siteConfig.seo?.description) {
      metaDesc.setAttribute('content', siteConfig.seo.description);
    }
    if (siteConfig.theme?.accentColor) {
      document.documentElement.style.setProperty('--mf-accent', siteConfig.theme.accentColor);
    }
  }, [siteConfig.seo, siteConfig.theme]);

  // Sync route with browser history (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (window.history.pushState) {
      window.history.pushState({}, '', path);
    }
  };

  const persist = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage save failed:', e);
    }
  };

  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    persist(STORAGE_KEYS.siteConfig, newConfig);
  };

  const handleUpdateServices = (items: ServiceItem[]) => {
    setServices(items);
    persist(STORAGE_KEYS.services, items);
  };

  const handleUpdateClassrooms = (projects: Project[]) => {
    setClassroomProjects(projects);
    persist(STORAGE_KEYS.classrooms, projects);
  };

  const handleUpdateLandings = (projects: Project[]) => {
    setLandingProjects(projects);
    persist(STORAGE_KEYS.landings, projects);
  };

  const handleUpdateCaseStudy = (study: Project) => {
    setFeaturedCaseStudy(study);
    persist(STORAGE_KEYS.caseStudy, study);
  };

  const handleUpdateTestimonials = (items: Testimonial[]) => {
    setTestimonials(items);
    persist(STORAGE_KEYS.testimonials, items);
  };

  const handleUpdateFaq = (items: FaqItem[]) => {
    setFaqItems(items);
    persist(STORAGE_KEYS.faq, items);
  };

  const handleImportBackup = (backup: FullSiteBackup) => {
    if (backup.siteConfig) handleUpdateSiteConfig(sanitizeSiteConfig(backup.siteConfig));
    if (Array.isArray(backup.services)) handleUpdateServices(backup.services);
    if (Array.isArray(backup.classroomProjects)) handleUpdateClassrooms(backup.classroomProjects);
    if (Array.isArray(backup.landingProjects)) handleUpdateLandings(backup.landingProjects);
    if (backup.featuredCaseStudy) {
      handleUpdateCaseStudy(sanitizeFeaturedCaseStudy(backup.featuredCaseStudy));
    }
    if (Array.isArray(backup.testimonials)) handleUpdateTestimonials(backup.testimonials);
    if (Array.isArray(backup.faqItems)) handleUpdateFaq(backup.faqItems);
  };

  const handleResetToDefaults = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setServices(CORE_SERVICES);
    setClassroomProjects(INITIAL_CLASSROOM_PROJECTS);
    setLandingProjects(INITIAL_LANDING_PAGE_PROJECTS);
    setFeaturedCaseStudy(FEATURED_CASE_STUDY);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqItems(FAQ_ITEMS);
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#10192B] selection:bg-blue-600 selection:text-white">
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        siteConfig={siteConfig}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-grow">
        {currentPath === '/' && (
          <HomePage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            services={services}
            classroomProjects={classroomProjects}
            landingProjects={landingProjects}
            testimonials={testimonials}
            faqItems={faqItems}
            onOpenContact={() => setIsContactOpen(true)}
            onSelectProject={(p) => setSelectedLightboxProject(p)}
          />
        )}

        {currentPath === '/services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            services={services}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPath === '/portfolio' && (
          <PortfolioPage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            classroomProjects={classroomProjects}
            landingProjects={landingProjects}
            featuredCaseStudy={featuredCaseStudy}
            onOpenContact={() => setIsContactOpen(true)}
            onSelectProject={(p) => setSelectedLightboxProject(p)}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        )}

        {currentPath === '/about' && (
          <AboutPage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        siteConfig={siteConfig}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        contactEmail={siteConfig.contactEmail}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteConfig={siteConfig}
        onUpdateSiteConfig={handleUpdateSiteConfig}
        services={services}
        onUpdateServices={handleUpdateServices}
        classroomProjects={classroomProjects}
        onUpdateClassrooms={handleUpdateClassrooms}
        landingProjects={landingProjects}
        onUpdateLandings={handleUpdateLandings}
        featuredCaseStudy={featuredCaseStudy}
        onUpdateFeaturedCaseStudy={handleUpdateCaseStudy}
        testimonials={testimonials}
        onUpdateTestimonials={handleUpdateTestimonials}
        faqItems={faqItems}
        onUpdateFaq={handleUpdateFaq}
        onImportBackup={handleImportBackup}
        onResetToDefaults={handleResetToDefaults}
      />

      <LightboxModal
        project={selectedLightboxProject}
        onClose={() => setSelectedLightboxProject(null)}
        onOpenContact={() => {
          setSelectedLightboxProject(null);
          setIsContactOpen(true);
        }}
      />
    </div>
  );
}
