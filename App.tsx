
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoProject } from './types';
import { AdminPanel } from './components/AdminPanel';
import { GridBackground } from './components/ui/GridBackground';
import { Settings, Eye, DollarSign, Clapperboard, Play, X, Instagram, Linkedin, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ADMIN_PATH = '/admin';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'senha123';

const INITIAL_PROJECTS: VideoProject[] = [
  { 
    id: 'v1', 
    title: 'Projeto Vertical 1', 
    category: 'Reels / TikTok', 
    thumbnail: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/thumb%20(3).jpg?raw=true', 
    videoUrl: 'https://player.vimeo.com/video/1157987222', 
    section: 'reels'
  },
  { 
    id: 'v2', 
    title: 'Projeto Vertical 2', 
    category: 'Reels / TikTok', 
    thumbnail: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/thumb%20(1).jpg?raw=true', 
    videoUrl: 'https://player.vimeo.com/video/1157987248', 
    section: 'reels'
  },
  { 
    id: 'v3', 
    title: 'Projeto Vertical 3', 
    category: 'Reels / TikTok', 
    thumbnail: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/thumb.jpg?raw=true', 
    videoUrl: 'https://player.vimeo.com/video/1157987281', 
    section: 'reels'
  },
  { 
    id: 'v4', 
    title: 'Projeto Horizontal 1', 
    category: 'Comercial / YouTube', 
    thumbnail: 'https://vumbnail.com/1157987304.jpg', 
    videoUrl: 'https://player.vimeo.com/video/1157987304', 
    section: 'video'
  },
  { 
    id: 'v5', 
    title: 'Projeto Horizontal 2', 
    category: 'Comercial / YouTube', 
    thumbnail: 'https://vumbnail.com/1148507945.jpg', 
    videoUrl: 'https://player.vumbnail.com/video/1148507945', 
    section: 'video'
  },
  { 
    id: 'v6', 
    title: 'Projeto Horizontal 3', 
    category: 'Comercial / YouTube', 
    thumbnail: 'https://img.youtube.com/vi/YOuwM8aGApw/maxresdefault.jpg', 
    videoUrl: 'https://www.youtube.com/embed/YOuwM8aGApw?si=sC30TTxlJHGROg9r', 
    section: 'video'
  }
];

const WORKED_NAMES = [
  { title: 'Renato Cariani', category: 'Alta Performance', followers: '10,7M Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/renato%20cariani.jpg?raw=true', isIG: true },
  { title: 'Danilo Gentili', category: 'Talk Show', followers: '11,5M Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/danilo.webp?raw=true', isIG: true },
  { title: 'Carioca', category: 'Humorista', followers: '4,3M Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/carioca.jpg?raw=true', isIG: true },
  { title: 'Duda Nagle', category: 'Criador', followers: '4,7M Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/duda%20nagle.jpg?raw=true', isIG: true },
  { title: 'Daniel Zuckerman', category: 'Entretenimento', followers: '1,4M Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/Daniel%20zuckerman.jpg?raw=true', isIG: true },
  { title: 'Rogério Vilela', category: 'Inteligência Ltda', followers: '934K Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/Vilela.jpg?raw=true', isIG: true },
  { title: 'Hannah Franklin', category: 'Criadora', followers: '763K Seguidores', thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', isIG: true },
  { title: 'Carlos Tramontina', category: 'Jornalismo', followers: '230K Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/carlos%20tramontina.jpg?raw=true', isIG: true },
  { title: 'Max Peters', category: 'Adapta.org', followers: 'CEO Adapta.org', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/Max%20peters.jpg?raw=true', isIG: false },
  { title: 'Nathan Labens', category: 'OpenAI', followers: 'Red Team OpenAI', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/nataa.jpg?raw=true', isIG: false },
  { title: 'Jason Fladlien', category: 'Estrategista', followers: '41K Seguidores', thumb: 'https://github.com/JoaoFerrari56/fotos-famosos/blob/main/jason.jpeg?raw=true', isIG: true }
];

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  }
};

// Ícone do Instagram com Gradiente Colorido Real
const InstagramColorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f09433' }} />
        <stop offset="25%" style={{ stopColor: '#e6683c' }} />
        <stop offset="50%" style={{ stopColor: '#dc2743' }} />
        <stop offset="75%" style={{ stopColor: '#cc2366' }} />
        <stop offset="100%" style={{ stopColor: '#bc1888' }} />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#ig-gradient)" />
  </svg>
);

const normalizeProjects = (projects: VideoProject[]): VideoProject[] => {
  return projects.map((project, index) => ({
    ...project,
    orderPt: project.orderPt ?? index,
    orderEn: project.orderEn ?? index,
  }));
};

const PortfolioSlider = ({ title, projects, isVertical, onSelect, showAll = true }: { title: string, projects: VideoProject[], isVertical: boolean, onSelect: (v: VideoProject) => void, showAll?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = window.innerWidth > 768 ? clientWidth : clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (projects.length === 0) return null;

  // Para reels, mostrar apenas 3 primeiros se showAll for false
  const displayProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20"
    >
      <div className="flex justify-between items-end mb-8 px-2">
        <h4 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight uppercase italic border-l-4 border-brand-blue pl-4">
          {title}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 sm:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-brand-blue hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 sm:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-brand-blue hover:text-white transition-all active:scale-90"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-x-auto hide-scrollbar pb-6 px-2 snap-x snap-mandatory"
      >
        {displayProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelect(project)}
            className={`flex-none snap-start group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-black shadow-2xl transition-all duration-300 hover:border-brand-blue/40 ${
              isVertical
                ? 'w-[160px] xs:w-[180px] sm:w-[200px] md:w-[240px] lg:w-[calc(28%-1rem)] aspect-[9/16]'
                : 'w-[180px] xs:w-[200px] sm:w-[240px] md:w-[260px] lg:w-[calc(30%-1rem)] aspect-video'
            }`}
          >
            <img
              src={project.thumbnail}
              className={`w-full h-full object-cover opacity-100 transition-all duration-500 group-hover:scale-110`}
              alt={project.title}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 shadow-xl">
                {project.isPhoto ? (
                  <span className="text-lg sm:text-xl md:text-2xl font-bold">+</span>
                ) : (
                  <Play fill="black" size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 ml-0.5" />
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-brand-blue uppercase tracking-widest">{project.category}</p>
              <h5 className="text-[10px] sm:text-xs md:text-sm font-bold truncate">{project.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminLoginUsername, setAdminLoginUsername] = useState('');
  const [adminLoginPassword, setAdminLoginPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    const savedProjects = localStorage.getItem('ferrari_portfolio_v2');
    setProjects(savedProjects ? normalizeProjects(JSON.parse(savedProjects)) : normalizeProjects(INITIAL_PROJECTS));
    
    const savedLang = localStorage.getItem('ferrari_lang');
    if (savedLang === 'en' || savedLang === 'pt') {
      setLang(savedLang);
    }

    const savedAdminAuth = localStorage.getItem('ferrari_admin_authenticated') === 'true';
    setAdminAuthenticated(savedAdminAuth);

    const normalizedPath = window.location.pathname.replace(/\/+$/, '');
    const normalizedAdminPath = ADMIN_PATH.replace(/\/+$/, '');
    const isAdminPath = normalizedPath === normalizedAdminPath;

    if (isAdminPath) {
      setIsAdminOpen(true);
    }
  }, []);

  const handleAdminLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (adminLoginUsername === ADMIN_USERNAME && adminLoginPassword === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      localStorage.setItem('ferrari_admin_authenticated', 'true');
      setAdminLoginError('');
      setIsAdminOpen(true);
      if (window.location.pathname.replace(/\/+$/, '') !== ADMIN_PATH.replace(/\/+$/, '')) {
        window.history.replaceState(null, '', ADMIN_PATH);
      }
      return;
    }
    setAdminLoginError('Usuário ou senha inválidos.');
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    localStorage.removeItem('ferrari_admin_authenticated');
    setAdminLoginUsername('');
    setAdminLoginPassword('');
    setAdminLoginError('');
    setIsAdminOpen(false);
    if (window.location.pathname.replace(/\/+$/, '') === ADMIN_PATH.replace(/\/+$/, '')) {
      window.history.replaceState(null, '', '/');
    }
  };

  const closeAdminPanel = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.replace(/\/+$/, '') === ADMIN_PATH.replace(/\/+$/, '')) {
      window.history.replaceState(null, '', '/');
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'pt' ? 'en' : 'pt';
    setLang(newLang);
    localStorage.setItem('ferrari_lang', newLang);
  };

  const t = {
    clients: lang === 'pt' ? 'Nomes que já trabalhei' : 'Worked with names',
    result: lang === 'pt' ? 'Resultado' : 'Results',
    views: lang === 'pt' ? 'views geradas' : 'views generated',
    revenue: lang === 'pt' ? 'Faturamento gerado' : 'Revenue generated',
    projectsCount: lang === 'pt' ? 'projetos feitos' : 'projects finished',
    portfolio: lang === 'pt' ? 'Portfólio' : 'Portfolio',
    featured: lang === 'pt' ? 'Trabalhos de Destaque' : 'Featured Works',
    vertical: lang === 'pt' ? 'Reels' : 'Reels',
    horizontal: lang === 'pt' ? 'Vídeos' : 'Videos',
    aboutTitle: lang === 'pt' ? 'Sobre o meu trabalho' : 'About my work',
    aboutText1: lang === 'pt' 
      ? <>Sou <span className="text-white font-bold">João Ferrari</span> e fiz parte do time de marketing da Adapta.org, uma startup que, em apenas um ano, se tornou a maior empresa de IA generativa da América Latina.</>
      : <>I am <span className="text-white font-bold">João Ferrari</span> and I was part of the marketing team at Adapta.org, a startup that, in just one year, became the largest generative AI company in Latin America.</>,
    aboutText2: lang === 'pt'
      ? 'Durante minha trajetória na Adapta, desenvolvi habilidades avançadas em edição de vídeo, inteligência artificial, automações e gerenciamento de time.'
      : 'During my time at Adapta, I developed advanced skills in video editing, artificial intelligence, automation, and team management.',
    aboutText3: lang === 'pt'
      ? <>Tenho ampla experiência em edição voltada para marketing: <span className="text-brand-blue font-bold italic text-white/100">não penso apenas em vídeos bonitos</span>, mas em estratégia, métricas e performance, sempre com foco em gerar grandes resultados.</>
      : <>I have extensive experience in marketing-focused editing: <span className="text-brand-blue font-bold italic text-white/100">I don't just think about beautiful videos</span>, but strategy, metrics, and performance, always focusing on driving significant results.</>,
    contactBtn: lang === 'pt' ? 'Fale Comigo' : 'Contact Me',
  };

  const duplicatedClients = [...WORKED_NAMES, ...WORKED_NAMES, ...WORKED_NAMES];
  const getProjectOrder = (project: VideoProject) => (lang === 'pt' ? project.orderPt ?? 0 : project.orderEn ?? 0);
  const reelsProjects = projects
    .filter(p => p.section === 'reels')
    .sort((a, b) => getProjectOrder(a) - getProjectOrder(b));
  const videoProjects = projects
    .filter(p => p.section === 'video')
    .sort((a, b) => getProjectOrder(a) - getProjectOrder(b));

  return (
    <div className="bg-brand-black min-h-screen text-white selection:bg-brand-blue selection:text-white relative">
      <GridBackground />
      <Navbar lang={lang} toggleLang={toggleLang} />
      
      <main className="relative z-10">
        <Hero lang={lang} />

        {/* Marquee de Clientes */}
        <section className="py-12 overflow-hidden" id="clients">
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6 mb-12 text-center"
          >
            <h3 className="text-[10px] md:text-xs font-medium tracking-[0.5em] uppercase text-white/30">{t.clients}</h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative marquee-mask"
          >
            <motion.div 
              className="flex gap-8"
              animate={{ x: [0, -2500] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" } }}
              style={{ width: "max-content" }}
            >
              {duplicatedClients.map((client, index) => (
                <div key={`${client.title}-${index}`} className="w-[240px] md:w-[280px] flex-shrink-0 group cursor-default">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-brand-dark-gray border border-white/5 shadow-xl relative">
                    <img 
                      src={client.thumb} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                      alt={client.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1.5">
                        {client.isIG && <InstagramColorIcon />}
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/90">{client.followers}</p>
                      </div>
                      <h4 className="text-base font-bold tracking-tight mb-0.5">{client.title}</h4>
                      <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">{client.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Métricas de Resultado */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h3 className="text-sm md:text-base font-medium tracking-[0.5em] uppercase text-white/40">{t.result}</h3>
            </motion.div>
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-16 text-center"
            >
              {[
                { label: t.views, val: '191m+', icon: <Eye size={24} className="text-white" /> },
                { label: t.revenue, val: '$ 184m', icon: <DollarSign size={24} className="text-white" /> },
                { label: t.projectsCount, val: '999+', icon: <Clapperboard size={24} className="text-white" /> }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className="mb-4 opacity-100">{stat.icon}</div>
                  <div className="text-5xl md:text-7xl font-extralight tracking-tighter mb-2 uppercase">{stat.val}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section with Sliders */}
        <section className="py-20 px-6" id="portfolio">
          <div className="max-w-7xl mx-auto">
             <motion.div 
               variants={revealVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="mb-16 text-center"
             >
              <h3 className="text-sm md:text-base font-medium tracking-[0.5em] uppercase text-white/40 mb-2">{t.portfolio}</h3>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">{t.featured}</h2>
            </motion.div>
            
            <PortfolioSlider 
              title={t.vertical} 
              projects={reelsProjects} 
              isVertical={true} 
              onSelect={setSelectedVideo}
              showAll={false}
            />

            <PortfolioSlider 
              title={t.horizontal} 
              projects={videoProjects} 
              isVertical={false}
              onSelect={setSelectedVideo}
            />
          </div>
        </section>

        {/* About My Work section */}
        <section className="py-24 px-6 bg-brand-dark-gray/30 backdrop-blur-sm" id="services">
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12 uppercase italic">{t.aboutTitle}</h3>
            <div className="space-y-8 text-white/80 text-lg md:text-xl leading-relaxed text-balance">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <p>{t.aboutText3}</p>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center" id="contact">
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a href="https://wa.me/5519988067736" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-blue hover:text-white transition-all shadow-2xl">
                {t.contactBtn}
              </button>
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter italic">JOÃO FERRARI</div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/jvf_editor/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white/40">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/jo%C3%A3o-ferrari-ba716021b/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white/40">
              <Linkedin size={20} />
            </a>
            <a href="https://wa.me/5519988067736" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white/40">
              <MessageCircle size={20} />
            </a>
          </div>
          <div className="text-[8px] text-white/20 uppercase tracking-[0.3em]">© 2024 João Vitor Ferrari. <span className="opacity-30">Acesse <a href="/admin" className="text-brand-blue hover:text-white transition-colors">/admin</a> ou use <code className="text-brand-blue">/?admin=true</code></span></div>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-black/90 animate-in fade-in duration-300">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedVideo(null)}></div>
          <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-2xl overflow-hidden border border-white/10">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-white hover:text-black text-white rounded-full transition-all"
            >
              <X size={20} />
            </button>
            {selectedVideo.isPhoto ? (
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={selectedVideo.thumbnail} 
                  alt={selectedVideo.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <iframe 
                src={selectedVideo.videoUrl?.includes('?') ? `${selectedVideo.videoUrl}&autoplay=1` : `${selectedVideo.videoUrl}?autoplay=1`}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
              ></iframe>
            )}
          </div>
        </div>
      )}

      {isAdminOpen && !adminAuthenticated && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-dark-gray p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <p className="text-sm text-white/50">Digite usuário e senha para acessar o painel.</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.35em] text-white/50 mb-2">Usuário</label>
                <input
                  type="text"
                  value={adminLoginUsername}
                  onChange={(e) => setAdminLoginUsername(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none focus:border-brand-lime"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.35em] text-white/50 mb-2">Senha</label>
                <input
                  type="password"
                  value={adminLoginPassword}
                  onChange={(e) => setAdminLoginPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none focus:border-brand-lime"
                />
              </div>
              {adminLoginError && <p className="text-sm text-red-400">{adminLoginError}</p>}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeAdminPanel}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-brand-lime px-4 py-3 text-black font-bold uppercase tracking-[0.1em] transition hover:bg-lime-500"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isAdminOpen && adminAuthenticated && (
        <AdminPanel 
          projects={projects} 
          onSave={(newP) => {
            setProjects(newP);
            localStorage.setItem('ferrari_portfolio_v2', JSON.stringify(newP));
            setIsAdminOpen(false);
            if (window.location.pathname.replace(/\/+$/, '') === ADMIN_PATH.replace(/\/+$/, '')) {
              window.history.replaceState(null, '', '/');
            }
          }} 
          onClose={closeAdminPanel} 
        />
      )}
    </div>
  );
};

export default App;
