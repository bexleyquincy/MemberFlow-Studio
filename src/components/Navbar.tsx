import React, { useState } from 'react';
import { Layers, Shield, X, Menu, ArrowRight } from 'lucide-react';
import { CtaConfig, SiteConfig } from '../data/siteData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  onExecuteCta: (cta: CtaConfig | undefined, fallbackAction?: () => void) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  siteConfig,
  onOpenContact,
  onOpenAdmin,
  onExecuteCta
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: siteConfig.navigation.homeLabel, path: '/' },
    { label: siteConfig.navigation.servicesLabel, path: '/services' },
    { label: siteConfig.navigation.portfolioLabel, path: '/portfolio' },
    { label: siteConfig.navigation.aboutLabel, path: '/about' },
    { label: siteConfig.navigation.faqLabel, path: '/#faq' }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#10192B]/90 backdrop-blur-md border-b border-[#202E43]/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Brand Zone: Logo + Geometric M Monogram */}
        <button
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M4 19V5L12 13L20 5V19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              {siteConfig.brandName}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-blue-400 -mt-1">
              {siteConfig.brandSubtext}
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`transition-colors duration-150 py-1 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#AAB7CC] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Zone */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Control Trigger */}
          <button
            onClick={onOpenAdmin}
            title="Open Secured Admin Control Panel"
            className="p-2 text-xs text-[#AAB7CC] hover:text-white hover:bg-[#202E43]/60 rounded-lg border border-[#202E43] flex items-center gap-1.5 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs">Admin Control</span>
          </button>

          <button
            onClick={() => onExecuteCta(siteConfig.navigation.ctaAction, onOpenContact)}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 active:scale-95 transition-all duration-150 flex items-center gap-2"
          >
            <span>{siteConfig.navigation.ctaAction?.label || siteConfig.navigation.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            title="Admin Control"
            className="p-2 text-[#AAB7CC] hover:text-white rounded-lg bg-[#202E43]/60"
          >
            <Shield className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#202E43] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#10192B] border-b border-[#202E43] px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`text-base py-2 px-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-white font-semibold'
                      : 'text-[#AAB7CC] hover:text-white hover:bg-[#202E43]/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#202E43] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExecuteCta(siteConfig.navigation.ctaAction, onOpenContact);
              }}
              className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>{siteConfig.navigation.ctaAction?.label || siteConfig.navigation.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
