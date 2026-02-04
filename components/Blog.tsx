import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: "Errori da evitare acquistando da privato",
    excerpt: "I 5 rischi più comuni quando non c'è un'agenzia intermediaria e come proteggersi legalmente.",
    image: "https://picsum.photos/id/20/600/400",
    category: "Guida all'acquisto"
  },
  {
    title: "Il ruolo del notaio: cosa fa e cosa no",
    excerpt: "Molti pensano che il notaio controlli tutto, ma non verifica lo stato urbanistico. Ecco perché serve un tecnico.",
    image: "https://picsum.photos/id/45/600/400",
    category: "Legale"
  },
  {
    title: "Come capire se il prezzo è giusto",
    excerpt: "Strumenti e metodi per valutare un immobile al di là del prezzo richiesto dal proprietario su Immobiliare.it.",
    image: "https://picsum.photos/id/60/600/400",
    category: "Mercato"
  }
];

export const Blog: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Articoli Recenti" subtitle="Consigli e approfondimenti per un acquisto consapevole." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <a key={idx} href="/blog" className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-100">
              <div className="overflow-hidden rounded-lg mb-4">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-brand-600 font-bold text-sm uppercase tracking-wider">{article.category}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 group-hover:text-brand-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              <span className="inline-flex items-center text-slate-900 font-semibold text-sm group-hover:underline">
                Leggi l'articolo <ArrowRight size={14} className="ml-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
