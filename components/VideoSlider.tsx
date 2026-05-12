
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoSliderProps {
  title: string;
  projects: VideoProject[];
}

export const VideoSlider: React.FC<VideoSliderProps> = ({ title, projects }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handlePlay = (id: string) => {
    setActiveVideoId(id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVideoId(null);
  };

  return (
    <div className="mb-24 last:mb-0 group/slider">
      <div className="flex justify-between items-end mb-10 px-2">
        <div>
          <span className="text-brand-lime text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block italic">Curadoria</span>
          <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight uppercase border-l-4 border-brand-lime pl-4">
            {title}
          </h3>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="p-4 rounded-full border border-white/10 bg-brand-dark-gray/50 backdrop-blur-sm hover:border-brand-lime hover:text-brand-lime transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 rounded-full border border-white/10 bg-brand-dark-gray/50 backdrop-blur-sm hover:border-brand-lime hover:text-brand-lime transition-all active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar pb-10 px-2 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => activeVideoId !== project.id && handlePlay(project.id)}
            className={`flex-none w-[90vw] md:w-[600px] lg:w-[750px] aspect-video relative bg-black rounded-sm overflow-hidden group/item snap-center shadow-2xl transition-all duration-500 ${activeVideoId === project.id ? 'z-50 scale-[1.02]' : 'hover:scale-[1.01]'}`}
          >
            {activeVideoId === project.id ? (
              <div className="w-full h-full relative bg-black animate-in fade-in duration-700">
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-brand-lime hover:text-black text-white rounded-full transition-all"
                >
                  <X size={20} />
                </button>
                <iframe 
                  src={project.videoUrl.includes('?') ? `${project.videoUrl}&autoplay=1` : `${project.videoUrl}?autoplay=1`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <>
                {/* Frame Layer */}
                <div className="absolute inset-0 z-0 bg-brand-dark-gray">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-70 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-[2s] ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/20 to-transparent opacity-90"></div>
                </div>
                
                {/* Overlay Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 cursor-pointer">
                  <div className="flex items-center gap-5 translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500">
                     <div className="w-16 h-16 rounded-full bg-brand-lime flex items-center justify-center shadow-[0_0_30px_rgba(191,255,0,0.4)] group-hover/item:scale-110 transition-all duration-500">
                        <Play className="text-black fill-black ml-1" size={28} />
                     </div>
                     <div>
                        <span className="text-brand-lime text-[11px] font-bold tracking-[0.3em] uppercase block mb-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-700">
                          {project.category}
                        </span>
                        <h4 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tighter text-white leading-none">
                          {project.title}
                        </h4>
                     </div>
                  </div>
                </div>

                {/* Aesthetic Border Effect */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover/item:border-brand-lime/20 transition-colors duration-500"></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
