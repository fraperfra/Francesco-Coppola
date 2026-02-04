import React from 'react';
import { Button } from './Button';
import { CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-100 rounded-full blur-xl opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-70"></div>
            <img 
              src="https://picsum.photos/id/101/800/800" 
              alt="Consulente immobiliare al lavoro" 
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover z-10"
            />
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-lg shadow-xl z-20 max-w-xs hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  100%
                </div>
                <div>
                  <p className="text-sm text-slate-500">Focus</p>
                  <p className="font-bold text-slate-900">Solo Acquirente</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Servizi di consulenza immobiliare dedicati all’acquirente
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Il mercato immobiliare è complesso e pieno di insidie, specialmente quando si acquista direttamente da un privato senza intermediari.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              La mia consulenza è pensata per chi compra: non ho immobili da venderti, non ho fretta di chiudere l'affare. Il mio unico obiettivo è analizzare la casa che ti piace e dirti se è un affare sicuro o un rischio da evitare.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Verifiche preventive prima di versare caparre",
                "Analisi imparziale dello stato dell'immobile",
                "Nessun legame con il venditore"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button href="/consulenza-acquisto">Scopri la consulenza di acquisto</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
