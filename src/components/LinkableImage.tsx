import React from 'react';
import { ExternalLink, Play, Download, ArrowUpRight, Maximize2 } from 'lucide-react';
import { CtaConfig } from '../data/siteData';

interface LinkableImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  imageLink?: CtaConfig;
  onExecuteAction?: (cta: CtaConfig) => void;
  showHoverOverlay?: boolean;
}

export const LinkableImage: React.FC<LinkableImageProps> = ({
  src,
  alt,
  className = 'w-full h-auto object-cover',
  wrapperClassName = '',
  fallbackSrc,
  loading,
  imageLink,
  onExecuteAction,
  showHoverOverlay = true
}) => {
  const isLinked = Boolean(
    imageLink && imageLink.actionType && imageLink.actionType !== 'none' && onExecuteAction
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!fallbackSrc) return;
    const img = e.currentTarget;
    if (img.src !== fallbackSrc && !img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = '1';
      img.src = fallbackSrc;
    }
  };

  const renderBadgeIcon = () => {
    if (!imageLink) return null;
    switch (imageLink.actionType) {
      case 'media_popup':
      case 'media_internal':
      case 'media_external':
        return <Play className="w-3.5 h-3.5 fill-current" />;
      case 'download_file':
        return <Download className="w-3.5 h-3.5" />;
      case 'external_url':
        return <ExternalLink className="w-3.5 h-3.5" />;
      case 'case_study_modal':
        return <Maximize2 className="w-3.5 h-3.5" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5" />;
    }
  };

  if (!isLinked || !imageLink || !onExecuteAction) {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onExecuteAction(imageLink)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExecuteAction(imageLink);
        }
      }}
      aria-label={imageLink.label || `Open ${alt}`}
      className={`group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${wrapperClassName}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        loading={loading}
        className={`${className} transition-transform duration-300 group-hover:scale-[1.02]`}
      />
      {showHoverOverlay && (
        <div className="pointer-events-none absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-[#10192B]/85 backdrop-blur-md border border-blue-500/40 text-white text-[11px] font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          {renderBadgeIcon()}
          {imageLink.label && imageLink.label !== 'Open Link' && (
            <span className="max-w-[140px] truncate">{imageLink.label}</span>
          )}
        </div>
      )}
    </div>
  );
};
