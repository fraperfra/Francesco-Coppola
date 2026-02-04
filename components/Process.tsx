import React from 'react';
import { Eye, BarChart3, FileSignature } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { StepProps } from '../types';

const steps: StepProps[] = [
  {
    number: "01",
    icon: Eye,
    title: "Visita Preliminare",
    description: "Facciamo il sopralluogo insieme a te per valutare l’immobile, segnalare criticità e rispondere ai tuoi dubbi."
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Valutazione Reale di Mercato",
    description: "Verifichiamo se il prezzo richiesto è coerente con il mercato, per aiutarti a fare un’offerta consapevole."
  },
  {
    number: "03",
    icon: FileSignature,
    title: "Presentiamo un'offerta",
    description: "Prepariamo la proposta d’acquisto con clausole di tutela e ti supportiamo nella negoziazione col venditore."
  }
];

export const Process: React.FC = () => {
  return (
    <section className="pt-24 pb-0 bg-gradient-to-b from-brand-900 to-brand-800 text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Come funziona la consulenza?" 
          subtitle="La prima fase: dalla visita alla proposta d'acquisto."
          centered
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative max-w-6xl mx-auto pb-12">
            {/* Connecting line for large screens */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-700 -z-10"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-brand-800 rounded-full border-4 border-brand-600 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-opacity-100 z-10">
                <step.icon size={40} className="text-white" />
              </div>
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm w-full h-full border border-white/10 hover:bg-white/20 transition-colors">
                  <span className="block text-6xl font-bold text-white/5 absolute top-2 right-4 select-none">{step.number}</span>
                  <h3 className="text-xl font-bold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-brand-100 text-base leading-relaxed relative z-10">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};