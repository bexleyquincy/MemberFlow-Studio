import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { Project } from '../../data/siteData';
import { ImageInputField } from './ImageInputField';

interface AdminProjectListEditorProps {
  title: string;
  noun: string;
  projects: Project[];
  defaultImageUrl: string;
  defaultCategory: string;
  onUpdate: (projects: Project[]) => void;
}

export const AdminProjectListEditor: React.FC<AdminProjectListEditorProps> = ({
  title,
  noun,
  projects,
  defaultImageUrl,
  defaultCategory,
  onUpdate
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Project | null>(null);
  const [newDraft, setNewDraft] = useState({
    title: '',
    category: defaultCategory,
    description: '',
    imageUrl: defaultImageUrl,
    highlight: 'Featured Project',
    services: '',
    overview: '',
    details: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraft.title.trim()) return;
    const item: Project = {
      id: `${noun.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      title: newDraft.title.trim(),
      category: newDraft.category.trim() || defaultCategory,
      description: newDraft.description.trim(),
      imageUrl: newDraft.imageUrl.trim() || defaultImageUrl,
      highlight: newDraft.highlight.trim(),
      services: newDraft.services.trim() || undefined,
      overview: newDraft.overview.trim() || undefined,
      details: newDraft.details.trim() || undefined
    };
    onUpdate([...projects, item]);
    setNewDraft({
      title: '',
      category: defaultCategory,
      description: '',
      imageUrl: defaultImageUrl,
      highlight: 'Featured Project',
      services: '',
      overview: '',
      details: ''
    });
  };

  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setEditDraft({ ...proj });
  };

  const handleSaveEdit = () => {
    if (!editDraft) return;
    onUpdate(projects.map((p) => (p.id === editDraft.id ? editDraft : p)));
    setEditingId(null);
    setEditDraft(null);
  };

  const handleMove = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    const copy = [...projects];
    const [removed] = copy.splice(index, 1);
    copy.splice(target, 0, removed);
    onUpdate(copy);
  };

  const handleDelete = (id: string) => {
    onUpdate(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white">
          {title} ({projects.length})
        </h4>
      </div>

      {/* Existing items with inline editing and reordering */}
      <div className="space-y-3">
        {projects.map((p, idx) => {
          const isEditing = editingId === p.id && editDraft;
          return (
            <div
              key={p.id}
              className="p-4 bg-[#152033] rounded-xl border border-[#202E43] space-y-3"
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#202E43] pb-2">
                    <span className="text-xs font-bold uppercase text-blue-400">
                      Editing {noun}: {editDraft.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveEdit}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditDraft(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#202E43] hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={editDraft.title}
                        onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={editDraft.category}
                        onChange={(e) => setEditDraft({ ...editDraft, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Highlight Tag</label>
                      <input
                        type="text"
                        value={editDraft.highlight || ''}
                        onChange={(e) => setEditDraft({ ...editDraft, highlight: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Services Provided</label>
                      <input
                        type="text"
                        value={editDraft.services || ''}
                        onChange={(e) => setEditDraft({ ...editDraft, services: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={editDraft.description}
                      onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Lightbox Case Overview (Optional)</label>
                    <textarea
                      rows={2}
                      value={editDraft.overview || ''}
                      onChange={(e) => setEditDraft({ ...editDraft, overview: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0D1525] border border-[#202E43] rounded-lg text-xs text-white"
                    />
                  </div>

                  <ImageInputField
                    label={`${noun} Screenshot / Image`}
                    value={editDraft.imageUrl}
                    onChange={(val) => setEditDraft({ ...editDraft, imageUrl: val })}
                    defaultValue={defaultImageUrl}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== defaultImageUrl) img.src = defaultImageUrl;
                      }}
                      className="w-20 h-13 object-cover rounded-lg border border-[#202E43] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white truncate">{p.title}</div>
                      <div className="text-xs text-blue-400 truncate">
                        {p.category} {p.highlight ? `• ${p.highlight}` : ''}
                      </div>
                      <div className="text-xs text-slate-400 truncate max-w-md">{p.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      title="Move up"
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#202E43] rounded-lg disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === projects.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      title="Move down"
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#202E43] rounded-lg disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(p)}
                      title="Edit project"
                      className="p-1.5 text-blue-400 hover:text-white hover:bg-blue-600/30 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      title="Delete project"
                      className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add new project form */}
      <form
        onSubmit={handleAdd}
        className="p-4 bg-[#0D1525] rounded-xl border border-dashed border-[#2A3B56] space-y-3"
      >
        <h5 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>Add New {noun}</span>
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <input
            type="text"
            placeholder="Project Title"
            value={newDraft.title}
            onChange={(e) => setNewDraft({ ...newDraft, title: e.target.value })}
            className="px-3 py-2 bg-[#152033] border border-[#202E43] rounded-lg text-white"
          />
          <input
            type="text"
            placeholder="Category"
            value={newDraft.category}
            onChange={(e) => setNewDraft({ ...newDraft, category: e.target.value })}
            className="px-3 py-2 bg-[#152033] border border-[#202E43] rounded-lg text-white"
          />
          <input
            type="text"
            placeholder="Highlight Badge"
            value={newDraft.highlight}
            onChange={(e) => setNewDraft({ ...newDraft, highlight: e.target.value })}
            className="px-3 py-2 bg-[#152033] border border-[#202E43] rounded-lg text-white"
          />
        </div>
        <textarea
          rows={2}
          placeholder={`Short description of the ${noun.toLowerCase()}...`}
          value={newDraft.description}
          onChange={(e) => setNewDraft({ ...newDraft, description: e.target.value })}
          className="w-full px-3 py-2 bg-[#152033] border border-[#202E43] rounded-lg text-xs text-white"
        />
        <ImageInputField
          label={`New ${noun} Image`}
          value={newDraft.imageUrl}
          onChange={(val) => setNewDraft({ ...newDraft, imageUrl: val })}
          defaultValue={defaultImageUrl}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add {noun} to Portfolio</span>
        </button>
      </form>
    </div>
  );
};
