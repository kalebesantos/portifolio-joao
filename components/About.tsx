
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

export const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-32 px-6 bg-white" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/3">
            <div className="relative group">
              <div className="aspect-square rounded-full overflow-hidden border-8 border-brand-gray-light shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="João Vitor Ferrari" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-blue p-4 rounded-full text-white shadow-xl">
                <Star fill="white" size={24} />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-brand-blue text-sm font-bold uppercase tracking-[0.3em] mb-4">Trajetória Profissional</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">Editor de vídeo com 21 anos, focado em <span className="text-brand-blue">IA e Escala.</span></h3>
            <p className="text-brand-gray-text text-xl mb-8 leading-relaxed">
              Experiência sólida em marketing e liderança de equipes criativas em startups de inteligência artificial. Minha abordagem une técnica cinematográfica com análise de dados para maximizar retenção e conversão.
            </p>
            
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-sm hover:text-brand-blue-dark transition-all"
            >
              {isExpanded ? 'Ver Menos' : 'Saiba Mais'}
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <div className={`mt-8 space-y-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-gray-light">
                <div>
                  <h4 className="font-bold text-brand-dark mb-2 uppercase text-xs tracking-widest">Habilidades</h4>
                  <ul className="text-brand-gray-text text-sm space-y-2">
                    <li>• Liderança de Equipes Criativas</li>
                    <li>• Estratégia de Conteúdo para IA</li>
                    <li>• Edição de Alta Performance</li>
                    <li>• Gestão de Fluxo de Pós-Produção</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-2 uppercase text-xs tracking-widest">Conquistas</h4>
                  <ul className="text-brand-gray-text text-sm space-y-2">
                    <li>• Mentor de Editores em Startups</li>
                    <li>• Desenvolvimento de Workflows Ágeis</li>
                    <li>• Expert em Ferramentas de IA de Vídeo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
