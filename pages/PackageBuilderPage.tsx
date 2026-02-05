import React, { useEffect, useMemo, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';

type PackageService = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Acquisto' | 'Vendita';
};

type DraftState = {
  selected: string[];
  form: {
    name: string;
    email: string;
    phone: string;
    notes: string;
    delivery: 'email' | 'contatto';
  };
};

const leadEndpoint = (import.meta as any).env?.VITE_LEAD_ENDPOINT || '';

const services: PackageService[] = [
  {
    id: 'buy-docs',
    title: "Verifiche documenti dell'immobile",
    description: "Analisi planimetrie, visure e conformità urbanistica e catastale.",
    price: 290,
    category: 'Acquisto'
  },
  {
    id: 'buy-price',
    title: 'Valutazione del prezzo di mercato',
    description: 'Studio comparabili reali e trend di zona per il prezzo corretto.',
    price: 190,
    category: 'Acquisto'
  },
  {
    id: 'buy-offer',
    title: 'Supporto nella trattativa e formulazione offerta',
    description: 'Strategia e clausole di tutela nella proposta di acquisto.',
    price: 390,
    category: 'Acquisto'
  },
  {
    id: 'buy-prelim',
    title: 'Stesura del contratto preliminare',
    description: 'Redazione o revisione del preliminare per chiarezza e sicurezza.',
    price: 350,
    category: 'Acquisto'
  },
  {
    id: 'buy-legal',
    title: 'Visure ipotecarie e controlli legali',
    description: 'Controllo ipoteche, pignoramenti e vincoli prima dell’acquisto.',
    price: 240,
    category: 'Acquisto'
  },
  {
    id: 'buy-rogito',
    title: 'Accompagnamento al rogito',
    description: 'Assistenza completa fino alla firma dal notaio.',
    price: 290,
    category: 'Acquisto'
  },
  {
    id: 'sell-report',
    title: 'Report valutazione immobile',
    description: 'Analisi mercato e posizionamento prezzo per la vendita.',
    price: 320,
    category: 'Vendita'
  },
  {
    id: 'sell-casaok',
    title: 'Fascicolo tecnico CASA OK',
    description: 'Fascicolo tecnico completo per conformità e commerciabilità.',
    price: 420,
    category: 'Vendita'
  },
  {
    id: 'sell-media',
    title: 'Servizio Foto, Video & AI',
    description: 'Shooting professionale, virtual tour e home staging AI.',
    price: 350,
    category: 'Vendita'
  },
  {
    id: 'sell-marketing',
    title: 'Pubblicità & Marketing',
    description: 'Campagne multicanale e distribuzione sui portali.',
    price: 390,
    category: 'Vendita'
  },
  {
    id: 'sell-prequalifica',
    title: 'Prequalifica acquirenti',
    description: 'Selezione contatti realmente interessati e solvibili.',
    price: 240,
    category: 'Vendita'
  },
  {
    id: 'sell-contratti',
    title: 'Trattative & Contrattualistica',
    description: 'Gestione completa della trattativa fino al rogito.',
    price: 480,
    category: 'Vendita'
  }
];

