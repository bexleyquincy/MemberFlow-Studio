import React, { useRef, useState } from 'react';
import { Upload, RotateCcw, Image as ImageIcon, Loader2 } from 'lucide-react';
import { processUploadedImage } from '../../utils/imageUpload';

interface ImageInputFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  defaultValue?: string;
  helperText?: string;
  aspectClass?: string;
}

export const ImageInputField: React.FC<ImageInputFieldProps> = ({
  label,
  value,
  onChange,
  defaultValue,
  helperText,
  aspectClass = 'w-24 h-16'
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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

  return (
    <div className="p-3.5 rounded-xl bg-[#0D1525] border border-[#202E43] space-y-2.5">
      <div className="flex items-center justify-between gap-2">
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

      {uploadError && <p className="text-[11px] text-rose-400">{uploadError}</p>}
    </div>
  );
};
