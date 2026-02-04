import React from 'react';
import { UserCheck, Eye, Lock } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const Reassurance: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionHeading 
            title="Il mio impegno è tutelare il tuo acquisto" 
            centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
                {
                    icon: UserCheck,
                    title: "Nessun conflitto di interesse",
                    desc: "Non percepisco provvigioni dal venditore. Lavoro esclusivamente per te e per i tuoi interessi."
                },
                {
                    icon: Eye,
                    title: "Analisi Oggettiva",
                    desc: "Non devo venderti nulla. Se una casa ha problemi nascosti o un prezzo fuori mercato, te lo dico chiaramente."
                },
                {
                    icon: Lock,
                    title: "Trasparenza Totale",
                    desc: "Ogni passo della trattativa è condiviso. Nessuna sorpresa, costi chiari fin dal primo preventivo."
                }
            ].map((item, idx) => (
                <div key={idx} className="text-center p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
                        <item.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};