import React from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../data/siteData';

interface LightboxModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  onClose,
  onOpenContact
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#10192B] border border-[#202E43] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        role="dialog"
      >
        {/* Top bar */}
        <div className="p-4 sm:px-6 border-b border-[#202E43] flex items-center justify-between bg-[#152033]">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-blue-400 block">
              {project.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold font-heading text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202E43] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="rounded-xl overflow-hidden border border-[#202E43] bg-[#0A101D] shadow-inner flex items-center justify-center">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full max-h-[58vh] object-contain mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Project Overview & Execution
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {project.overview || project.description}
              </p>
              {project.details && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.details}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#152033] border border-[#202E43] space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Services Provided
              </h4>
              <p className="text-xs text-blue-300">
                {project.services || 'Skool setup, classroom organization, custom thumbnails, and onboarding architecture.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Build Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
