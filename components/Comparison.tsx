import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';

export const Comparison: React.FC = () => {
  const comparisonData = [
    {
      label: "Valutazione del Prezzo",
      diy: "Basata sull'emozione o sul prezzo richiesto dal venditore (spesso fuori mercato).",
      pro: "Analisi comparativa di mercato basata sul venduto reale nella zona."
    },
    {
      label: "Controllo Documenti",
      diy: "Verifica superficiale (spesso ci si ferma all'atto notarile precedente).",
      pro: "Check-up completo: visure ipotecarie, catastali e conformità urbanistica."
    },
    {
      label: "Gestione Trattativa",
      diy: "Emotiva e diretta col proprietario, rischio di tensioni o accordi svantaggiosi.",
      pro: "Negoziazione professionale, distaccata e mirata al miglior prezzo."
    },
    {
      label: "Rischi Nascosti",
      diy: "Possibilità di scoprire abusi edilizi o ipoteche solo dopo aver versato la caparra.",
      pro: "Tutela preventiva: niente offerte senza prima aver verificato la 'salute' della casa."
    },
    {
      label: "Burocrazia",
      diy: "Stressante gestione autonoma di notaio, banca e tecnici.",
      pro: "Coordinamento completo fino al rogito, zero stress per te."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Perché affidarsi a un consulente?" 
          subtitle="La differenza tra sperare che vada tutto bene ed avere la certezza di un acquisto sicuro."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          
          {/* Card: Acquisto Fai da Te */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-300"></div>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <AlertTriangle size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-700">Acquisto "Fai da Te"</h3>
                    <p className="text-slate-500 text-sm font-medium">Il rischio di fare tutto da soli</p>
                </div>
            </div>

            <div className="space-y-8">
                {comparisonData.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                        <XCircle className="text-red-400 shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-1 opacity-70">{item.label}</h4>
                            <p className="text-slate-600 leading-relaxed">{item.diy}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Card: Con Consulente */}
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-600 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-600"></div>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 shadow-inner">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">Con Consulente Indipendente</h3>
                    <p className="text-brand-600 text-sm font-bold">La tua tutela al 100%</p>
                </div>
            </div>

            <div className="space-y-8">
                {comparisonData.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1 fill-green-50" size={24} />
                        <div>
                            <h4 className="font-bold text-brand-700 text-sm uppercase tracking-wider mb-1">{item.label}</h4>
                            <p className="text-slate-800 font-medium leading-relaxed">{item.pro}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                <Button fullWidth className="shadow-brand-200">
                    Scegli la sicurezza, prenota una consulenza
                </Button>
                <p className="mt-4 text-xs text-slate-400">
                    Evita errori costosi. Un piccolo investimento oggi per risparmiare migliaia di euro domani.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};