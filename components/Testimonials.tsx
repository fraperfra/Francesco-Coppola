import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Marco e Giulia",
    role: "Acquirenti prima casa",
    content: "Avevamo paura di acquistare da privato per i rischi sui documenti. Grazie alla consulenza abbiamo scoperto un problema catastale prima di fare l'offerta. Soldi spesi benissimo per la nostra tranquillità.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2024-02-15"
  },
  {
    name: "Roberto S.",
    role: "Investitore immobiliare",
    content: "Cercavo un professionista indipendente che non volesse solo 'chiudere la vendita'. Ho trovato un'analisi precisa del valore e un supporto fondamentale nella trattativa sul prezzo.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2024-01-20"
  },
  {
    name: "Elena M.",
    role: "Acquirente",
    content: "Il venditore sembrava affidabile, ma la verifica documentale ha fatto emergere delle difformità. Senza questo supporto avrei comprato un immobile abusivo senza saperlo.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2023-12-10"
  },
  {
    name: "Luca e Sara",
    role: "Giovane Coppia",
    content: "Non sapevamo come gestire la proposta d'acquisto. Il consulente ci ha guidato passo passo, facendoci risparmiare oltre 10.000€ sul prezzo richiesto dal venditore.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2024-03-01"
  },
  {
    name: "Matteo V.",
    role: "Libero Professionista",
    content: "Servizio eccellente. Ho apprezzato l'assenza di conflitti di interesse: mi hanno sconsigliato due case prima di trovare quella giusta. Onestà rara in questo settore.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2023-11-05"
  },
  {
    name: "Francesca D.",
    role: "Acquirente",
    content: "Ero ansiosa per la burocrazia. Avere un tecnico che parla con il notaio e controlla tutto al posto tuo non ha prezzo. Mi sono sentita tutelata dal primo all'ultimo giorno.",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2024-02-28"
  },
  {
    name: "Giovanni e Anna",
    role: "Pensionati",
    content: "Volevamo comprare un appartamento più piccolo vicino ai nipoti. Ci hanno aiutato a evitare una casa con spese condominiali nascoste altissime. Grazie di cuore.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2023-10-15"
  },
  {
    name: "Davide P.",
    role: "Imprenditore",
    content: "Ho comprato direttamente da un costruttore. Pensavo fosse tutto facile, invece c'erano clausole capestro nel preliminare. Il supporto legale è stato decisivo.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2024-01-12"
  },
  {
    name: "Simona L.",
    role: "Acquirente Single",
    content: "Non capivo nulla di visure e planimetrie. Il report tecnico che mi hanno consegnato era chiarissimo e mi ha permesso di comprare con totale consapevolezza.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2023-12-22"
  },
  {
    name: "Alessandro B.",
    role: "Investitore",
    content: "Veloci, precisi e pragmatici. La valutazione immobiliare era esattamente in linea con il perito della banca. Zero sorprese al momento del mutuo.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2024-03-10"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
            title="Dicono di noi" 
            subtitle="Le storie vere di famiglie e investitori che hanno acquistato in sicurezza."
            centered 
        />
        
        {/* Scroll Container */}
        <div className="relative w-full">
          {/* Gradient Masks for scrolling indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex overflow-x-auto gap-6 pb-10 pt-4 px-4 snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0">
            {reviews.map((review, idx) => (
              <article 
                key={idx} 
                className="min-w-[300px] md:min-w-[400px] snap-center bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-auto hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
                itemScope 
                itemType="http://schema.org/Review"
              >
                {/* Microdata hidden but present for SEO */}
                <div itemProp="itemReviewed" itemScope itemType="http://schema.org/Service">
                    <meta itemProp="name" content="Consulenza Acquisto Immobiliare Indipendente" />
                </div>
                <div itemProp="reviewRating" itemScope itemType="http://schema.org/Rating">
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                </div>

                <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                    ))}
                </div>
                
                <blockquote className="mb-6 flex-grow relative z-10">
                    <p className="text-slate-600 italic leading-relaxed text-lg" itemProp="reviewBody">
                        "{review.content}"
                    </p>
                </blockquote>
                
                <footer className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200" itemProp="author" itemScope itemType="http://schema.org/Person">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" 
                    itemProp="image"
                  />
                  <div>
                    <cite className="not-italic font-bold text-slate-900 block text-base" itemProp="name">
                        {review.name}
                    </cite>
                    <span className="text-xs text-brand-600 font-semibold uppercase tracking-wide">
                        {review.role}
                    </span>
                    <meta itemProp="datePublished" content={review.date} />
                  </div>
                </footer>
              </article>
            ))}
          </div>
          
          <div className="flex justify-center mt-4 gap-2">
             <div className="text-sm text-slate-400 font-medium animate-pulse">
                &larr; Scorri per leggere altre storie &rarr;
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};