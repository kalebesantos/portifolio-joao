
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { VideoProject } from '../types';

interface PortfolioProps {
  projects: VideoProject[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  const displayProjects = projects.length >= 6 ? projects.slice(0, 6) : projects;

  return (
    <section className="py-32 px-6 bg-white" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h2 className="text-brand-blue text-sm font-bold uppercase tracking-[0.4em] mb-4">Destaques</h2>
          <h3 className="text-5xl md:text-6xl font-bold text-brand-dark tracking-tighter">PORTFÓLIO EM VÍDEO</h3>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedVideo(project)}
              className="group relative aspect-video bg-brand-dark overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={project.thumbnail} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                alt={project.title}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                  <Play fill="white" className="text-white ml-1" />
                </div>
                <h4 className="mt-4 text-white font-bold uppercase tracking-widest text-sm px-4 text-center">{project.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-12 py-5 border-2 border-brand-blue text-brand-blue font-bold uppercase tracking-widest text-sm hover:bg-brand-blue hover:text-white transition-all">
            Ver Todos os Projetos
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md" onClick={() => setSelectedVideo(null)}></div>
          <div className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-brand-blue transition-colors flex items-center gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Fechar</span>
              <X size={28} />
            </button>
            <iframe 
              src={selectedVideo.videoUrl.includes('?') ? `${selectedVideo.videoUrl}&autoplay=1` : `${selectedVideo.videoUrl}?autoplay=1`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
