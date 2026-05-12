
import React, { useState, useEffect } from 'react';
import { VideoProject } from '../types';
import { Plus, Trash2, Save, X, Edit2, Wand2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

interface AdminPanelProps {
  projects: VideoProject[];
  onSave: (projects: VideoProject[]) => void;
  onClose: () => void;
}

type AdminFormData = Omit<VideoProject, 'id'> & { videoUrl: string };

export const AdminPanel: React.FC<AdminPanelProps> = ({ projects, onSave, onClose }) => {
  const [localProjects, setLocalProjects] = useState<VideoProject[]>(projects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AdminFormData>({
    title: '',
    category: '',
    thumbnail: '',
    videoUrl: '',
    section: 'reels',
    isPhoto: false
  });

  const getSuggestedThumbnail = (url: string, timeInSeconds: number = 0) => {
    if (!url) return '';

    // YouTube - use different frame numbers for different times
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      const id = (match && match[7].length === 11) ? match[7] : null;
      if (id) {
        // YouTube provides frames 0, 1, 2, 3 at different times
        const frameNumber = Math.min(Math.floor(timeInSeconds / 30), 3); // Change frame every 30 seconds, max frame 3
        return `https://img.youtube.com/vi/${id}/${frameNumber}.jpg`;
      }
    }

    // Vimeo - use vumbnail.com with time parameter
    if (url.includes('vimeo.com')) {
      const parts = url.split('/');
      const id = parts[parts.length - 1]?.split('?')[0];
      if (id) {
        // vumbnail.com supports time parameter
        return `https://vumbnail.com/${id}.jpg${timeInSeconds > 0 ? `?time=${timeInSeconds}` : ''}`;
      }
    }

    return '';
  };

  const autoExtractFrame = (url: string) => {
    const thumbnailUrl = getSuggestedThumbnail(url);
    if (thumbnailUrl) {
      setFormData(prev => ({ ...prev, thumbnail: thumbnailUrl }));
    }
  };

  const suggestedThumbnail = getSuggestedThumbnail(formData.videoUrl || '');

  const handleThumbnailDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleThumbnailDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const url = event.dataTransfer.getData('text/plain');
    if (url) {
      setFormData(prev => ({ ...prev, thumbnail: url }));
    }
  };

  useEffect(() => {
    if (formData.videoUrl && !formData.thumbnail) {
      autoExtractFrame(formData.videoUrl);
    }
  }, [formData.videoUrl]);

  const handleAddOrUpdate = () => {
    // Limpeza de URL para embed se necessário
    let finalUrl = formData.videoUrl;
    if (finalUrl && finalUrl.includes('vimeo.com') && !finalUrl.includes('player.vimeo.com')) {
        const id = finalUrl.split('/').pop()?.split('?')[0];
        finalUrl = `https://player.vimeo.com/video/${id}`;
    }

    if (editingId) {
      setLocalProjects(prev => prev.map(p => p.id === editingId ? { ...formData, videoUrl: finalUrl, id: editingId } : p));
      setEditingId(null);
    } else {
      const newProject: VideoProject = {
        ...formData,
        videoUrl: finalUrl,
        id: Date.now().toString(),
      };
      setLocalProjects(prev => [...prev, newProject]);
    }
    setFormData({ title: '', category: '', thumbnail: '', videoUrl: '', section: 'reels', isPhoto: false });
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este vídeo?')) {
      setLocalProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleDragStart = (id: string) => (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    setDraggingId(id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (targetId: string) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!draggingId || draggingId === targetId) return;

    setLocalProjects(prev => {
      const newProjects = [...prev];
      const fromIndex = newProjects.findIndex(p => p.id === draggingId);
      const toIndex = newProjects.findIndex(p => p.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [moved] = newProjects.splice(fromIndex, 1);
      newProjects.splice(toIndex, 0, moved);
      return newProjects;
    });
    setDraggingId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      setLocalProjects(prev => {
        const newProjects = [...prev];
        [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
        return newProjects;
      });
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < localProjects.length - 1) {
      setLocalProjects(prev => {
        const newProjects = [...prev];
        [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
        return newProjects;
      });
    }
  };

  const startEdit = (project: VideoProject) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      thumbnail: project.thumbnail,
      videoUrl: project.videoUrl || '',
      section: project.section,
      isPhoto: project.isPhoto || false
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .thumbnail-slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #007BFF;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.3);
          }
          .thumbnail-slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #007BFF;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.3);
          }
          .thumbnail-slider::-webkit-slider-track {
            background: rgba(255,255,255,0.2);
            height: 4px;
            border-radius: 2px;
          }
          .thumbnail-slider::-moz-range-track {
            background: rgba(255,255,255,0.2);
            height: 4px;
            border-radius: 2px;
          }
        `
      }} />
      <div className="fixed inset-0 z-[200] bg-brand-black flex flex-col overflow-hidden font-body">
      <header className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-dark-gray">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Painel Admin</h2>
          <span className="text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded">Use links do Vimeo ou YouTube para upload e ordem do portfólio</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onSave(localProjects)}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 font-bold uppercase text-xs tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
          >
            <Save size={16} /> Salvar Portfólio
          </button>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto p-6 md:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-dark-gray p-8 border border-white/5 rounded-sm relative overflow-hidden">
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-white/10 pb-2 flex items-center gap-2">
                {editingId ? <Edit2 size={14}/> : <Plus size={14}/>}
                {editingId ? 'Editar Projeto' : 'Novo Projeto'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/40 block mb-1">Link do Vimeo / YouTube{formData.isPhoto && ' - deixe vazio para foto'}</label>
                  <div className="flex flex-col gap-3">
                    <input 
                      value={formData.videoUrl}
                      onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                      onBlur={() => formData.videoUrl && autoExtractFrame(formData.videoUrl)}
                      className="w-full bg-brand-black border border-white/10 p-3 text-sm focus:border-white/30 outline-none text-white transition-all" 
                      placeholder={formData.isPhoto ? "Deixe vazio para foto estática" : "Cole o link do Vimeo ou YouTube aqui..."}
                    />
                    {!formData.isPhoto && formData.videoUrl && (
                      <button
                        type="button"
                        onClick={() => autoExtractFrame(formData.videoUrl)}
                        className="self-start bg-brand-blue text-white px-4 py-2 text-xs uppercase tracking-[0.3em] rounded hover:bg-brand-blue/80 transition-all"
                      >
                        Atualizar Thumbnail Sugerida
                      </button>
                    )}
                  </div>
                  {!formData.isPhoto && (
                    <p className="text-[10px] text-white/40 mt-2">Cole o link do vídeo do Vimeo e ele será convertido para embed automaticamente.</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-white/40 block mb-1">Título do Projeto</label>
                  <input 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-brand-black border border-white/10 p-3 text-sm focus:border-white/30 outline-none text-white" 
                    placeholder="Ex: Campanha 2024"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/40 block mb-1">Categoria</label>
                    <input 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-brand-black border border-white/10 p-3 text-sm focus:border-white/30 outline-none text-white" 
                      placeholder="Ex: Edição"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/40 block mb-1">Seção</label>
                    <select 
                      value={formData.section}
                      onChange={e => setFormData({...formData, section: e.target.value as any})}
                      className="w-full bg-brand-black border border-white/10 p-3 text-sm focus:border-white/30 outline-none text-white appearance-none cursor-pointer"
                    >
                      <option value="reels">Reels</option>
                      <option value="video">Vídeos</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    id="isPhoto"
                    checked={formData.isPhoto}
                    onChange={e => setFormData({...formData, isPhoto: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isPhoto" className="text-[10px] uppercase font-bold text-white/40">É uma foto (sem vídeo)</label>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-white/40 block mb-2">Miniatura (Escolha um Frame do Vídeo)</label>
                  
                  {/* Suggested Thumbnail System */}
                  {formData.videoUrl && !formData.isPhoto && (
                    <div className="mb-4">
                      <div className="bg-white/5 border border-white/10 rounded-sm p-4 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">Thumbnail sugerida</p>
                          <button
                            type="button"
                            onClick={() => autoExtractFrame(formData.videoUrl)}
                            className="text-[10px] uppercase tracking-[0.3em] text-brand-blue hover:text-white transition-colors"
                          >
                            Atualizar sugestão
                          </button>
                        </div>

                        <div className="aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-black">
                          {suggestedThumbnail ? (
                            <img
                              src={suggestedThumbnail}
                              alt="Thumbnail sugerida"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200';
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-white/50 text-xs uppercase tracking-[0.3em]">
                              Nenhuma miniatura sugerida disponível
                            </div>
                          )}
                        </div>

                        {suggestedThumbnail && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, thumbnail: suggestedThumbnail }))}
                            className="w-full bg-brand-blue text-white py-3 uppercase tracking-[0.3em] rounded-sm hover:bg-brand-blue/80 transition-all"
                          >
                            Usar thumbnail sugerida
                          </button>
                        )}

                        <p className="text-[10px] text-white/40">A miniatura é sugerida automaticamente com base no vídeo. Cole outra imagem se quiser substituir.</p>
                      </div>
                    </div>
                  )}

                  {/* Thumbnail Input and Preview */}
                  <div className="relative group" onDragOver={handleThumbnailDragOver} onDrop={handleThumbnailDrop}>
                    <input
                      value={formData.thumbnail}
                      onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                      className="w-full bg-brand-black border border-white/10 p-3 text-sm focus:border-white/30 outline-none text-white mb-2"
                      placeholder="URL da imagem ou será gerada automaticamente..."
                    />
                    {formData.thumbnail && (
                      <div className="aspect-video w-full rounded-sm border-2 border-brand-lime overflow-hidden bg-black mb-4 shadow-[0_0_15px_rgba(191,255,0,0.3)]">
                        <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    {/* Fallback suggested thumbnail */}
                    {!formData.thumbnail && suggestedThumbnail && !formData.isPhoto && (
                      <div className="rounded-sm border border-dashed border-white/20 p-3 bg-white/5 text-white/80">
                        <p className="text-[10px] uppercase tracking-[0.4em] mb-2 text-white/50">Frame sugerido</p>
                        <img
                          src={suggestedThumbnail}
                          alt="Frame sugerido"
                          className="w-full h-28 object-cover rounded-sm cursor-pointer border border-white/10 hover:border-brand-blue transition-colors"
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail: suggestedThumbnail }))}
                        />
                        <p className="text-[10px] text-white/40 mt-2">Clique para usar ou selecione acima.</p>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={handleAddOrUpdate}
                  className="w-full bg-white text-black py-4 font-bold uppercase text-xs tracking-widest hover:bg-brand-blue hover:text-white transition-all mt-4"
                >
                  {editingId ? 'Atualizar Projeto' : 'Publicar no Site'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-white/10 pb-2">Seu Portfólio ({localProjects.length})</h3>
              <p className="text-[10px] text-white/40">Arraste para mudar a ordem ou use as setas. Os Reels e Vídeos agora estão separados para facilitar a visualização.</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {['reels', 'video'].map(sectionKey => {
                const sectionItems = localProjects.filter(project => project.section === sectionKey);
                if (sectionItems.length === 0) return null;

                return (
                  <div key={sectionKey} className="space-y-4">
                    <div className="flex items-center justify-between gap-4 rounded border border-white/10 bg-brand-dark-gray p-4">
                      <div>
                        <h4 className="text-sm uppercase tracking-[0.35em] text-white/70">{sectionKey === 'reels' ? 'Reels' : 'Vídeos'}</h4>
                        <p className="text-[10px] text-white/40">{sectionItems.length} projeto{sectionItems.length > 1 ? 's' : ''}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.35em] text-brand-lime">Arraste para reordenar</span>
                    </div>
                    <div className="space-y-3">
                      {sectionItems.map((project, index) => {
                        const globalIndex = localProjects.findIndex(p => p.id === project.id);
                        return (
                          <div
                            key={project.id}
                            draggable
                            onDragStart={handleDragStart(project.id)}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop(project.id)}
                            onDragEnd={handleDragEnd}
                            className={`bg-brand-dark-gray border border-white/5 p-4 flex gap-4 items-center group hover:border-white/20 transition-all ${draggingId === project.id ? 'opacity-60 border-dashed border-brand-blue/70' : ''}`}
                          >
                            <div className="w-10 flex flex-col items-center justify-center text-white/40">
                              <GripVertical size={18} className="cursor-grab" />
                            </div>
                            <div className="w-28 aspect-video bg-black flex-shrink-0 relative overflow-hidden rounded-sm">
                              <img src={project.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-brand-lime text-xs font-bold">#{globalIndex + 1}</span>
                                <h4 className="text-white font-bold text-sm truncate uppercase tracking-tighter">{project.title}</h4>
                              </div>
                              <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">{project.category}</p>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                              <button title="Mover para cima" onClick={() => handleMoveUp(globalIndex)} className="p-2 text-white/30 hover:text-white transition-colors" disabled={globalIndex === 0}>
                                <ArrowUp size={14} />
                              </button>
                              <button title="Mover para baixo" onClick={() => handleMoveDown(globalIndex)} className="p-2 text-white/30 hover:text-white transition-colors" disabled={globalIndex === localProjects.length - 1}>
                                <ArrowDown size={14} />
                              </button>
                              <button title="Editar" onClick={() => startEdit(project)} className="p-2 text-white/30 hover:text-white transition-colors">
                                <Edit2 size={14} />
                              </button>
                              <button title="Excluir" onClick={() => handleDelete(project.id)} className="p-2 text-white/30 hover:text-red-500 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  );
};
