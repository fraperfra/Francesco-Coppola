import React, { useEffect } from 'react';
import { Process } from '../components/Process';
import { PostOffer } from '../components/PostOffer';
import { Reassurance } from '../components/Reassurance';
import { CTAStrip } from '../components/CTAStrip';
import { Pricing } from '../components/Pricing';
import { SectionHeading } from '../components/SectionHeading';

export const BuyingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceCards = [
    {
      title: "Verifiche documenti dell'immobile",
      description: "Controlliamo planimetrie, visure e conformità urbanistica e catastale.",
      imageWebp: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&h=300&fm=webp&q=80",
      imageJpg: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Verifiche documenti dell'immobile",
      href: "/consulenza-acquisto/verifiche-documenti",
      availability: "Disponibile"
    },
    {
      title: "Valutazione del prezzo di mercato",
      description: "Valutiamo se il prezzo richiesto è in linea col mercato prima dell'offerta.",
      imageWebp: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80",
      imageJpg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Valutazione del prezzo di mercato",
      href: "/consulenza-acquisto/valutazione-prezzo",
      availability: "Disponibile"
    },
    {
      title: "Supporto nella trattativa e formulazione offerta",
      description: "Ti guidiamo nell’offerta con clausole che tutelano i tuoi interessi.",
      imageWebp: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80",
      imageJpg: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Supporto nella trattativa",
      href: "/consulenza-acquisto/trattativa-offerta",
      availability: "Disponibile"
    },
    {
      title: "Stesura del contratto preliminare",
      description: "Redigiamo o analizziamo il preliminare per chiarezza e sicurezza.",
      imageWebp: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80",
      imageJpg: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Stesura del contratto preliminare",
      href: "/consulenza-acquisto/contratto-preliminare",
      availability: "Disponibile"
    },
    {
      title: "Visure ipotecarie e controlli legali",
      description: "Verifichiamo ipoteche, pignoramenti o altri vincoli sull’immobile.",
      imageWebp: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80",
      imageJpg: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Visure ipotecarie e controlli legali",
      href: "/consulenza-acquisto/visure-ipotecarie",
      availability: "Disponibile"
    },
    {
      title: "Accompagnamento al rogito",
      description: "Ti affianchiamo fino al rogito per acquistare casa senza incertezze.",
      imageWebp: "https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=400&h=300&fm=webp&q=80",
      imageJpg: "https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=400&h=300&q=80",
      alt: "Accompagnamento al rogito",
      href: "/consulenza-acquisto/rogito",
      availability: "Disponibile"
    }
  ];

  const trackEvent = (event: string, label: string) => {
    const analytics = (window as any).dataLayer;
    const gtag = (window as any).gtag;
    if (Array.isArray(analytics)) {
      analytics.push({ event, label });
      return;
    }
    if (typeof gtag === 'function') {
      gtag('event', event, { label });
    }
  };

  return (
    <div className="pt-20 animate-fade-in">
      <section className="bg-brand-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Consulenza Acquisto Sicuro</h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            La guida esperta per comprare casa da privati senza rischi, stress e sorprese.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="consulenza-acquisto-servizi">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Consulenza Acquisto"
            subtitle="Sei servizi dedicati per acquistare casa con sicurezza e metodo."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                aria-label={`Vai a ${card.title}`}
                onClick={() => trackEvent('service_card_click', card.title)}
                className="block group focus:outline-none focus:ring-2 focus:ring-brand-600 rounded-2xl"
              >
                <article
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 group flex flex-col cursor-pointer"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <picture>
                    <source type="image/webp" srcSet={`${card.imageWebp} 1x`} />
                    <img
                      src={card.imageJpg}
                      width={400}
                      height={300}
                      alt={card.alt}
                      loading="lazy"
                      className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                      itemProp="image"
                    />
                  </picture>
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">Disponibilità</span>
                      <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                        {card.availability}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900" itemProp="name">
                      {card.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed" itemProp="description">
                      {card.description}
                    </p>
                    <span className="mt-auto inline-flex items-center text-brand-600 font-semibold group-hover:text-brand-800 transition-colors" itemProp="url">
                      Scopri il servizio
                    </span>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Servizio singolo o pacchetto completo?"
            subtitle="Confronta costi, benefici e risparmio per scegliere la soluzione ideale."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Servizio singolo</h3>
              <p className="text-slate-600 mb-6">Ideale se hai bisogno di un supporto mirato su un solo step.</p>
              <div className="text-4xl font-bold text-brand-600 mb-2">Da € 190</div>
              <p className="text-sm text-slate-500 mb-6">Prezzo per singolo servizio</p>
              <ul className="space-y-3 text-slate-700">
                {[
                  'Un servizio a scelta',
                  'Supporto specialistico dedicato',
                  'Tempi rapidi e focus mirato',
                  'Nessun vincolo su altri step'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-brand-600"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <span className="text-sm text-slate-600">Risparmio</span>
                <span className="text-sm font-semibold text-slate-600">0%</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-brand-600 p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Pacchetto completo</h3>
              <p className="text-slate-600 mb-6">La soluzione più conveniente per coprire tutte le fasi.</p>
              <div className="text-4xl font-bold text-brand-600 mb-2">€ 1.290</div>
              <p className="text-sm text-slate-500 mb-6">Tutti i servizi inclusi</p>
              <ul className="space-y-3 text-slate-700">
                {[
                  'Verifiche, valutazione, trattativa e rogito',
                  'Coordinamento completo fino alla firma',
                  'Report e documentazione completa',
                  'Assistenza continua con consulente dedicato'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-brand-600"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 flex items-center justify-between">
                <span className="text-sm text-brand-700">Risparmio stimato</span>
                <span className="text-sm font-semibold text-brand-700">-22%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Process />
      <PostOffer />
      <Reassurance />
      <Pricing />
      <CTAStrip />
    </div>
  );
};
