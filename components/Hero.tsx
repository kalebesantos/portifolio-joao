
import React from 'react';
import { WebGLShader } from './ui/WebGLShader';
import { LiquidButton } from './ui/LiquidButton';
import { ChevronRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';

interface HeroProps {
  lang: 'pt' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://www.instagram.com/jvf_editor/?utm_source=ig_web_button_share_sheet', label: 'Instagram' },
    { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/jo%C3%A3o-ferrari-ba716021b/', label: 'LinkedIn' },
    { icon: <MessageCircle size={18} />, url: 'https://wa.me/5519988067736', label: 'WhatsApp' },
  ];

  const t = {
    role: lang === 'pt' ? 'Editor de Vídeo' : 'Video Editor',
    desc: lang === 'pt' 
      ? 'Ajudo criadores e marcas a aumentarem seus resultados através da pós-produção.'
      : 'I help creators and brands increase their results through post-production.',
    available: lang === 'pt' ? 'Disponível para novos projetos' : 'Available for new projects',
    contact: lang === 'pt' ? 'Fale Comigo' : 'Contact Me',
    viewPortfolio: lang === 'pt' ? 'Ver Portfólio' : 'View Portfolio',
  };

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      const navHeight = 80;
      const elementPosition = portfolioSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex w-full flex-col items-center justify-center overflow-hidden bg-brand-black z-20 pt-16">
      <WebGLShader />
      
      <div className="relative z-10 border border-[#27272a] p-2 w-full mx-auto max-w-4xl animate-fade-in shadow-2xl">
        <main className="relative border border-[#27272a] py-12 px-6 md:py-20 overflow-hidden text-center bg-black/60 backdrop-blur-sm">
          <h1 className="mb-2 text-white text-center text-4xl xs:text-5xl font-extrabold tracking-tighter md:text-[clamp(2.5rem,8vw,5rem)] leading-none uppercase italic">
            João Ferrari
          </h1>
          
          <h2 className="mb-6 text-white/60 text-center text-lg md:text-xl font-bold tracking-tight uppercase">
            {t.role}
          </h2>

          <p className="text-white/60 px-4 sm:px-6 text-center text-sm xs:text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.desc}
          </p>

          <div className="my-6 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative flex h-2 w-2 rounded-full bg-brand-blue"></span>
            </span>
            <p className="text-[10px] text-brand-blue font-bold uppercase tracking-widest">{t.available}</p>
          </div>
          
          <div className="flex flex-col xs:flex-row items-center justify-center gap-4 sm:gap-6 mt-8"> 
            <a href="https://wa.me/5519988067736" target="_blank" rel="noopener noreferrer">
              <LiquidButton className="text-white border border-[#27272a] rounded-full" size="lg">
                {t.contact}
              </LiquidButton> 
            </a>
            <a 
              href="#portfolio" 
              onClick={handlePortfolioClick}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              {t.viewPortfolio} <ChevronRight size={14} />
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            {socialLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-brand-blue transition-all duration-300 transform hover:scale-110"
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </main>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
