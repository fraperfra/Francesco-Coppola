import React from 'react';
import { Check, Phone } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column - Images Composition */}
          <div className="lg:w-1/2 relative min-h-[500px] w-full">
            {/* Blue Card */}
            <div className="absolute top-12 left-0 w-[45%] h-[380px] bg-brand-600 rounded-[2rem] flex flex-col justify-center items-center text-white p-6 z-0 shadow-2xl">
               <span className="text-5xl md:text-6xl font-bold mb-2">95%</span>
               <span className="text-brand-100 text-center font-medium text-lg leading-tight">Clienti<br/>Soddisfatti</span>
            </div>

            {/* Top Image */}
            <div className="absolute top-0 right-4 w-[55%] h-[260px] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl z-10">
               <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Meeting consulenza" className="w-full h-full object-cover" />
            </div>

            {/* Bottom Image */}
            <div className="absolute bottom-6 left-[15%] right-0 h-[300px] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl z-20">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Supporto clienti" className="w-full h-full object-cover" />
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -bottom-6 -left-6 flex gap-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-brand-200"></div>
                ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-1/2">
             <div className="relative mb-2">
                <span className="text-brand-600 uppercase tracking-widest text-sm font-bold pl-1 block mb-2">Perchè scegliere noi</span>
                {/* Faint Background Number */}
                <span className="hidden md:block absolute -top-16 -left-8 text-[10rem] font-bold text-slate-100 -z-10 select-none leading-none opacity-60">04</span>
             </div>
             
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Ci impegniamo per ottenere il miglior risultato
             </h2>

             <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Scegliere noi significa affidarti a un team locale che unisce esperienza sul territorio, metodi trasparenti e strumenti digitali per vendere o comprare casa a Reggio Emilia con più controllo.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  "Conoscenza del territorio",
                  "Esperienza decennale",
                  "Supporto completo",
                  "Valutazioni rapide"
                ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-100 transition-all duration-300 group">
                      <div className="w-8 h-8 rounded-full bg-slate-900 group-hover:bg-brand-600 transition-colors flex items-center justify-center shrink-0">
                         <Check size={16} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="font-bold text-slate-800">{item}</span>
                   </div>
                ))}
             </div>

             <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-flex pr-8">
                <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                      alt="Consulente" 
                      className="w-16 h-16 rounded-xl object-cover shadow-sm"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div>
                   <p className="text-brand-600 font-bold text-sm mb-0.5">Supporto Telefonico</p>
                   <p className="text-xl md:text-2xl font-bold text-slate-900">(+39) 327 491 1031</p>
                </div>
                <div className="hidden sm:flex ml-4 w-12 h-12 bg-brand-600 rounded-full items-center justify-center text-white shadow-lg shadow-brand-200">
                   <Phone size={20} />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};