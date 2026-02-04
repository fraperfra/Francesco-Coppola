import React from 'react';
import { FileSearch, Calculator, Handshake, ScrollText, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href = '#contatti', ctaLabel = 'Scopri di più' }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
    <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors duration-300 shrink-0">
      <Icon className="text-brand-600 w-8 h-8 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{description}</p>
    <a href={href} className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors mt-auto">
      {ctaLabel} <ArrowRight size={16} className="ml-2" />
    </a>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      icon: FileSearch,
      title: "Verifiche documenti dell'immobile",
      description: "Controlliamo planimetrie, visure, conformità urbanistica e catastale, per evitare brutte sorprese.",
      href: "/consulenza-acquisto/verifiche-documenti"
    },
    {
      icon: Calculator,
      title: "Valutazione Immobiliare",
      description: "Ti aiutiamo a capire se il prezzo richiesto è in linea col mercato, prima di fare un’offerta.",
      href: "/consulenza-acquisto/valutazione-prezzo"
    },
    {
      icon: Handshake,
      title: "Supporto nella trattativa",
      description: "Ti guidiamo nella formulazione dell’offerta d’acquisto, con clausole che tutelano i tuoi interessi.",
      href: "/consulenza-acquisto/trattativa-offerta"
    },
    {
      icon: ScrollText,
      title: "Accompagnamento al rogito",
      description: "Ti affianchiamo nei momenti chiave fino alla firma dal notaio, per acquistare casa senza incertezze.",
      href: "/consulenza-acquisto/rogito"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-3">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Servizi
          </span>
        </div>
        <SectionHeading 
          title="Vuoi acquistare casa?" 
          subtitle="Fallo in sicurezza grazie ai nostri servizi"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/consulenza-acquisto" className="inline-flex items-center text-lg font-semibold text-brand-600 hover:text-brand-800 transition-colors group">
            Scopri tutti i servizi 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
