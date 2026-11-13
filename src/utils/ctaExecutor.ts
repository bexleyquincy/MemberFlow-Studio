import { CtaConfig, MediaPreviewPayload } from '../data/siteData';
import { normalizeExternalUrl, triggerExternalLink, triggerFileDownload } from './mediaHelpers';

export interface CtaExecutionHandlers {
  currentPath: string;
  navigate: (path: string) => void;
  openContact: () => void;
  openMediaPopup: (payload: MediaPreviewPayload) => void;
  openMediaPage: (payload: MediaPreviewPayload) => void;
  openCaseStudy?: () => void;
  fallbackContactEmail?: string;
}

function scrollToElementId(rawId: string): boolean {
  const cleanId = rawId.replace(/^#/, '').trim();
  if (!cleanId) return false;
  const el = document.getElementById(cleanId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
}

export function executeCtaAction(
  cta: CtaConfig | undefined,
  handlers: CtaExecutionHandlers,
  fallbackAction?: () => void
): void {
  if (!cta || !cta.actionType) {
    if (fallbackAction) fallbackAction();
    return;
  }

  const target = (cta.target || '').trim();

  switch (cta.actionType) {
    case 'none': {
      return;
    }

    case 'contact_popup': {
      handlers.openContact();
      return;
    }

    case 'case_study_modal': {
      if (handlers.openCaseStudy) {
        handlers.openCaseStudy();
      } else if (fallbackAction) {
        fallbackAction();
      } else {
        handlers.openContact();
      }
      return;
    }

    case 'internal_page': {
      const dest = target || '/';
      if (dest.startsWith('/#') || dest.startsWith('#')) {
        const cleanId = dest.replace(/^\/?#/, '');
        if (handlers.currentPath !== '/') {
          handlers.navigate('/');
          setTimeout(() => scrollToElementId(cleanId), 150);
        } else {
          scrollToElementId(cleanId);
        }
        return;
      }
      const route = dest.startsWith('/') ? dest : `/${dest}`;
      handlers.navigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    case 'scroll_section': {
      const cleanId = target.replace(/^\/?#/, '');
      if (scrollToElementId(cleanId)) {
        return;
      }
      if (handlers.currentPath !== '/') {
        handlers.navigate('/');
        setTimeout(() => {
          scrollToElementId(cleanId);
        }, 160);
      } else if (fallbackAction) {
        fallbackAction();
      }
      return;
    }

    case 'external_url': {
      if (!target) {
        handlers.openContact();
        return;
      }
      triggerExternalLink(target, cta.openInNewTab !== false);
      return;
    }

    case 'media_popup': {
      if (!target) {
        handlers.openContact();
        return;
      }
      handlers.openMediaPopup({
        url: target,
        title: cta.mediaTitle || cta.label || 'Featured Preview',
        description: cta.mediaDescription || ''
      });
      return;
    }

    case 'media_internal': {
      if (!target) {
        handlers.openContact();
        return;
      }
      handlers.openMediaPage({
        url: target,
        title: cta.mediaTitle || cta.label || 'Media Showcase',
        description: cta.mediaDescription || ''
      });
      return;
    }

    case 'media_external': {
      if (!target) {
        handlers.openContact();
        return;
      }
      triggerExternalLink(target, true);
      return;
    }

    case 'download_file': {
      if (!target) {
        handlers.openContact();
        return;
      }
      triggerFileDownload(target, cta.downloadFilename);
      return;
    }

    case 'email_mailto': {
      const raw = target || handlers.fallbackContactEmail || 'femizydasilver@gmail.com';
      const href =
        raw.startsWith('mailto:') || raw.startsWith('tel:')
          ? raw
          : raw.includes('@')
          ? `mailto:${raw}`
          : normalizeExternalUrl(raw);
      window.location.href = href;
      return;
    }

    default: {
      if (fallbackAction) fallbackAction();
    }
  }
}
