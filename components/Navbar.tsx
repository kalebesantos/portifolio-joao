import React from 'react';

interface NavbarProps {
  lang: 'pt' | 'en';
  toggleLang: () => void;
}

const labels = {
  pt: {
    home: 'Início',
    portfolio: 'Portfólio',
    services: 'Serviços',
    contact: 'Contato',
    lang: 'EN'
  },
  en: {
    home: 'Home',
    portfolio: 'Portfolio',
    services: 'Services',
    contact: 'Contact',
    lang: 'PT'
  }
};

export const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang }) => {
  const text = labels[lang];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-black/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="text-sm md:text-base font-bold uppercase tracking-[0.4em] text-white">
          JOÃO FERRARI
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.3em] text-white/70">
          <a href="#portfolio" className="hover:text-white transition">{text.portfolio}</a>
          <a href="#services" className="hover:text-white transition">{text.services}</a>
          <a href="#contact" className="hover:text-white transition">{text.contact}</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            {text.lang}
          </button>
          <a
            href="https://wa.me/5519988067736"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-blue px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            {text.contact}
          </a>
        </div>
      </div>
    </header>
  );
};
