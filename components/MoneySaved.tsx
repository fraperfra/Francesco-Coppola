import React from 'react';
import { SectionHeading } from './SectionHeading';
import { TrendingDown, AlertCircle, Search, Hammer, FileWarning, PiggyBank, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const MoneySaved: React.FC = () => {
  const cases = [
    {
      amount: "€ 32.000",
      label: "Risparmiati",
      title: "Ristrutturazione Nascosta",
      desc: "Analisi tecnica che ha fatto emergere margini di miglioramento per negoziare condizioni più favorevoli.",
      impact: "Spazio immediato per ridurre il prezzo e pianificare interventi con serenità.",
      severity: "Alto valore",
      solution: "Prezzo rinegoziato coprendo integralmente gli interventi necessari.",
      icon: Hammer,
      tag: "Analisi Tecnica"
    },
    {
      amount: "€ 21.500",
      label: "Risparmiati",
      title: "Prezzo Fuori Mercato",
      desc: "Valutazione comparativa che ha evidenziato il reale valore di mercato, creando leva negoziale.",
      impact: "Opportunità concreta di risparmio e acquisto più stabile nel tempo.",
      severity: "Ottimo valore",
      solution: "Accordo chiuso al prezzo corretto, con risparmio immediato.",
      icon: TrendingDown,
      tag: "Trattativa"
    },
    {
      amount: "€ 14.000",
      label: "Risparmiati",
      title: "Difformità Urbanistica",
      desc: "Verifica urbanistica che ha aperto una trattativa più vantaggiosa fin dall’inizio.",
      impact: "Risparmio diretto e percorso di acquisto lineare senza intoppi.",
      severity: "Alto valore",
      solution: "Prezzo ridotto includendo costi di sanatoria e oneri.",
      icon: FileWarning,
      tag: "Burocrazia"
    },
    {
      amount: "€ 45.000",
      label: "Risparmiati",
      title: "Villa con Vincoli",
      desc: "Analisi vincoli che ha chiarito da subito le reali possibilità del progetto.",
      impact: "Scelta consapevole e investimento coerente con gli obiettivi del cliente.",
      severity: "Alto valore",
      solution: "Decisione strategica orientata al massimo beneficio.",
      icon: Search,
      tag: "Tutela Totale"
    },
    {
      amount: "€ 9.800",
      label: "Risparmiati",
      title: "Spese Condominiali",
      desc: "Controllo amministrativo che ha liberato il cliente da costi non necessari.",
      impact: "Risparmio diretto e acquisto senza spese impreviste.",
      severity: "Ottimo valore",
      solution: "Debiti saldati prima del rogito grazie alla verifica preventiva.",
      icon: AlertCircle,
      tag: "Controllo Debiti"
    },
    {
      amount: "€ 28.000",
      label: "Risparmiati",
      title: "Acquisto da Costruttore",
      desc: "Revisione del capitolato che ha portato vantaggi concreti sul prezzo finale.",
      impact: "Maggior valore a parità di budget e finiture superiori.",
      severity: "Ottimo valore",
      solution: "Finiture extra e posto auto inclusi nel prezzo.",
      icon: PiggyBank,
      tag: "Nuove Costruzioni"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Quanto vale la tua sicurezza?" 
          subtitle="Ecco esempi reali di risultati positivi e risparmi ottenuti grazie a una consulenza preventiva."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cases.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:border-brand-200 transition-all duration-300 group flex flex-col relative overflow-hidden">
              <item.icon className="absolute -right-6 -bottom-6 text-brand-100/50 w-32 h-32 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />

              <div className="relative z-10">
                <div className="inline-block bg-white border border-brand-100 rounded-full px-3 py-1 text-xs font-bold text-brand-600 tracking-wide uppercase mb-4 shadow-sm">
                  {item.tag}
                </div>

                <div className="mb-6">
                    <span className="block text-4xl md:text-5xl font-bold text-green-600 tracking-tight mb-1">
                        {item.amount}
                    </span>
                    <span className="text-slate-400 font-medium uppercase text-sm tracking-widest">
                        {item.label}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                    {item.title}
                </h3>
                
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50/90 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-red-700 font-semibold text-sm uppercase tracking-widest">
                      <AlertTriangle size={18} />
                      Criticità rilevata
                    </div>
                    <span className="inline-flex items-center justify-center bg-red-600 text-white px-2.5 py-1 rounded-full" role="img" aria-label="Criticità">
                      <AlertTriangle size={14} className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">Criticità</span>
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mt-3">
                    <span className="font-semibold text-slate-900 block text-xs uppercase mb-1">Problema</span>
                    {item.desc}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed mt-3">
                    <span className="font-semibold text-slate-900 block text-xs uppercase mb-1">Implicazioni</span>
                    {item.impact}
                  </p>
                </div>

                <div className="mt-auto rounded-xl border border-green-300 bg-green-100/90 p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-green-800 font-semibold text-sm uppercase tracking-widest">
                    <CheckCircle2 size={18} />
                    Risultato ottenuto
                  </div>
                  <p className="text-slate-900 text-base font-semibold leading-relaxed mt-3">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
