
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  lang: 'pt' | 'en';
  toggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navItems = {
    portfolio: lang === 'pt' ? 'Portfólio' : 'Portfolio',
    contact: lang === 'pt' ? 'Fale Comigo' : 'Contact Me',
  };

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-brand-black/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-bold tracking-[0.3em] cursor-pointer uppercase" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          JOÃO FERRARI
        </div>
        
        <nav className="flex items-center space-x-6 md:space-x-12 text-[10px] font-bold tracking-[0.2em] uppercase">
          <a 
            href="#portfolio" 
            onClick={handlePortfolioClick}
            className="hidden md:block hover:text-brand-blue transition-colors cursor-pointer"
          >
            {navItems.portfolio}
          </a>
          
          {/* Language Toggle Button refined as PT / EN */}
          <button 
            onClick={toggleLang}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-full transition-all duration-300 text-[9px] group ${
              lang === 'en' 
                ? 'border-brand-blue text-brand-blue bg-brand-blue/5' 
                : 'border-white/10 text-white/40 hover:border-white/30'
            }`}
          >
            <span className={`transition-colors duration-300 ${lang === 'pt' ? 'text-white' : 'text-white/20'}`}>PT</span>
            <span className="opacity-20">/</span>
            <span className={`transition-colors duration-300 ${lang === 'en' ? 'text-brand-blue font-black' : 'text-white/20'}`}>EN</span>
          </button>

          <a 
            href="https://wa.me/5519988067736" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
          >
            {navItems.contact}
          </a>
        </nav>
      </div>
    </header>
  );
};
