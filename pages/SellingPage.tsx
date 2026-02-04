import React, { useEffect } from 'react';
import { SellingServices } from '../components/SellingServices';
import { Testimonials } from '../components/Testimonials';
import { CTAStrip } from '../components/CTAStrip';
import { SectionHeading } from '../components/SectionHeading';

export const SellingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    'Valutazione realistica del prezzo per ridurre i tempi di vendita',
    'Documentazione completa per evitare contestazioni',
    'Strategia marketing con strumenti digitali e AI',
    'Negoziazione professionale fino al rogito'
  ];

  const workflow = [
    {
      title: 'Ci conosciamo di persona',
      description: "Un nostro consulente immobiliare ti contatterà per effettuare un sopralluogo dell'immobile ma soprattutto per conoscere le tue esigenze."
    },
    {
      title: 'Valutazione e strategia di vendita',
      description: 'Entro 2 giorni dal sopralluogo ti presenteremo la valutazione di mercato della tua casa e decideremo insieme la strategia di vendita più adatta.',
      cta: 'Scopri il servizio'
    },
    {
      title: "Curiamo l'immagine della tua casa",
      description: "Ci occupiamo del servizio fotografico e video e garantiamo la diffusione dell'annuncio su tutti i portali immobiliari attivi in Italia."
    },
    {
      title: 'Fascicolo tecnico CASA OK',
      description: "Un fascicolo completo di tutta la documentazione tecnica e di provenienza a garanzia circa la conformità e la commerciabilità dell'immobile.",
      cta: 'Scopri il servizio'
    },
    {
      title: 'Firma dal notaio',
      description: 'Gestiremo le visite, le negoziazioni e tutta la contrattualistica fino alla sottoscrizione del contratto definitivo dal notaio.'
    }
  ];

  return (
    <div className="pt-20 animate-fade-in">
      <section className="bg-brand-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Consulenza Vendita Strategica</h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            Vendi casa senza provvigioni variabili, con un percorso chiaro e professionale.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Un piano completo per valorizzare la tua casa"
            subtitle="Dalla valutazione alla firma, ti seguiamo con un metodo trasparente e misurabile."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-brand-600"></span>
                <p className="text-slate-700 text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SellingServices />
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Come lavoriamo"
            subtitle="Un processo strutturato per vendere con serenità e tempi certi."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {workflow.map((step) => (
              <div key={step.title} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{step.description}</p>
                {step.cta && (
                  <a href="/contatti" className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors">
                    {step.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTAStrip />
    </div>
  );
};
