import React from 'react';
import { VideoProject } from '../types';

interface AdminPanelProps {
  projects: VideoProject[];
  onSave: (projects: VideoProject[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ projects, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-brand-black/95 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-white">Admin Panel</h2>
            <p className="text-sm text-white/60">Gerencie seus projetos e atualize o portfólio diretamente no frontend.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            Fechar
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-white/60 mb-6">Total de projetos: {projects.length}</p>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">{project.section}</p>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-white/60">{project.category}</p>
                  </div>
                  <img src={project.thumbnail} alt={project.title} className="h-16 w-24 rounded-2xl object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-white/10 px-6 py-4">
          <button
            onClick={() => onSave(projects)}
            className="rounded-full bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-black transition hover:bg-white"
          >
            Salvar alterações
          </button>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
