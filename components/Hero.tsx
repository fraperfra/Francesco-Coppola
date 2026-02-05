import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  const highlights = ['Nessuna provvigione', 'Nessuna agenzia', 'Solo il tuo interesse'];
  const actions = [
    { label: 'Prenota una consulenza gratuita', variant: 'primary' as const, href: '/contatti' },
    { label: 'Scopri i servizi', variant: 'outline' as const, icon: ArrowRight, href: '/consulenza-acquisto' }
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/id/48/1920/1080"
          alt="Consulente immobiliare a Reggio Emilia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/75"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative pt-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/30 border border-brand-400/50 mb-6 backdrop-blur-md">
            <ShieldCheck size={16} className="text-brand-200" />
            <span className="text-sm font-medium text-brand-50 tracking-wide">A Reggio Emilia e in tutta l'Emilia</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Compra o vendi casa <span className="text-brand-400">senza rischi</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed font-light">
            Sono Francesco Coppola, <span className="font-semibold text-white">consulente immobiliare indipendente</span> a Reggio Emilia. Ti tutelo in ogni fase della compravendita, senza conflitti di interesse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button key={action.label} href={action.href} variant={action.variant} className="w-full sm:w-auto text-lg px-8">
                  {action.label}
                  {Icon && <Icon size={20} />}
                </Button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-slate-300 font-medium">
            {highlights.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
