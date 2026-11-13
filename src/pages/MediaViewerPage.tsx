import React from 'react';
import { ArrowLeft, ExternalLink, ArrowRight, Film } from 'lucide-react';
import { MediaPreviewPayload, SiteConfig } from '../data/siteData';
import { parseMediaSource, triggerExternalLink } from '../utils/mediaHelpers';

interface MediaViewerPageProps {
  media: MediaPreviewPayload | null;
  siteConfig: SiteConfig;
  onBack: () => void;
  onOpenContact: () => void;
}

export const MediaViewerPage: React.FC<MediaViewerPageProps> = ({
  media,
  siteConfig,
  onBack,
  onOpenContact
}) => {
  const effectiveMedia: MediaPreviewPayload = media || {
    url: siteConfig.homePage.heroImage,
    title: `${siteConfig.brandName} — Featured Showcase`,
    description: siteConfig.tagline
  };

  const parsed = parseMediaSource(effectiveMedia.url);

  return (
    <div className="min-h-[82vh] bg-[#10192B] text-slate-100 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-[#152033] hover:bg-[#202E43] border border-[#202E43] text-xs font-semibold text-white inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to Website</span>
          </button>

          <div className="flex items-center gap-3">
            {parsed.originalUrl && !parsed.originalUrl.startsWith('data:') && (
              <button
                type="button"
                onClick={() => triggerExternalLink(parsed.originalUrl, true)}
                className="px-4 py-2 rounded-full bg-[#152033] hover:bg-[#202E43] border border-[#202E43] text-xs font-semibold text-slate-200 inline-flex items-center gap-2 transition-colors"
              >
                <span>Open Externally</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </button>
            )}
            <button
              type="button"
              onClick={onOpenContact}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-blue-600/25"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Film className="w-3.5 h-3.5" />
            <span>{siteConfig.brandName} Media Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            {effectiveMedia.title || 'Featured Showcase'}
          </h1>
          {effectiveMedia.description && (
            <p className="text-sm sm:text-base text-[#AAB7CC] max-w-3xl leading-relaxed">
              {effectiveMedia.description}
            </p>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#202E43] bg-[#0A101D] shadow-2xl">
          {(parsed.kind === 'youtube' ||
            parsed.kind === 'vimeo' ||
            parsed.kind === 'loom' ||
            parsed.kind === 'iframe') && (
            <div className="relative aspect-video w-full">
              <iframe
                src={parsed.embedUrl}
                title={effectiveMedia.title || 'Media player'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          )}

          {parsed.kind === 'video' && (
            <video
              src={parsed.embedUrl}
              controls
              autoPlay
              className="w-full max-h-[75vh] bg-black"
            />
          )}

          {parsed.kind === 'image' && (
            <img
              src={parsed.embedUrl}
              alt={effectiveMedia.title || 'Media showcase'}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[78vh] object-contain mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
};
