import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { SectionHeading } from './SectionHeading';

export const Pricing: React.FC = () => {
  const featuresList = [
    "Sopralluogo presso l'immobile",
    "Report Valutazione di mercato",
    "Verifica Conformità Catastale",
    "Elenco documentazione",
    "Stesura della proposta di acquisto",
    "Supporto nella negoziazione",
    "Verifica documentazione immobile",
    "Contratto Preliminare",
    "Accompagnamento al rogito"
  ];

  const plans = [
    {
      name: "Pacchetto Valutazione",
      price: "290",
      description: "Accompagnamento alle visite e Analisi Tecnica",
      // Indicates the index up to which features are included (0-3 included, rest excluded)
      includedUpTo: 3, 
      highlight: false
    },
    {
      name: "Pacchetto Offerta d'Acquisto",
      price: "590",
      description: "Accompagnamento alle visite, Analisi Tecnica, Supporto nella Trattativa e stesura Offerta d'Acquisto",
      includedUpTo: 5,
      highlight: true
    },
    {
      name: "Pacchetto Completo",
      price: "1290",
      description: "Servizio Completo con Consulente dedicato ed accompagnamento al Rogito.",
      includedUpTo: 8,
      highlight: false
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <SectionHeading 
          title="Scegli il pacchetto su misura per te" 
          subtitle="Tariffe chiare e trasparenti per accompagnarti nell'acquisto della tua casa in totale sicurezza."
          centered
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col h-full ${
                plan.highlight 
                  ? 'border-2 border-brand-600 shadow-2xl scale-105 z-10 bg-white' 
                  : 'border border-slate-200 shadow-lg bg-white hover:shadow-xl'
              }`}
            >
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold text-brand-600">€{plan.price}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed min-h-[60px]">
                  {plan.description}
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100 mb-8"></div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {featuresList.map((feature, i) => {
                  const isIncluded = i <= plan.includedUpTo;
                  return (
                    <li key={i} className="flex items-center gap-3">
                      {isIncluded ? (
                        <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 fill-brand-600 text-white" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0 flex items-center justify-center">
                            {/* Empty circle visual */}
                        </div>
                      )}
                      <span className={`text-sm ${isIncluded ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <div className="mt-auto pt-4">
                <Button 
                   fullWidth
                   variant={plan.highlight ? 'primary' : 'white'}
                   className={!plan.highlight ? 'border border-slate-200' : ''}
                 >
                   Contattaci
                 </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};