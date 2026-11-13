import React, { useRef, useState } from 'react';
import {
  Link2,
  MousePointerClick,
  Upload,
  FileDown,
  Film,
  ExternalLink,
  Mail,
  MessageSquare,
  Navigation,
  ArrowDownCircle,
  Maximize2,
  Loader2,
  Ban
} from 'lucide-react';
import { CtaActionType, CtaConfig } from '../../data/siteData';
import { processUploadedImage } from '../../utils/imageUpload';

interface CtaActionEditorProps {
  title?: string;
  value: CtaConfig;
  onChange: (next: CtaConfig) => void;
  hideLabelInput?: boolean;
  allowNone?: boolean;
  noneLabel?: string;
  allowCaseStudy?: boolean;
}

const INTERNAL_PAGE_PRESETS = [
  { label: 'Home Page (/)', value: '/' },
  { label: 'Services Page (/services)', value: '/services' },
  { label: 'Portfolio Page (/portfolio)', value: '/portfolio' },
  { label: 'About Founder (/about)', value: '/about' },
  { label: 'FAQ Section (/#faq)', value: '/#faq' }
];

const SCROLL_SECTION_PRESETS = [
  { label: 'Featured Portfolio (#portfolio-section)', value: '#portfolio-section' },
  { label: 'Core Services Grid (#core-services)', value: '#core-services' },
  { label: 'Classrooms Gallery (#classrooms-gallery)', value: '#classrooms-gallery' },
  { label: 'Landing Pages Gallery (#landing-gallery)', value: '#landing-gallery' },
  { label: 'Founder Story (#founder-story)', value: '#founder-story' },
  { label: 'FAQ Accordion (#faq)', value: '#faq' }
];

export const ACTION_TYPE_LABELS: Record<CtaActionType, string> = {
  none: 'No Link (Disabled)',
  contact_popup: 'Open Contact Inquiry Popup',
  internal_page: 'Navigate to Internal Page',
  scroll_section: 'Scroll to Page Section',
  external_url: 'Open External Website URL',
  media_popup: 'Video / Image → Open as Popup',
  media_internal: 'Video / Image → Open on Internal Page',
  media_external: 'Video / Image → Open Externally',
  download_file: 'Download Document / File',
  email_mailto: 'Direct Email / Phone (mailto / tel)',
  case_study_modal: 'Open Featured Case Study Lightbox'
};

