import React from 'react';
import { Button } from './Button';

export const CTAStrip: React.FC = () => {
  const content = {
    title: 'Vuoi acquistare casa senza rischi inutili?',
    description: 'Non rischiare i tuoi risparmi in un acquisto non verificato. Ottieni subito il parere di un esperto di parte.',
    cta: 'Parla con un consulente indipendente'
  };

  return (
    <section className="py-16 bg-brand-600 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full -ml-24 -mb-24"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {content.title}
        </h2>
        <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
          {content.description}
        </p>
        <Button href="/contatti" variant="white" className="text-lg px-10 py-4 mx-auto">
          {content.cta}
        </Button>
      </div>
    </section>
  );
};
