
import React from 'react';
import { Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <div className="text-2xl font-black tracking-tighter mb-4">JOÃO VITOR FERRARI</div>
            <p className="text-brand-gray-text max-w-sm text-sm">
              Estrategista de vídeo focado em performance, IA e resultados reais para o mercado global.
            </p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Instagram size={18} /> Instagram</a>
            <a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Linkedin size={18} /> LinkedIn</a>
            <a href="mailto:contato@ferrarivideo.com" className="hover:text-brand-blue transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Mail size={18} /> E-mail</a>
          </div>

          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="p-4 border border-white/10 rounded-full hover:border-brand-blue hover:text-brand-blue transition-all"
          >
            <ArrowUp size={24} />
          </button>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 text-[10px] text-brand-gray-text uppercase tracking-widest flex flex-col md:flex-row justify-between gap-4">
          <span>© 2024 João Vitor Ferrari. Todos os direitos reservados.</span>
          <span>Focado em Performance & IA</span>
        </div>
      </div>
    </footer>
  );
};
