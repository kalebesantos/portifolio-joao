
import React from 'react';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-brand-black" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase">VAMOS COMEÇAR A <span className="text-brand-lime">EDITAR</span></h2>
          <p className="text-brand-gray-text text-lg italic font-display uppercase tracking-widest">
            Pronto para elevar seu projeto? Entre em contato para um orçamento personalizado.
          </p>
        </div>

        <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-brand-gray-text">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: David Fincher"
                className="w-full bg-brand-dark-gray border border-white/10 px-4 py-4 focus:border-brand-lime focus:outline-none transition-all text-white placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-brand-gray-text">Endereço de E-mail</label>
              <input 
                type="email" 
                placeholder="Ex: ola@estudio.com"
                className="w-full bg-brand-dark-gray border border-white/10 px-4 py-4 focus:border-brand-lime focus:outline-none transition-all text-white placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-brand-gray-text">Tipo de Projeto</label>
              <select className="w-full bg-brand-dark-gray border border-white/10 px-4 py-4 focus:border-brand-lime focus:outline-none transition-all text-white">
                <option>Comercial</option>
                <option>Mídias Sociais</option>
                <option>Documentário</option>
                <option>Vídeo Clipe</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="block text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-brand-gray-text">Detalhes do Projeto</label>
            <textarea 
              rows={6} 
              placeholder="Conte-me sobre seu material, prazos e visão..."
              className="w-full bg-brand-dark-gray border border-white/10 px-4 py-4 focus:border-brand-lime focus:outline-none transition-all text-white flex-grow placeholder:text-white/20"
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center mt-8">
            <button className="inline-flex items-center gap-4 bg-brand-lime text-black px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300">
              ENVIAR MENSAGEM
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
