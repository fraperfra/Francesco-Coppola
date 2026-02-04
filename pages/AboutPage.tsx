import React from 'react';
import { OurOffice } from '../components/OurOffice';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Reassurance } from '../components/Reassurance';
import { Testimonials } from '../components/Testimonials';

export const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Indipendenza totale',
      description: 'Nessuna provvigione dal venditore e nessun conflitto di interesse.'
    },
    {
      title: 'Metodo trasparente',
      description: 'Ogni fase viene condivisa con report chiari e decisioni consapevoli.'
    },
    {
      title: 'Competenza tecnica',
      description: 'Analisi documentale, urbanistica e negoziale per proteggere il tuo investimento.'
    }
  ];

  return (
    <div className="pt-20 animate-fade-in">
      <section className="bg-brand-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chi Siamo</h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto">
            Un team indipendente che unisce competenze immobiliari, legali e strategiche per guidarti con sicurezza.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OurOffice />
      <WhyChooseUs />
      <Reassurance />
      <Testimonials />
    </div>
  );
};
