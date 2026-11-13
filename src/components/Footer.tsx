import React from 'react';
import { Youtube, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '../data/siteData';

interface FooterProps {
  onNavigate: (path: string) => void;
  siteConfig: SiteConfig;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, siteConfig, onOpenContact }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A101D] text-slate-400 border-t border-[#202E43]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Col 1: Brand & Founder Lockup */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19V5L12 13L20 5V19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                  {siteConfig.brandName}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-blue-400 block -mt-1">
                  {siteConfig.brandSubtext}
                </span>
              </div>
            </div>

            <p className="text-white font-medium text-base">
              "{siteConfig.tagline}"
            </p>
            <p className="text-sm text-[#AAB7CC] max-w-sm">
              Founded by <span className="text-white font-semibold">{siteConfig.founderName}</span>. {siteConfig.footer.description}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
              >
                <span>Direct Inquiries: {siteConfig.contactEmail}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="text-[#AAB7CC] hover:text-white transition-colors"
                >
                  {siteConfig.navigation.homeLabel} — Community Growth Overview
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLink(e, '/services')}
                  className="text-[#AAB7CC] hover:text-white transition-colors"
                >
                  {siteConfig.navigation.servicesLabel} — End-to-End Skool Solutions
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  onClick={(e) => handleLink(e, '/portfolio')}
                  className="text-[#AAB7CC] hover:text-white transition-colors"
                >
                  {siteConfig.navigation.portfolioLabel} — Classrooms & Landing Pages
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="text-[#AAB7CC] hover:text-white transition-colors"
                >
                  {siteConfig.navigation.aboutLabel} — {siteConfig.founderName}'s Story
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleLink(e, '/#faq')}
                  className="text-[#AAB7CC] hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Platforms */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-300">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3">
              {siteConfig.socials.youtube && (
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#202E43]/80 hover:bg-red-600/80 text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#202E43]/80 hover:bg-pink-600/80 text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteConfig.socials.linkedin && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#202E43]/80 hover:bg-blue-600/80 text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {siteConfig.socials.x && (
                <a
                  href={siteConfig.socials.x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#202E43]/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                  aria-label="X / Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>

            <div className="pt-3">
              <span className="text-xs text-slate-500 block">
                {siteConfig.footer.specialtyPrimary}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                {siteConfig.footer.specialtySecondary}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-14 pt-8 border-t border-[#202E43]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {siteConfig.footer.copyrightText}</p>
          <div className="flex items-center gap-4">
            <span>{siteConfig.footer.foundedByText}</span>
            <span>·</span>
            <span>{siteConfig.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
