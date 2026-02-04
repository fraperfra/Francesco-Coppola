import React, { useState } from 'react';
import { Button } from './Button';
import { User } from 'lucide-react';

export const OurOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Column */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-12 h-12 rounded-full border border-slate-200 absolute -left-4 -top-3 -z-10"></div>
              <span className="text-slate-500 font-semibold uppercase tracking-widest text-sm pl-2">Il Nostro Ufficio</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Servizi di consulenza professionali e dedicati
            </h2>
            
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Scegliere noi significa affidarti a un team locale che unisce esperienza sul territorio, metodi trasparenti e strumenti digitali per vendere o comprare casa con più controllo.
            </p>

            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Tabs Column */}
              <div className="flex flex-col gap-4 min-w-[240px]">
                <button 
                  onClick={() => setActiveTab('mission')}
                  className={`text-left px-6 py-4 rounded-xl transition-all duration-300 font-bold text-lg flex items-center justify-between group ${activeTab === 'mission' ? 'bg-white text-brand-600 shadow-xl border-l-4 border-brand-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>01. La nostra Missione</span>
                </button>
                <button 
                  onClick={() => setActiveTab('vision')}
                  className={`text-left px-6 py-4 rounded-xl transition-all duration-300 font-bold text-lg flex items-center justify-between group ${activeTab === 'vision' ? 'bg-white text-brand-600 shadow-xl border-l-4 border-brand-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>02. La nostra Visione</span>
                </button>
              </div>

              {/* Content Column */}
              <div className="flex-1 pt-2">
                <div className={`transition-all duration-500 ease-in-out ${activeTab === 'mission' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 hidden'}`}>
                   <p className="text-slate-600 leading-relaxed text-lg">
                     Mettere al centro della nostra attività <strong>la persona</strong> e non <strong>la transazione</strong>. Puntiamo a creare un’alternativa trasparente e di qualità, superando il classico modello di intermediazione immobiliare con soluzioni innovative e servizi personalizzati.
                   </p>
                </div>
                <div className={`transition-all duration-500 ease-in-out ${activeTab === 'vision' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 hidden'}`}>
                   <p className="text-slate-600 leading-relaxed text-lg">
                     Diventare il partner di fiducia per chi cerca un approccio etico e competente. Vogliamo che l'acquisto o la vendita di un immobile sia un percorso sereno, privo di rischi e gestito con la massima professionalità e trasparenza.
                   </p>
                </div>
              </div>
            </div>

            <Button>Contattaci</Button>
          </div>

          {/* Right Column - Image with blue blob decoration */}
          <div className="lg:w-1/2 relative flex justify-center items-center">
             <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
                {/* Blue Shape Decoration */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-[-20%] right-[-20%] w-[140%] h-[140%] text-brand-600 z-0 opacity-100 fill-current">
                    <path d="M42.7,-72.6C54.6,-66.6,63.1,-52.3,70.1,-38.4C77.1,-24.5,82.7,-11,80.6,1.2C78.5,13.4,68.7,24.3,58.8,33.8C49,43.3,39,51.4,28,58.8C17,66.2,5,72.9,-6.2,71.4C-17.4,69.9,-27.8,60.2,-39.9,51.7C-52,43.2,-65.8,35.9,-73.4,24.6C-81,13.3,-82.4,-2,-78.9,-15.8C-75.3,-29.6,-66.8,-41.9,-55.8,-48.2C-44.8,-54.5,-31.3,-54.8,-19.1,-58.5C-6.9,-62.2,4,-69.3,15.9,-72.4C27.8,-75.5,40.7,-74.6,42.7,-72.6Z" transform="translate(100 100)" />
                </svg>
                
                {/* Image Mask */}
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-slate-200">
                   <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Team di consulenti al lavoro" 
                    className="w-full h-full object-cover"
                   />
                </div>
                
                {/* Floating Icon Badge */}
                <div className="absolute bottom-6 right-6 w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white z-20">
                  <User size={28} />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};