import React from 'react';
import { LineChart, FileCheck, Wand2, Megaphone, ArrowRight, UserCheck, Handshake } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href = '/contatti', ctaLabel = 'Scopri di più' }) => (
  <div className="bg-slate-50 p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
    <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors duration-300 border border-slate-100 shadow-sm shrink-0">
      <Icon className="text-brand-600 w-8 h-8 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{description}</p>
    <a href={href} className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors mt-auto">
      {ctaLabel} <ArrowRight size={16} className="ml-2" />
    </a>
  </div>
);

export const SellingServices: React.FC = () => {
  const services = [
    {
      icon: LineChart,
      title: "Report Valutazione Immobile",
      description: "Report di analisi mercato immobiliare. Analizziamo dati tecnici e di mercato per fornirti una valutazione affidabile, oggettiva e basata su immobili realmente comparabili nella tua zona.",
      href: "/consulenza-vendita/report-valutazione-immobile"
    },
    {
      icon: FileCheck,
      title: "Fascicolo tecnico CASA OK",
      description: "Elenco servizi per verifica tecnica dell'immobile. Un fascicolo completo di tutta la documentazione tecnica e di provenienza, per garantire che l’immobile sia conforme e vendibile senza rischi.",
      href: "/consulenza-vendita/fascicolo-tecnico-casa-ok"
    },
    {
      icon: Wand2,
      title: "Servizio Foto, Video e AI",
      description: "Interno di un immobile per la pubblicità immobiliare. Realizziamo fotografie professionali e Virtual Tour per valorizzare il tuo immobile. Grazie all’intelligenza artificiale creiamo anche soluzioni di Home Staging Virtuale.",
      href: "/consulenza-vendita/foto-video-ai"
    },
    {
      icon: Megaphone,
      title: "Pubblicità e Marketing",
      description: "App social. Diffondiamo l’annuncio su tutti i principali portali immobiliari e con campagne mirate social, Google e marketing locale.",
      href: "/consulenza-vendita/pubblicita-marketing"
    },
    {
      icon: UserCheck,
      title: "Prequalifica acquirenti",
      description: "Filtriamo i contatti e selezioniamo solo quelli realmente interessati e con disponibilità economica, per ridurre visite inutili e velocizzare la vendita.",
      href: "/consulenza-vendita/prequalifica-acquirenti"
    },
    {
      icon: Handshake,
      title: "Trattative & Contrattualistica",
      description: "Ti affianchiamo in tutte le fasi di trattativa fino al contratto preliminare e alla firma dal notaio, con la massima tutela.",
      href: "/consulenza-vendita/trattative-contrattualistica"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-3">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Vendita
          </span>
        </div>
        <SectionHeading 
          title="Vuoi vendere casa?" 
          subtitle="Affidati a professionisti con oltre 15 anni di esperienza"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/consulenza-vendita" className="inline-flex items-center text-lg font-semibold text-brand-600 hover:text-brand-800 transition-colors group">
            Scopri tutti i servizi di vendita
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
