import React from 'react';

interface HeroProps {
  lang: 'pt' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const title = lang === 'pt' ? 'Editor de vídeo focado em performance' : 'Video editor focused on performance';
  const subtitle = lang === 'pt'
    ? 'Crio vídeos de alto impacto para marcas, lançamentos e redes sociais.'
    : 'I create high-impact videos for brands, launches and social media.';
  const cta = lang === 'pt' ? 'Veja meu portfólio' : 'See my portfolio';

  return (
    <section id="home" className="min-h-screen flex items-center pt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-6">{lang === 'pt' ? 'Projeto de vídeo' : 'Video project'}</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-black transition hover:bg-white"
              >
                {cta}
              </a>
              <a
                href="https://wa.me/5519988067736"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
              >
                {lang === 'pt' ? 'Vamos conversar' : 'Let’s talk'}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="space-y-4">
              <div className="h-2 w-20 rounded-full bg-brand-blue"></div>
              <div className="h-2 w-12 rounded-full bg-white/40"></div>
              <div className="h-2 w-16 rounded-full bg-white/30"></div>
            </div>
            <div className="mt-10 rounded-[1.5rem] bg-black/80 p-6 shadow-inner">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50 mb-4">{lang === 'pt' ? 'Destaque' : 'Highlight'}</p>
              <h2 className="text-2xl font-bold text-white">{lang === 'pt' ? 'Vídeos que convertem' : 'Videos that convert'}</h2>
              <p className="mt-4 text-sm text-white/60">{lang === 'pt' ? 'Estratégia, desempenho e criatividade unidos para gerar resultados.' : 'Strategy, performance and creativity combined to drive results.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
