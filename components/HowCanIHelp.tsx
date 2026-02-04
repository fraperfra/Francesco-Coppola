import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const HowCanIHelp: React.FC = () => {
  const cards = [
    {
      title: 'Voglio Vendere',
      description: 'Vendi casa senza provvigioni, con un prezzo fisso e chiaro.',
      image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      alt: 'Coppia che guarda laptop',
      buttonText: 'Scopri il prezzo fisso',
      buttonVariant: 'primary' as const,
      buttonHref: '/consulenza-vendita'
    },
    {
      title: 'Voglio Acquistare',
      description: 'Acquista casa in sicurezza con un consulente dedicato.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      alt: 'Chiavi di casa',
      buttonText: 'Scopri la consulenza',
      buttonVariant: 'white' as const,
      buttonHref: '/consulenza-acquisto'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Come posso aiutarti?
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 w-full max-w-4xl mx-auto mb-8 leading-relaxed">
            Che tu stia cercando di <strong>vendere casa privatamente</strong> o di <strong>acquistare l'immobile ideale</strong>, offro una consulenza indipendente su misura. 
          </p>

          <div className="h-1.5 w-24 bg-brand-600 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[400px] md:h-[500px] flex flex-col justify-end"
            >
              <img
                src={card.image}
                alt={card.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent/20 md:via-slate-900/50"></div>

              <div className="relative z-10 p-6 sm:p-8 md:p-12 w-full text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight shadow-sm">
                  {card.title}
                </h3>
                <p className="text-slate-100 text-base sm:text-lg mb-6 font-medium max-w-md mx-auto leading-snug opacity-95">
                  {card.description}
                </p>

                <Button href={card.buttonHref} variant={card.buttonVariant} className="w-full sm:w-auto px-6 py-3 md:py-4 md:px-8 text-base md:text-lg">
                  {card.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
