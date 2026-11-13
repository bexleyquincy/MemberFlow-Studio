import React, { useRef, useState } from 'react';
import { Upload, RotateCcw, Image as ImageIcon, Loader2, Link2, Unlink } from 'lucide-react';
import { processUploadedImage } from '../../utils/imageUpload';
import { CtaConfig, DEFAULT_NONE_LINK } from '../../data/siteData';
import { CtaActionEditor, ACTION_TYPE_LABELS } from './CtaActionEditor';

interface ImageInputFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  defaultValue?: string;
  helperText?: string;
  aspectClass?: string;
  imageLink?: CtaConfig;
  onImageLinkChange?: (nextLink: CtaConfig) => void;
}

export const ImageInputField: React.FC<ImageInputFieldProps> = ({
  label,
  value,
  onChange,
  defaultValue,
  helperText,
  aspectClass = 'w-24 h-16',
  imageLink,
  onImageLinkChange
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showLinkEditor, setShowLinkEditor] = useState(false);

  const isImageLinked = Boolean(imageLink && imageLink.actionType && imageLink.actionType !== 'none');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setIsProcessing(true);
    try {
      const dataUrl = await processUploadedImage(file);
      onChange(dataUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to load image.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleToggleImageLink = () => {
    if (!onImageLinkChange) return;
    if (isImageLinked) {
      onImageLinkChange({ ...DEFAULT_NONE_LINK });
      setShowLinkEditor(false);
    } else {
      onImageLinkChange({
        ...(imageLink || DEFAULT_NONE_LINK),
        actionType: 'external_url'
      });
      setShowLinkEditor(true);
    }
  };

  return (
    <div className="p-3.5 rounded-xl bg-[#0D1525] border border-[#202E43] space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/35 text-blue-300 border border-blue-500/30 text-[11px] font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Upload className="w-3 h-3" />
            )}
            <span>{isProcessing ? 'Processing...' : 'Upload Image'}</span>
          </button>

          {defaultValue && value !== defaultValue && (
            <button
              type="button"
              onClick={() => onChange(defaultValue)}
              title="Reset image to default"
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Default</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`${aspectClass} rounded-lg overflow-hidden bg-[#152033] border border-[#202E43] shrink-0 flex items-center justify-center`}
        >
          {value ? (
            <img
              src={value}
              alt={label}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-500" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <input
            type="text"
            value={value.startsWith('data:') ? '[Uploaded Local Image]' : value}
            onChange={(e) => {
              if (e.target.value !== '[Uploaded Local Image]') {
                onChange(e.target.value);
              }
            }}
            placeholder="Paste image URL (https://...) or click Upload Image"
            className="w-full px-3 py-2 bg-[#152033] border border-[#202E43] rounded-lg text-xs text-white font-mono focus:outline-none focus:border-blue-500"
          />
          {value.startsWith('data:') && (
            <div className="flex items-center justify-between text-[11px] text-emerald-400">
              <span>Custom uploaded image stored locally</span>
              <button
                type="button"
                onClick={() => onChange(defaultValue || '')}
                className="text-slate-400 hover:text-white underline"
              >
                Clear upload
              </button>
            </div>
          )}
          {helperText && !value.startsWith('data:') && (
            <p className="text-[11px] text-slate-400">{helperText}</p>
          )}
        </div>
      </div>

      {onImageLinkChange && (
        <div className="pt-2 border-t border-[#202E43]/70 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
              {isImageLinked ? (
                <Link2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Unlink className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>
                Image Click Link:{' '}
                <strong className={isImageLinked ? 'text-emerald-400' : 'text-slate-400'}>
                  {isImageLinked && imageLink
                    ? ACTION_TYPE_LABELS[imageLink.actionType]
                    : 'Not Linked'}
                </strong>
              </span>
            </span>

            <div className="flex items-center gap-2">
              {isImageLinked && (
                <button
                  type="button"
                  onClick={() => setShowLinkEditor((s) => !s)}
                  className="px-2.5 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600/35 text-blue-300 text-[11px] font-semibold"
                >
                  {showLinkEditor ? 'Hide Link Settings' : 'Configure Link'}
                </button>
              )}
              <button
                type="button"
                onClick={handleToggleImageLink}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors ${
                  isImageLinked
                    ? 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300'
                }`}
              >
                {isImageLinked ? 'Unlink Image' : 'Link This Image'}
              </button>
            </div>
          </div>

          {(showLinkEditor || (isImageLinked && !imageLink?.target && imageLink?.actionType !== 'contact_popup')) &&
            imageLink && (
              <CtaActionEditor
                value={imageLink}
                onChange={onImageLinkChange}
                allowNone
                noneLabel="No Link (Unlinked Image)"
                hideLabelInput={false}
              />
            )}
        </div>
      )}

      {uploadError && <p className="text-[11px] text-rose-400">{uploadError}</p>}
    </div>
  );
};

