import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { MediaPreviewPayload } from '../data/siteData';
import { parseMediaSource, triggerExternalLink } from '../utils/mediaHelpers';

interface MediaPopupModalProps {
  media: MediaPreviewPayload | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const MediaPopupModal: React.FC<MediaPopupModalProps> = ({
  media,
  onClose,
  onOpenContact
}) => {
  useEffect(() => {
    if (!media) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [media, onClose]);

  if (!media) return null;

  const parsed = parseMediaSource(media.url);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#152033] border border-[#202E43] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={media.title || 'Media Preview'}
      >
        <div className="px-6 py-4 border-b border-[#202E43] flex items-center justify-between gap-4 bg-[#10192B]">
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-wider font-bold text-blue-400">
              MemberFlow Studio Media Preview
            </span>
            <h3 className="text-lg font-bold font-heading text-white truncate">
              {media.title || 'Featured Video / Visual'}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {parsed.originalUrl && !parsed.originalUrl.startsWith('data:') && (
              <button
                type="button"
                onClick={() => triggerExternalLink(parsed.originalUrl, true)}
                className="px-3 py-1.5 rounded-lg bg-[#152033] hover:bg-[#202E43] border border-[#202E43] text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202E43] transition-colors"
              aria-label="Close media popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <div className="rounded-xl overflow-hidden border border-[#202E43] bg-[#0A101D] shadow-lg">
            {(parsed.kind === 'youtube' ||
              parsed.kind === 'vimeo' ||
              parsed.kind === 'loom' ||
              parsed.kind === 'iframe') && (
              <div className="relative aspect-video w-full">
                <iframe
                  src={parsed.embedUrl}
                  title={media.title || 'Embedded media'}
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
                className="w-full max-h-[65vh] bg-black"
              />
            )}

            {parsed.kind === 'image' && (
              <img
                src={parsed.embedUrl}
                alt={media.title || 'Preview'}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[68vh] object-contain mx-auto"
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {media.description ? (
              <p className="text-sm text-[#AAB7CC] leading-relaxed max-w-2xl">
                {media.description}
              </p>
            ) : (
              <p className="text-xs text-[#AAB7CC]">
                Want to build a community experience like this? Reach out directly.
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 shrink-0 transition-all shadow-lg shadow-blue-600/25"
            >
              <span>Start a Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