const generatePackageId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `PKG-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};

const submitPackage = async (payload: Record<string, unknown>) => {
  if (!leadEndpoint) {
    const existing = JSON.parse(localStorage.getItem('package-submissions') || '[]');
    existing.push({ ...payload, createdAt: new Date().toISOString() });
    localStorage.setItem('package-submissions', JSON.stringify(existing));
    return;
  }
  const response = await fetch(leadEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Richiesta non riuscita');
  }
};

export const PackageBuilderPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    delivery: 'email' as 'email' | 'contatto'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorText, setErrorText] = useState('');
  const [packageId, setPackageId] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('package-builder-draft');
    if (stored) {
      const parsed = JSON.parse(stored) as DraftState;
      setSelected(parsed.selected || []);
      setForm(parsed.form || form);
    }
  }, []);

  useEffect(() => {
    const draft: DraftState = { selected, form };
    localStorage.setItem('package-builder-draft', JSON.stringify(draft));
  }, [selected, form]);

  const toggleService = (serviceId: string) => {
    setSelected((prev) => (prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]));
  };

  const selectedServices = useMemo(
    () => services.filter((service) => selected.includes(service.id)),
    [selected]
  );

  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) {
      setStatus('error');
      setErrorText('Inserisci nome e un contatto valido.');
      return;
    }
    if (form.delivery === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus('error');
      setErrorText('Inserisci un indirizzo email valido.');
      return;
    }
    if (selected.length === 0) {
      setStatus('error');
      setErrorText('Seleziona almeno un servizio.');
      return;
    }
    setStatus('loading');
    setErrorText('');
    const id = generatePackageId();
    try {
      await submitPackage({
        source: 'package-builder',
        packageId: id,
        services: selectedServices,
        total,
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          notes: form.notes.trim(),
          delivery: form.delivery
        }
      });
      setPackageId(id);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorText('Non siamo riusciti a inviare il preventivo. Riprova.');
    }
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-brand-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Crea il tuo pacchetto</h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto">
            Seleziona i servizi che ti servono e ricevi un preventivo personalizzato in pochi minuti.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Seleziona i servizi"
            subtitle="Combina consulenze di acquisto e vendita per costruire il pacchetto ideale."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`bg-slate-50 border rounded-2xl p-4 md:p-6 flex flex-col gap-2 md:gap-4 transition-all duration-300 cursor-pointer ${
                    selected.includes(service.id) ? 'border-brand-600 shadow-lg' : 'border-slate-200 hover:border-brand-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500">{service.category}</span>
                    <input
                      type="checkbox"
                      checked={selected.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="h-4 w-4 accent-brand-600"
                      aria-label={`Seleziona ${service.title}`}
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{service.description}</p>
                  <div className="text-brand-600 font-bold text-base md:text-lg">€ {service.price}</div>
                </label>
              ))}
            </div>

            <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Riepilogo pacchetto</h3>
              {selectedServices.length === 0 ? (
                <p className="text-slate-500">Nessun servizio selezionato.</p>
              ) : (
                <ul className="space-y-3 text-slate-700">
                  {selectedServices.map((service) => (
                    <li key={service.id} className="flex items-start justify-between gap-4">
                      <span className="text-sm">{service.title}</span>
                      <span className="text-sm font-semibold text-slate-900">€ {service.price}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 border-t border-slate-200 pt-4 flex items-center justify-between text-lg font-bold text-slate-900">
                <span>Totale</span>
                <span>€ {total}</span>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Totale aggiornato in tempo reale in base alle selezioni.
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Richiedi il preventivo"
            subtitle="Ricevi il riepilogo via email o contatto diretto."
          />
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pkg-name">
                    Nome e Cognome
                  </label>
                  <input
                    id="pkg-name"
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pkg-email">
                    Email
                  </label>
                  <input
                    id="pkg-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pkg-phone">
                    Telefono
                  </label>
                  <input
                    id="pkg-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pkg-delivery">
                    Metodo di invio
                  </label>
                  <select
                    id="pkg-delivery"
                    value={form.delivery}
                    onChange={(event) => setForm((prev) => ({ ...prev, delivery: event.target.value as 'email' | 'contatto' }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="email">Email</option>
                    <option value="contatto">Contatto diretto</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pkg-notes">
                  Note e dettagli
                </label>
                <textarea
                  id="pkg-notes"
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-600" role="alert">
                  {errorText}
                </p>
              )}
              {status === 'success' && (
                <p className="text-sm text-green-600" role="status">
                  Preventivo inviato correttamente. ID pacchetto: {packageId}
                </p>
              )}
              {status === 'loading' && (
                <p className="text-sm text-slate-500" role="status">
                  Invio in corso...
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="w-full sm:w-auto">
                  Invia preventivo
                </Button>
                <Button
                  type="button"
                  variant="white"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setSelected([]);
                    setForm({ name: '', email: '', phone: '', notes: '', delivery: 'email' });
                    setStatus('idle');
                    setErrorText('');
                    setPackageId('');
                    localStorage.removeItem('package-builder-draft');
                  }}
                >
                  Svuota selezione
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
