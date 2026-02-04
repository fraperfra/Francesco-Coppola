import React from 'react';
import { FileText, FolderCheck, KeyRound } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { StepProps } from '../types';

const steps: StepProps[] = [
  {
    number: "04",
    icon: FileText,
    title: "Redigiamo il contratto preliminare",
    description: "Stabiliamo tempi, caparra, modalità di pagamento e condizioni essenziali per un acquisto chiaro e sicuro."
  },
  {
    number: "05",
    icon: FolderCheck,
    title: "Verifichiamo la documentazione",
    description: "Prepariamo il fascicolo con atti di provenienza, planimetrie, pratiche edilizie, visure e APE, utile per banca e notaio."
  },
  {
    number: "06",
    icon: KeyRound,
    title: "Ti accompagniamo al rogito",
    description: "Coordiniamo con il notaio la preparazione dell’atto finale e ti affianchiamo il giorno della firma, per concludere l’acquisto in sicurezza."
  }
];

export const PostOffer: React.FC = () => {
  return (
    <section className="pt-12 pb-24 bg-gradient-to-b from-brand-800 to-brand-900 text-white relative overflow-hidden">
      {/* Decorative pattern matching previous section */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
            title="E se l'offerta di acquisto viene accettata?"
            subtitle="Siamo pronti per accompagnarti fino al rogito notarile."
            centered
            light={true} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto relative">
             {/* Connecting line for desktop */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-700 -z-10"></div>

            {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                    {/* Icon Circle */}
                    <div className="w-24 h-24 bg-brand-800 rounded-full border-4 border-brand-600 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-opacity-100 z-10">
                        <step.icon size={40} className="text-white" />
                    </div>
                    
                    {/* Glass Card */}
                    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm w-full h-full border border-white/10 hover:bg-white/20 transition-colors">
                        <span className="block text-6xl font-bold text-white/5 absolute top-2 right-4 select-none">{step.number}</span>
                        <h3 className="text-xl font-bold mb-4 relative z-10">{step.title}</h3>
                        <p className="text-brand-100 text-base leading-relaxed relative z-10">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};