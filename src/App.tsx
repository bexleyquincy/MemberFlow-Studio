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
  Testimonial,
  INITIAL_SITE_CONFIG, 
  INITIAL_CLASSROOM_PROJECTS, 
  INITIAL_LANDING_PAGE_PROJECTS, 
  INITIAL_TESTIMONIALS 
} from './data/siteData';

export default function App() {
  // Current route state: '/', '/services', '/portfolio', '/about'
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      const p = window.location.pathname;
      if (['/services', '/portfolio', '/about'].includes(p)) return p;
    }
    return '/';
  });

  // Persisted or live configuration states
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('memberflow_site_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SITE_CONFIG;
  });

  const [classroomProjects, setClassroomProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('memberflow_classroom_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CLASSROOM_PROJECTS;
  });

  const [landingProjects, setLandingProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('memberflow_landing_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LANDING_PAGE_PROJECTS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('memberflow_testimonials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TESTIMONIALS;
  });

  // Modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState<Project | null>(null);

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

  // Admin persistence callbacks
  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    try {
      localStorage.setItem('memberflow_site_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateClassrooms = (projects: Project[]) => {
    setClassroomProjects(projects);
    try {
      localStorage.setItem('memberflow_classroom_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateLandings = (projects: Project[]) => {
    setLandingProjects(projects);
    try {
      localStorage.setItem('memberflow_landing_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateTestimonials = (items: Testimonial[]) => {
    setTestimonials(items);
    try {
      localStorage.setItem('memberflow_testimonials', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset all website data, founder credentials and project galleries back to official defaults?')) {
      setSiteConfig(INITIAL_SITE_CONFIG);
      setClassroomProjects(INITIAL_CLASSROOM_PROJECTS);
      setLandingProjects(INITIAL_LANDING_PAGE_PROJECTS);
      setTestimonials(INITIAL_TESTIMONIALS);
      localStorage.removeItem('memberflow_site_config');
      localStorage.removeItem('memberflow_classroom_projects');
      localStorage.removeItem('memberflow_landing_projects');
      localStorage.removeItem('memberflow_testimonials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#10192B] selection:bg-blue-600 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        siteConfig={siteConfig}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Multi-Page Route Render */}
      <main className="flex-grow">
        {currentPath === '/' && (
          <HomePage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            classroomProjects={classroomProjects}
            landingProjects={landingProjects}
            testimonials={testimonials}
            onOpenContact={() => setIsContactOpen(true)}
            onSelectProject={(p) => setSelectedLightboxProject(p)}
          />
        )}

        {currentPath === '/services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPath === '/portfolio' && (
          <PortfolioPage
            onNavigate={handleNavigate}
            siteConfig={siteConfig}
            classroomProjects={classroomProjects}
            landingProjects={landingProjects}
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

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        siteConfig={siteConfig}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Overlays */}
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
        classroomProjects={classroomProjects}
        onUpdateClassrooms={handleUpdateClassrooms}
        landingProjects={landingProjects}
        onUpdateLandings={handleUpdateLandings}
        testimonials={testimonials}
        onUpdateTestimonials={handleUpdateTestimonials}
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