export const CtaActionEditor: React.FC<CtaActionEditorProps> = ({
  title,
  value,
  onChange,
  hideLabelInput = false,
  allowNone = false,
  noneLabel = 'Unlinked (No Action)',
  allowCaseStudy = false
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const safeValue: CtaConfig = {
    label: value?.label || '',
    actionType: value?.actionType || (allowNone ? 'none' : 'contact_popup'),
    target: value?.target || '',
    mediaTitle: value?.mediaTitle || '',
    mediaDescription: value?.mediaDescription || '',
    downloadFilename: value?.downloadFilename || '',
    openInNewTab: value?.openInNewTab !== false
  };

  const handleActionTypeChange = (nextType: CtaActionType) => {
    let defaultTarget = safeValue.target;
    if (nextType === 'internal_page' && !defaultTarget.startsWith('/')) {
      defaultTarget = '/services';
    } else if (nextType === 'scroll_section' && !defaultTarget.startsWith('#')) {
      defaultTarget = '#portfolio-section';
    } else if (nextType === 'none' || nextType === 'contact_popup' || nextType === 'case_study_modal') {
      defaultTarget = '';
    }
    onChange({
      ...safeValue,
      actionType: nextType,
      target: defaultTarget
    });
  };

  const handleMediaOrDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setIsUploading(true);
    try {
      if (file.type.startsWith('image/') && safeValue.actionType !== 'download_file') {
        const dataUrl = await processUploadedImage(file);
        onChange({
          ...safeValue,
          target: dataUrl,
          mediaTitle: safeValue.mediaTitle || file.name.replace(/\.[^.]+$/, '')
        });
      } else {
        // Max ~1.5MB so localStorage remains fast and reliable
        if (file.size > 1.5 * 1024 * 1024) {
          throw new Error(
            'File exceeds 1.5MB browser storage limit. Host larger files externally and paste the download URL.'
          );
        }
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') resolve(reader.result);
            else reject(new Error('Could not read file.'));
          };
          reader.onerror = () => reject(new Error('Failed to read selected file.'));
          reader.readAsDataURL(file);
        });
        onChange({
          ...safeValue,
          target: dataUrl,
          downloadFilename: safeValue.downloadFilename || file.name,
          mediaTitle: safeValue.mediaTitle || file.name
        });
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'File upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const renderTypeIcon = () => {
    switch (safeValue.actionType) {
      case 'none':
        return <Ban className="w-3.5 h-3.5 text-slate-400" />;
      case 'contact_popup':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-400" />;
      case 'internal_page':
        return <Navigation className="w-3.5 h-3.5 text-blue-400" />;
      case 'scroll_section':
        return <ArrowDownCircle className="w-3.5 h-3.5 text-blue-400" />;
      case 'external_url':
        return <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />;
      case 'media_popup':
      case 'media_internal':
      case 'media_external':
        return <Film className="w-3.5 h-3.5 text-purple-400" />;
      case 'download_file':
        return <FileDown className="w-3.5 h-3.5 text-amber-400" />;
      case 'email_mailto':
        return <Mail className="w-3.5 h-3.5 text-cyan-400" />;
      case 'case_study_modal':
        return <Maximize2 className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Link2 className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const inputCls =
    'w-full px-3 py-2 bg-[#152033] border border-[#202E43] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500';

  const isMediaAction =
    safeValue.actionType === 'media_popup' ||
    safeValue.actionType === 'media_internal' ||
    safeValue.actionType === 'media_external';

  return (
    <div className="p-3.5 rounded-xl bg-[#0D1525] border border-[#202E43] space-y-3">
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-[#202E43]/70 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>{title}</span>
          </span>
          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
            {renderTypeIcon()}
            <span className="hidden sm:inline">
              {safeValue.actionType === 'none'
                ? noneLabel
                : ACTION_TYPE_LABELS[safeValue.actionType]}
            </span>
          </span>
        </div>
      )}

      <div className={`grid grid-cols-1 ${hideLabelInput ? '' : 'sm:grid-cols-2'} gap-3`}>
        {!hideLabelInput && (
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-300 mb-1">
              Button Text (Label)
            </label>
            <input
              type="text"
              value={safeValue.label}
              onChange={(e) => onChange({ ...safeValue, label: e.target.value })}
              placeholder="e.g. Explore Our Services"
              className={inputCls}
            />
          </div>
        )}

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-300 mb-1">
            Destination / Click Action
          </label>
          <select
            value={safeValue.actionType}
            onChange={(e) => handleActionTypeChange(e.target.value as CtaActionType)}
            className={inputCls}
          >
            {allowNone && <option value="none">{noneLabel}</option>}
            <option value="contact_popup">Open Contact Inquiry Popup</option>
            <option value="internal_page">Internal Website Page (/services, /portfolio...)</option>
            <option value="scroll_section">Scroll to Section on Page (#faq, #portfolio...)</option>
            <option value="external_url">External Webpage (New Tab URL)</option>
            <option value="media_popup">Video / Image → Open as Popup</option>
            <option value="media_internal">Video / Image → Open Internally on Media Page</option>
            <option value="media_external">Video / Image → Open Externally</option>
            <option value="download_file">Download Document / File</option>
            <option value="email_mailto">Direct Email / Phone (mailto / tel)</option>
            {(allowCaseStudy || safeValue.actionType === 'case_study_modal') && (
              <option value="case_study_modal">Featured Case Study Lightbox</option>
            )}
          </select>
        </div>
      </div>

      {/* Conditional Destination Fields */}
      {safeValue.actionType === 'internal_page' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Quick Page Preset</label>
            <select
              value={
                INTERNAL_PAGE_PRESETS.some((p) => p.value === safeValue.target)
                  ? safeValue.target
                  : 'custom'
              }
              onChange={(e) => {
                if (e.target.value !== 'custom') {
                  onChange({ ...safeValue, target: e.target.value });
                }
              }}
              className={inputCls}
            >
              {INTERNAL_PAGE_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
              <option value="custom">Custom Internal Path...</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Route Path</label>
            <input
              type="text"
              value={safeValue.target}
              onChange={(e) => onChange({ ...safeValue, target: e.target.value })}
              placeholder="/services"
              className={`${inputCls} font-mono`}
            />
          </div>
        </div>
      )}

      {safeValue.actionType === 'scroll_section' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Section Preset</label>
            <select
              value={
                SCROLL_SECTION_PRESETS.some((p) => p.value === safeValue.target)
                  ? safeValue.target
                  : 'custom'
              }
              onChange={(e) => {
                if (e.target.value !== 'custom') {
                  onChange({ ...safeValue, target: e.target.value });
                }
              }}
              className={inputCls}
            >
              {SCROLL_SECTION_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
              <option value="custom">Custom Section ID...</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Target Element ID</label>
            <input
              type="text"
              value={safeValue.target}
              onChange={(e) => onChange({ ...safeValue, target: e.target.value })}
              placeholder="#portfolio-section"
              className={`${inputCls} font-mono`}
            />
          </div>
        </div>
      )}

      {safeValue.actionType === 'external_url' && (
        <div className="space-y-2 pt-1">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">External Website URL</label>
            <input
              type="url"
              value={safeValue.target}
              onChange={(e) => onChange({ ...safeValue, target: e.target.value })}
              placeholder="https://www.skool.com/your-community"
              className={`${inputCls} font-mono`}
            />
          </div>
          <label className="inline-flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={safeValue.openInNewTab !== false}
              onChange={(e) => onChange({ ...safeValue, openInNewTab: e.target.checked })}
              className="rounded border-[#202E43] bg-[#152033] text-blue-600"
            />
            <span>Open external page in a new browser tab</span>
          </label>
        </div>
      )}

      {isMediaAction && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] text-slate-400">
              Video or Image URL (YouTube, Vimeo, Loom, MP4, or Image URL)
            </label>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaOrDocUpload}
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600/35 text-blue-300 border border-blue-500/30 text-[10px] font-semibold inline-flex items-center gap-1"
              >
                {isUploading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Upload className="w-3 h-3" />
                )}
                <span>Upload Image/Clip</span>
              </button>
            </div>
          </div>

          <input
            type="text"
            value={safeValue.target.startsWith('data:') ? '[Uploaded Local Media]' : safeValue.target}
            onChange={(e) => {
              if (e.target.value !== '[Uploaded Local Media]') {
                onChange({ ...safeValue, target: e.target.value });
              }
            }}
            placeholder="https://www.youtube.com/watch?v=... or https://.../preview.png"
            className={`${inputCls} font-mono`}
          />

          {safeValue.target.startsWith('data:') && (
            <div className="flex items-center justify-between text-[11px] text-emerald-400">
              <span>Uploaded media attached</span>
              <button
                type="button"
                onClick={() => onChange({ ...safeValue, target: '' })}
                className="text-slate-400 hover:text-white underline"
              >
                Clear media
              </button>
            </div>
          )}

          {safeValue.actionType !== 'media_external' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Media Viewer Title (Optional)
                </label>
                <input
                  type="text"
                  value={safeValue.mediaTitle || ''}
                  onChange={(e) => onChange({ ...safeValue, mediaTitle: e.target.value })}
                  placeholder="Classroom Walkthrough"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  Caption / Description (Optional)
                </label>
                <input
                  type="text"
                  value={safeValue.mediaDescription || ''}
                  onChange={(e) => onChange({ ...safeValue, mediaDescription: e.target.value })}
                  placeholder="Brief summary displayed under the media"
                  className={inputCls}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {safeValue.actionType === 'download_file' && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] text-slate-400">
              Document / File URL or Upload (PDF, DOCX, Guide, Image)
            </label>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt,.csv,.zip,.png,.jpg,.jpeg,.webp"
                onChange={handleMediaOrDocUpload}
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border border-amber-500/30 text-[10px] font-semibold inline-flex items-center gap-1"
              >
                {isUploading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Upload className="w-3 h-3" />
                )}
                <span>Upload File</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Download File URL</label>
              <input
                type="text"
                value={
                  safeValue.target.startsWith('data:')
                    ? `[Uploaded File: ${safeValue.downloadFilename || 'document'}]`
                    : safeValue.target
                }
                onChange={(e) => {
                  if (!e.target.value.startsWith('[Uploaded File')) {
                    onChange({ ...safeValue, target: e.target.value });
                  }
                }}
                placeholder="https://example.com/skool-checklist.pdf"
                className={`${inputCls} font-mono`}
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">
                Downloaded Filename
              </label>
              <input
                type="text"
                value={safeValue.downloadFilename || ''}
                onChange={(e) => onChange({ ...safeValue, downloadFilename: e.target.value })}
                placeholder="MemberFlow-Skool-Guide.pdf"
                className={inputCls}
              />
            </div>
          </div>

          {safeValue.target.startsWith('data:') && (
            <div className="flex items-center justify-between text-[11px] text-emerald-400">
              <span>Document uploaded and ready for visitor download</span>
              <button
                type="button"
                onClick={() => onChange({ ...safeValue, target: '', downloadFilename: '' })}
                className="text-slate-400 hover:text-white underline"
              >
                Clear file
              </button>
            </div>
          )}
        </div>
      )}

      {safeValue.actionType === 'email_mailto' && (
        <div className="pt-1">
          <label className="block text-[10px] text-slate-400 mb-1">
            Email Address or Phone (e.g. femizydasilver@gmail.com or tel:+1234567890)
          </label>
          <input
            type="text"
            value={safeValue.target}
            onChange={(e) => onChange({ ...safeValue, target: e.target.value })}
            placeholder="femizydasilver@gmail.com"
            className={`${inputCls} font-mono`}
          />
        </div>
      )}

      {uploadError && <p className="text-[11px] text-rose-400">{uploadError}</p>}
    </div>
  );
};
