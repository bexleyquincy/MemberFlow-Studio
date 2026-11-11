import React, { useState } from 'react';
import { X, Shield, Plus, Trash2, Edit3, Save, Check, RefreshCw, Key } from 'lucide-react';
import { SiteConfig, Project, ServiceItem, Testimonial } from '../data/siteData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (newConfig: SiteConfig) => void;
  classroomProjects: Project[];
  onUpdateClassrooms: (projects: Project[]) => void;
  landingProjects: Project[];
  onUpdateLandings: (projects: Project[]) => void;
  testimonials: Testimonial[];
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  onResetToDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  siteConfig,
  onUpdateSiteConfig,
  classroomProjects,
  onUpdateClassrooms,
  landingProjects,
  onUpdateLandings,
  testimonials,
  onUpdateTestimonials,
  onResetToDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'classrooms' | 'landing' | 'testimonials'>('general');
  const [configDraft, setConfigDraft] = useState<SiteConfig>(siteConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New item drafting states
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Skool Classroom Design',
    description: '',
    imageUrl: '',
    highlight: 'New Project'
  });

  if (!isOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(configDraft);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddClassroom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    const project: Project = {
      id: `classroom-${Date.now()}`,
      title: newProject.title,
      category: newProject.category,
      description: newProject.description,
      imageUrl: newProject.imageUrl || 'https://img.sanishtech.com/u/b23962d874c57145a61ed60d99809bf2.png',
      highlight: newProject.highlight
    };
    onUpdateClassrooms([...classroomProjects, project]);
    setNewProject({
      title: '',
      category: 'Skool Classroom Design',
      description: '',
      imageUrl: '',
      highlight: 'New Project'
    });
  };

  const handleAddLanding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    const project: Project = {
      id: `landing-${Date.now()}`,
      title: newProject.title,
      category: newProject.category,
      description: newProject.description,
      imageUrl: newProject.imageUrl || 'https://img.sanishtech.com/u/f37e41f7ca3c29592e3dde20e6a5e849.png',
      highlight: newProject.highlight
    };
    onUpdateLandings([...landingProjects, project]);
    setNewProject({
      title: '',
      category: 'Community Landing Page',
      description: '',
      imageUrl: '',
      highlight: 'New Project'
    });
  };

  const handleDeleteClassroom = (id: string) => {
    onUpdateClassrooms(classroomProjects.filter(p => p.id !== id));
  };

  const handleDeleteLanding = (id: string) => {
    onUpdateLandings(landingProjects.filter(p => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#10192B] border border-[#202E43] rounded-2xl shadow-2xl flex flex-col text-slate-100 overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#202E43] flex items-center justify-between bg-[#152033]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
                <span>MemberFlow Studio — Admin Control</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Live Editor
                </span>
              </h2>
              <p className="text-xs text-[#AAB7CC]">
                Modify founder credentials, image URLs, portfolio items, and contact endpoints in real time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#202E43] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#202E43] px-6 bg-[#0E1626] text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'general'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            General & Founder Info
          </button>
          <button
            onClick={() => setActiveTab('classrooms')}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'classrooms'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Classroom Portfolio ({classroomProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('landing')}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'landing'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Landing Pages Portfolio ({landingProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'testimonials'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Testimonials ({testimonials.length})
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'general' && (
            <form onSubmit={handleSaveConfig} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    value={configDraft.founderName}
                    onChange={(e) => setConfigDraft({ ...configDraft, founderName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={configDraft.contactEmail}
                    onChange={(e) => setConfigDraft({ ...configDraft, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={configDraft.tagline}
                    onChange={(e) => setConfigDraft({ ...configDraft, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Founder Role / Specialty
                  </label>
                  <input
                    type="text"
                    value={configDraft.founderTitle}
                    onChange={(e) => setConfigDraft({ ...configDraft, founderTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Founder Hero Portrait URL
                </label>
                <input
                  type="text"
                  value={configDraft.founderHeroImage}
                  onChange={(e) => setConfigDraft({ ...configDraft, founderHeroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Founder Story Image URL
                </label>
                <input
                  type="text"
                  value={configDraft.founderStoryImage}
                  onChange={(e) => setConfigDraft({ ...configDraft, founderStoryImage: e.target.value })}
                  className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Founder Story Narrative
                </label>
                <textarea
                  rows={4}
                  value={configDraft.founderStory}
                  onChange={(e) => setConfigDraft({ ...configDraft, founderStory: e.target.value })}
                  className="w-full px-3 py-2 bg-[#202E43]/60 border border-[#202E43] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Members Metric</label>
                  <input
                    type="text"
                    value={configDraft.metrics.membersSupported}
                    onChange={(e) => setConfigDraft({ ...configDraft, metrics: { ...configDraft.metrics, membersSupported: e.target.value } })}
                    className="w-full px-2 py-1.5 bg-[#202E43]/60 border border-[#202E43] rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Satisfaction Metric</label>
                  <input
                    type="text"
                    value={configDraft.metrics.clientSatisfaction}
                    onChange={(e) => setConfigDraft({ ...configDraft, metrics: { ...configDraft.metrics, clientSatisfaction: e.target.value } })}
                    className="w-full px-2 py-1.5 bg-[#202E43]/60 border border-[#202E43] rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Growth Metric</label>
                  <input
                    type="text"
                    value={configDraft.metrics.growthStrategies}
                    onChange={(e) => setConfigDraft({ ...configDraft, metrics: { ...configDraft.metrics, growthStrategies: e.target.value } })}
                    className="w-full px-2 py-1.5 bg-[#202E43]/60 border border-[#202E43] rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Major Projects</label>
                  <input
                    type="text"
                    value={configDraft.metrics.majorProjects}
                    onChange={(e) => setConfigDraft({ ...configDraft, metrics: { ...configDraft.metrics, majorProjects: e.target.value } })}
                    className="w-full px-2 py-1.5 bg-[#202E43]/60 border border-[#202E43] rounded text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#202E43]">
                <button
                  type="button"
                  onClick={onResetToDefaults}
                  className="px-4 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>

                <div className="flex items-center gap-3">
                  {saveSuccess && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/30 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Site Configuration</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'classrooms' && (
            <div className="space-y-6">
              {/* Form to add classroom */}
              <div className="p-4 bg-[#152033] rounded-xl border border-[#202E43] space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span>Add New Classroom Project</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Project Title (e.g. DY Salsa Dance Academy)"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Skool Classroom Design)"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (Leave empty for default)"
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Highlight Badge (e.g. Engaging & Organized)"
                    value={newProject.highlight}
                    onChange={(e) => setNewProject({ ...newProject, highlight: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Short description of the classroom setup..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-xs text-white"
                />
                <button
                  onClick={handleAddClassroom}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project to Gallery</span>
                </button>
              </div>

              {/* Project list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Classroom Projects ({classroomProjects.length})
                </h4>
                {classroomProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-[#152033] rounded-lg border border-[#202E43] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-16 h-11 object-cover rounded border border-[#202E43] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">{p.title}</div>
                        <div className="text-xs text-blue-400">{p.category}</div>
                        <div className="text-xs text-slate-400 truncate max-w-md">{p.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteClassroom(p.id)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg shrink-0 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'landing' && (
            <div className="space-y-6">
              {/* Form to add landing page */}
              <div className="p-4 bg-[#152033] rounded-xl border border-[#202E43] space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span>Add New Landing Page Project</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Project Title (e.g. Evergreen Real Estate)"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Real Estate Community)"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Highlight Badge (e.g. High-Converting Page)"
                    value={newProject.highlight}
                    onChange={(e) => setNewProject({ ...newProject, highlight: e.target.value })}
                    className="px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Short description of the landing page..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#202E43] border border-[#202E43] rounded text-xs text-white"
                />
                <button
                  onClick={handleAddLanding}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Landing Page to Gallery</span>
                </button>
              </div>

              {/* Landing list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Landing Page Projects ({landingProjects.length})
                </h4>
                {landingProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-[#152033] rounded-lg border border-[#202E43] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-16 h-11 object-cover rounded border border-[#202E43] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">{p.title}</div>
                        <div className="text-xs text-blue-400">{p.category}</div>
                        <div className="text-xs text-slate-400 truncate max-w-md">{p.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteLanding(p.id)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg shrink-0 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Manage verified reviews or edit placeholder customer experiences.
              </p>
              {testimonials.map((t, idx) => (
                <div key={t.id} className="p-4 bg-[#152033] rounded-xl border border-[#202E43] space-y-2">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].name = e.target.value;
                        onUpdateTestimonials(copy);
                      }}
                      className="px-3 py-1.5 bg-[#202E43] border border-[#202E43] rounded text-white"
                      placeholder="Client Name"
                    />
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].role = e.target.value;
                        onUpdateTestimonials(copy);
                      }}
                      className="px-3 py-1.5 bg-[#202E43] border border-[#202E43] rounded text-white"
                      placeholder="Role / Community"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={t.quote}
                    onChange={(e) => {
                      const copy = [...testimonials];
                      copy[idx].quote = e.target.value;
                      onUpdateTestimonials(copy);
                    }}
                    className="w-full px-3 py-1.5 bg-[#202E43] border border-[#202E43] rounded text-xs text-white"
                    placeholder="Quote"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
