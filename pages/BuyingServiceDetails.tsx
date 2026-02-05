import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';

type GalleryItem = {
  webp: string;
  jpg: string;
  alt: string;
};

type CaseStudy = {
  title: string;
  metric: string;
  description: string;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  longDescription: string;
  features: string[];
  specs: string[];
  benefits: string[];
  gallery: GalleryItem[];
  caseStudy: CaseStudy;
  testimonials: Testimonial[];
  ctaTitle: string;
  ctaText: string;
  basePrice: number;
  packageDiscountPercent: number;
  addOns: Array<{ label: string; price: number }>;
};

const leadEndpoint = (import.meta as any).env?.VITE_LEAD_ENDPOINT || '';

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

const submitLead = async (payload: Record<string, unknown>) => {
  if (!leadEndpoint) {
    const existing = JSON.parse(localStorage.getItem('lead-requests') || '[]');
    existing.push({ ...payload, createdAt: new Date().toISOString() });
    localStorage.setItem('lead-requests', JSON.stringify(existing));
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

const ServiceContactForm: React.FC<{ serviceName: string }> = ({ serviceName }) => {
  const [status, setStatus] = useState<'idle' | 'error' | 'success' | 'loading'>('idle');
  const [errorText, setErrorText] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) {
      setStatus('error');
      setErrorText('Compila i campi obbligatori.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorText('Inserisci un indirizzo email valido.');
      return;
    }
    setStatus('loading');
    setErrorText('');
    try {
      await submitLead({
        source: 'servizio-acquisto',
        serviceName,
        name,
        email,
        phone: form.phone.trim(),
        message: form.message.trim()
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorText('Non siamo riusciti a inviare la richiesta. Riprova.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Richiedi informazioni</h3>
      <input type="hidden" name="servizio" value={serviceName} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="service-name">
            Nome e Cognome
          </label>
          <input
            id="service-name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="service-email">
            Email
          </label>
          <input
            id="service-email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange('email', event.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="service-phone">
          Telefono
        </label>
        <input
          id="service-phone"
          type="tel"
          value={form.phone}
          onChange={(event) => handleChange('phone', event.target.value)}
          className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="service-message">
          Messaggio
        </label>
        <textarea
          id="service-message"
          value={form.message}
          onChange={(event) => handleChange('message', event.target.value)}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-4" role="alert">
          {errorText}
        </p>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-600 mt-4" role="status">
          Richiesta inviata correttamente. Ti ricontatteremo a breve.
        </p>
      )}
      {status === 'loading' && (
        <p className="text-sm text-slate-500 mt-4" role="status">
          Invio in corso...
        </p>
      )}
      <button type="submit" className="mt-6 bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition">
        Invia richiesta
      </button>
    </form>
  );
};

const ValuationStepsSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'error' | 'success' | 'loading'>('idle');
  const [errorText, setErrorText] = useState('');
  const [form, setForm] = useState({
    address: '',
    surface: '',
    type: '',
    constraints: ''
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.address.trim() || !form.surface.trim() || !form.type.trim()) {
      setStatus('error');
      setErrorText('Compila ubicazione, superficie e tipologia.');
      return;
    }
    if (!/^\d+([,.]\d+)?$/.test(form.surface.trim())) {
      setStatus('error');
      setErrorText('Inserisci una superficie valida in mq.');
      return;
    }
    setStatus('loading');
    setErrorText('');
    try {
      await submitLead({
        source: 'valutazione-immobile',
        address: form.address.trim(),
        surface: form.surface.trim(),
        type: form.type.trim(),
        constraints: form.constraints.trim()
      });
      setStatus('success');
      setForm({ address: '', surface: '', type: '', constraints: '' });
    } catch (error) {
      setStatus('error');
      setErrorText('Non siamo riusciti a inviare i dati. Riprova.');
    }
  };

  return (
    <section className="py-16 bg-white" aria-labelledby="come-valutiamo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="come-valutiamo" className="text-3xl md:text-4xl font-bold mb-4 text-brand-900">
            Come valutiamo il tuo immobile?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600">
            Oltre l'online, la conoscenza del territorio
          </p>
          <div className="mt-4 h-1.5 w-20 bg-brand-600 rounded-full mx-auto"></div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Francesco Coppola - Consulente Immobiliare Indipendente',
              serviceType: 'Valutazione immobiliare',
              areaServed: ['Reggio Emilia', 'Emilia-Romagna']
            })
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="bg-slate-50 rounded-2xl p-8 border border-slate-200 reveal-step" data-reveal>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600">01</span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">24h</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Informazioni preliminari</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Raccogliamo ubicazione, superficie catastale, tipologia e vincoli (urbanistici, paesaggistici, storici) per impostare una base solida.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="valuation-address">
                  Ubicazione precisa
                </label>
                <input
                  id="valuation-address"
                  type="text"
                  value={form.address}
                  onChange={(event) => handleChange('address', event.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="valuation-surface">
                  Superficie catastale (mq)
                </label>
                <input
                  id="valuation-surface"
                  type="text"
                  value={form.surface}
                  onChange={(event) => handleChange('surface', event.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="valuation-type">
                  Tipologia immobile
                </label>
                <input
                  id="valuation-type"
                  type="text"
                  value={form.type}
                  onChange={(event) => handleChange('type', event.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  placeholder="Residenziale, commerciale, agricolo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="valuation-constraints">
                  Vincoli e note
                </label>
                <textarea
                  id="valuation-constraints"
                  value={form.constraints}
                  onChange={(event) => handleChange('constraints', event.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-600" role="alert">
                  {errorText}
                </p>
              )}
              {status === 'success' && (
                <p className="text-sm text-green-600" role="status">
                  Dati inviati correttamente. Ti ricontatteremo a breve.
                </p>
              )}
              {status === 'loading' && (
                <p className="text-sm text-slate-500" role="status">
                  Invio in corso...
                </p>
              )}
              <button type="submit" className="bg-brand-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-brand-700 transition">
                Invia i dati preliminari
              </button>
            </form>
          </article>

          <article className="bg-slate-50 rounded-2xl p-8 border border-slate-200 reveal-step" data-reveal>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600">02</span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">2-3 giorni</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Ispezione immobile</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Checklist completa su struttura, impianti, finiture, materiali critici, accessibilità, esposizione, vista e rumorosità.
            </p>
            <div className="grid grid-cols-1 gap-3 text-slate-700">
              {[
                'Stato manutentivo strutturale e impiantistico',
                'Finiture interne ed esterne',
                'Presenza di amianto o materiali pericolosi',
                'Accessibilità, esposizione solare e rumorosità'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-brand-600"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="valuation-media">
                Carica foto e video
              </label>
              <input
                id="valuation-media"
                type="file"
                multiple
                accept="image/*,video/*"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 bg-white"
              />
            </div>
          </article>

          <article className="bg-slate-50 rounded-2xl p-8 border border-slate-200 reveal-step" data-reveal>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600">03</span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">3-5 giorni</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Analisi di mercato</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Database comparativo con immobili simili entro 2 km in città o 5 km in aree extraurbane, con vendite 12-24 mesi.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Grafico prezzi e tempi di vendita</p>
                <svg viewBox="0 0 320 120" className="w-full h-32" role="img" aria-label="Andamento prezzi e tempi di vendita">
                  <rect x="0" y="0" width="320" height="120" fill="#f8fafc" />
                  <line x1="32" y1="100" x2="304" y2="100" stroke="#e2e8f0" strokeWidth="2" />
                  <line x1="32" y1="20" x2="32" y2="100" stroke="#e2e8f0" strokeWidth="2" />
                  {[42, 82, 122, 162, 202, 242, 282].map((x, idx) => (
                    <rect key={x} x={x} y={90 - idx * 8} width="16" height={10 + idx * 8} fill="#0284c7" rx="4" />
                  ))}
                  <polyline
                    points="40,70 80,64 120,58 160,50 200,54 240,42 280,36"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Heat-map domanda locale</p>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    'bg-brand-50','bg-brand-100','bg-brand-200','bg-brand-100','bg-brand-50','bg-brand-200',
                    'bg-brand-100','bg-brand-200','bg-brand-300','bg-brand-200','bg-brand-100','bg-brand-50',
                    'bg-brand-50','bg-brand-200','bg-brand-300','bg-brand-300','bg-brand-200','bg-brand-50',
                    'bg-brand-100','bg-brand-200','bg-brand-300','bg-brand-200','bg-brand-100','bg-brand-50'
                  ].map((tone, index) => (
                    <div key={index} className={`h-6 rounded ${tone}`} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="bg-slate-50 rounded-2xl p-8 border border-slate-200 reveal-step" data-reveal>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600">04</span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">2 giorni</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Metodo di valutazione</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Applichiamo metodi comparativo, costo di ricostruzione, reddito capitalizzato e residuale in base alla finalità.
            </p>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-slate-700 space-y-2">
              <p>V = (Prezzo medio mq × Superficie) × Coefficiente di zona</p>
              <p>V = (Canone annuo netto / Tasso di capitalizzazione)</p>
              <p>V = (Valore area + Costi ricostruzione) − Deprezzamenti</p>
            </div>
          </article>

          <article className="bg-slate-50 rounded-2xl p-8 border border-slate-200 reveal-step" data-reveal>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600">05</span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">2 giorni</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Analisi dati e calcolo valore</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Utilizziamo ReVal Pro 4.2 e GeoMarket Suite 3.9 con fonti OMI e Agenzia delle Entrate per elaborazioni statistiche.
            </p>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Output software (range di valutazione)</p>
              <div className="flex items-center justify-between text-slate-700">
                <span>€ 2.150/mq</span>
                <span className="font-semibold text-brand-600">€ 2.350/mq</span>
                <span>€ 2.520/mq</span>
              </div>
            </div>
          </article>

          <article className="bg-slate-50 rounded-2xl p-8 border border-slate-200 reveal-step" data-reveal>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600">06</span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">24h</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Consegna Report</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Report completo con executive summary, metodologia, documentazione fotografica, attestazioni e firma digitale.
            </p>
            <ul className="space-y-3 text-slate-700">
              {[
                'Validità stima: 6 mesi',
                'Formati: PDF certificato, stampa bollata, cloud privato',
                'Sezione limitazioni e ipotesi',
                'Documentazione tecnica allegata'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-brand-600"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Prenota la tua valutazione</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Un consulente dedicato ti guida in ogni step, con tempi certi e dati oggettivi.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contatti" className="bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition">
                Prenota valutazione
              </a>
              <a href="#richiedi-info" className="border border-brand-600 text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition">
                Richiedi informazioni
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Testimonianze clienti</h3>
            <div className="space-y-4 text-slate-600">
              <div className="border-l-4 border-brand-600 pl-4">
                “Valutazione precisa e spiegata con grande chiarezza.”
                <p className="text-sm text-slate-500 mt-2">Giulia P. — Venditrice</p>
              </div>
              <div className="border-l-4 border-brand-600 pl-4">
                “Report dettagliato che ci ha aiutati a negoziare con sicurezza.”
                <p className="text-sm text-slate-500 mt-2">Andrea M. — Acquirente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicePricingSection: React.FC<{ service: ServiceDetail }> = ({ service }) => {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({});
  const addOnsTotal = service.addOns.reduce((sum, addOn) => sum + (selectedAddOns[addOn.label] ? addOn.price : 0), 0);
  const baseTotal = service.basePrice + addOnsTotal;
  const packageTotal = Math.round(baseTotal * (1 - service.packageDiscountPercent / 100));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Prezzi e opzioni" subtitle="Configura il servizio e confronta le soluzioni disponibili." />
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500">Prezzo base</p>
                <p className="text-3xl font-bold text-slate-900">€ {service.basePrice}</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                Disponibile
              </span>
            </div>
            <div className="space-y-4">
              {service.addOns.map((addOn) => (
                <label key={addOn.label} className="flex items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-4">
                  <span className="text-slate-700 font-medium">{addOn.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-600">€ {addOn.price}</span>
                    <input
                      type="checkbox"
                      checked={Boolean(selectedAddOns[addOn.label])}
                      onChange={(event) =>
                        setSelectedAddOns((prev) => ({ ...prev, [addOn.label]: event.target.checked }))
                      }
                      className="h-4 w-4 accent-brand-600"
                      aria-label={`Aggiungi ${addOn.label}`}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Riepilogo prezzi</h3>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center justify-between">
                <span>Totale singolo servizio</span>
                <span className="font-semibold text-slate-900">€ {baseTotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sconto pacchetto</span>
                <span className="font-semibold text-emerald-600">-{service.packageDiscountPercent}%</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span>Totale nel pacchetto</span>
                <span className="font-bold text-brand-600">€ {packageTotal}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => trackEvent('purchase_single', service.title)}
                className="bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition"
              >
                Acquista singolo
              </button>
              <button
                type="button"
                onClick={() => trackEvent('add_to_package', service.title)}
                className="border border-brand-600 text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition"
              >
                Aggiungi al pacchetto
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const createServicePage = (service: ServiceDetail) => {
  const Component: React.FC = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
      if (!elements.length) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }, [service.slug]);

    return (
      <div className="animate-fade-in">
        <style>
          {`.reveal-step{opacity:0;transform:translateY(24px);transition:all .6s ease} .reveal-step.reveal-visible{opacity:1;transform:translateY(0)}`}
        </style>
        <section className="bg-brand-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-brand-100 mb-6" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="hover:text-white">Home</a>
                </li>
                <li>/</li>
                <li>
                  <a href="/consulenza-acquisto" className="hover:text-white">Consulenza Acquisto</a>
                </li>
                <li>/</li>
                <li aria-current="page" className="text-white font-semibold">
                  {service.title}
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-brand-100 max-w-3xl">{service.summary}</p>
          </div>
        </section>

        <section className="py-16 bg-white" itemScope itemType="https://schema.org/Service">
          <div className="container mx-auto px-4">
            <meta itemProp="name" content={service.title} />
            <meta itemProp="description" content={service.summary} />
            <SectionHeading title="Descrizione del servizio" subtitle="Panoramica completa e punti chiave." />
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
              <div>
                <p className="text-slate-600 leading-relaxed mb-6">{service.longDescription}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-2 w-2 h-2 rounded-full bg-brand-600"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Specifiche tecniche e requisiti</h3>
                <ul className="space-y-3 text-slate-700">
                  {service.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-brand-600"></span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {service.slug === 'valutazione-prezzo' && <ValuationStepsSection />}

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <SectionHeading title="Benefici e vantaggi" subtitle="Perché questo servizio fa la differenza." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="w-2.5 h-2.5 mt-2 rounded-full bg-brand-600"></span>
                  <p className="text-slate-700 text-lg leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ServicePricingSection service={service} />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeading title="Gallery esempi" subtitle="Alcune immagini illustrative del servizio." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.gallery.map((item) => (
                <picture key={item.alt} className="block overflow-hidden rounded-2xl border border-slate-100">
                  <source type="image/webp" srcSet={item.webp} />
                  <img src={item.jpg} alt={item.alt} width={400} height={300} loading="lazy" className="w-full h-[300px] object-cover" />
                </picture>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <SectionHeading title="Case study" subtitle="Risultati concreti ottenuti sul territorio." />
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="text-4xl font-bold text-brand-600">{service.caseStudy.metric}</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.caseStudy.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.caseStudy.description}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {service.testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-slate-600 leading-relaxed mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" id="richiedi-info">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.ctaTitle}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{service.ctaText}</p>
              <a href="/contatti" className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors">
                Prenota una consulenza
              </a>
            </div>
            <ServiceContactForm serviceName={service.title} />
          </div>
        </section>
      </div>
    );
  };
  return Component;
};

const services: ServiceDetail[] = [
  {
    slug: 'verifiche-documenti',
    title: "Verifiche documenti dell'immobile",
    summary: 'Analisi completa della documentazione per acquistare con sicurezza.',
    longDescription: "Valutiamo ogni documento tecnico e urbanistico per verificare la piena conformità dell’immobile. Il nostro obiettivo è prevenire rischi, ritardi sul mutuo e trattative sbilanciate, così da arrivare all’acquisto con dati certi e decisioni consapevoli.",
    features: [
      'Analisi visure catastali e planimetrie aggiornate',
      'Verifica conformità urbanistica e catastale',
      'Accesso agli atti comunali e titoli edilizi',
      'Report finale con criticità e azioni correttive'
    ],
    specs: [
      'Documenti richiesti: planimetrie, visure, titoli edilizi, APE',
      'Tempi medi: 5-7 giorni lavorativi',
      'Output: report tecnico con checklist di conformità'
    ],
    benefits: [
      'Riduzione dei rischi legali e tecnici',
      'Maggiore forza negoziale sul prezzo',
      'Prevenzione di blocchi in fase di mutuo',
      'Decisioni rapide con dati affidabili'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Analisi documentale'
      },
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Verifica planimetrie'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Controllo conformità'
      }
    ],
    caseStudy: {
      title: 'Veranda non conforme individuata',
      metric: '−€14.000',
      description: 'Riduzione del prezzo ottenuta grazie alla verifica preventiva della documentazione.'
    },
    testimonials: [
      {
        name: 'Marco e Giulia',
        role: 'Prima casa',
        quote: 'Abbiamo evitato un acquisto rischioso grazie al report dettagliato.'
      },
      {
        name: 'Elena M.',
        role: 'Acquirente',
        quote: 'Documenti chiari e tempi rapidi: tutto sotto controllo.'
      }
    ],
    ctaTitle: 'Vuoi sapere se l’immobile è davvero conforme?',
    ctaText: 'Richiedi una verifica completa: controlliamo ogni documento prima della tua offerta.',
    basePrice: 290,
    packageDiscountPercent: 20,
    addOns: [
      { label: 'Urgenza 48h', price: 90 },
      { label: 'Seconda verifica tecnico-legale', price: 120 },
      { label: 'Call di allineamento con notaio', price: 60 }
    ]
  },
  {
    slug: 'valutazione-prezzo',
    title: 'Valutazione del prezzo di mercato',
    summary: 'Determinazione oggettiva del valore reale dell’immobile.',
    longDescription: "Analizziamo dati di mercato, comparabili reali e trend locali per stabilire il prezzo corretto. La valutazione ti aiuta a evitare sovrapprezzi e a formulare un’offerta equilibrata e credibile.",
    features: [
      'Analisi comparativa con immobili simili venduti in zona',
      'Studio della domanda locale e del trend dei prezzi',
      'Individuazione del range di valore più realistico',
      'Report con raccomandazioni per l’offerta'
    ],
    specs: [
      'Raccolta dati comparabili: 10-20 immobili',
      'Sopralluogo tecnico con checklist dedicata',
      'Output: report con range di prezzo e strategia'
    ],
    benefits: [
      'Evitare sovrapprezzi',
      'Maggiore potere negoziale',
      'Offerte più solide e credibili',
      'Decisioni rapide con dati verificati'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Analisi di mercato'
      },
      {
        webp: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Valutazione comparativa'
      },
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Report prezzo'
      }
    ],
    caseStudy: {
      title: 'Riduzione prezzo grazie a comparabili reali',
      metric: '−7%',
      description: 'Offerta accettata perché supportata da analisi di mercato indipendente.'
    },
    testimonials: [
      {
        name: 'Roberto S.',
        role: 'Investitore',
        quote: 'Valutazione chiara e concreta: ho risparmiato tempo e soldi.'
      },
      {
        name: 'Sara L.',
        role: 'Acquirente',
        quote: 'Il report ci ha dato la sicurezza di fare l’offerta giusta.'
      }
    ],
    ctaTitle: 'Vuoi conoscere il valore reale della casa?',
    ctaText: 'Richiedi una valutazione indipendente prima di fare un’offerta.',
    basePrice: 190,
    packageDiscountPercent: 18,
    addOns: [
      { label: 'Report express in 24h', price: 80 },
      { label: 'Analisi comparabili extra', price: 70 },
      { label: 'Video call di restituzione', price: 50 }
    ]
  },
  {
    slug: 'trattativa-offerta',
    title: 'Supporto nella trattativa e formulazione offerta',
    summary: 'Strategia negoziale e proposta d’acquisto su misura.',
    longDescription: "Costruiamo una trattativa basata su dati e clausole di tutela. Ti supportiamo nella formulazione dell’offerta, nella gestione dei tempi e nella negoziazione con il venditore.",
    features: [
      'Analisi dei margini di trattativa',
      'Proposta d’acquisto con clausole di tutela',
      'Gestione controproposte e tempi di risposta',
      'Assistenza fino all’accettazione'
    ],
    specs: [
      'Bozza proposta personalizzata',
      'Clausole sospensive e verifiche incluse',
      'Timeline negoziale condivisa'
    ],
    benefits: [
      'Tutela dei tuoi interessi',
      'Riduzione del prezzo finale',
      'Maggior controllo delle condizioni',
      'Processo più rapido e ordinato'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Trattativa immobiliare'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Proposta d’acquisto'
      },
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Negoziazione'
      }
    ],
    caseStudy: {
      title: 'Trattativa gestita con clausole sospensive',
      metric: '−€21.500',
      description: 'Riduzione del prezzo con condizioni di tutela per l’acquirente.'
    },
    testimonials: [
      {
        name: 'Luca e Sara',
        role: 'Coppia',
        quote: 'La proposta è stata costruita al millimetro, senza sorprese.'
      },
      {
        name: 'Chiara P.',
        role: 'Acquirente',
        quote: 'Supporto costante durante tutta la trattativa.'
      }
    ],
    ctaTitle: 'Vuoi una proposta che tuteli davvero i tuoi interessi?',
    ctaText: 'Prepariamo l’offerta più efficace per ottenere condizioni favorevoli.',
    basePrice: 390,
    packageDiscountPercent: 22,
    addOns: [
      { label: 'Seconda proposta alternativa', price: 90 },
      { label: 'Presenza in trattativa finale', price: 120 },
      { label: 'Verifica clausole sospensive', price: 70 }
    ]
  },
  {
    slug: 'contratto-preliminare',
    title: 'Stesura del contratto preliminare',
    summary: 'Preliminare chiaro, completo e senza ambiguità.',
    longDescription: "Redigiamo o analizziamo il contratto preliminare per garantire chiarezza su tempi, caparre e condizioni. Coordiniamo le parti per evitare errori che possano rallentare o compromettere l’acquisto.",
    features: [
      'Verifica clausole e condizioni economiche',
      'Controllo tempi e scadenze contrattuali',
      'Coordinamento con notaio e parti coinvolte',
      'Revisione caparre e garanzie'
    ],
    specs: [
      'Documentazione necessaria: proposta, accordi, visure',
      'Revisione giuridica con check di coerenza',
      'Output: contratto preliminare revisionato'
    ],
    benefits: [
      'Maggiore chiarezza contrattuale',
      'Riduzione rischi di contenzioso',
      'Protezione economica della caparra',
      'Percorso più lineare verso il rogito'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Contratto preliminare'
      },
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Firma preliminare'
      },
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Revisione clausole'
      }
    ],
    caseStudy: {
      title: 'Preliminare senza ambiguità',
      metric: '0 contenziosi',
      description: 'Tutte le condizioni sono state definite con chiarezza prima della firma.'
    },
    testimonials: [
      {
        name: 'Paolo R.',
        role: 'Acquirente',
        quote: 'Finalmente un preliminare semplice e comprensibile.'
      },
      {
        name: 'Martina L.',
        role: 'Prima casa',
        quote: 'Siamo arrivati al rogito tranquilli e informati.'
      }
    ],
    ctaTitle: 'Vuoi un preliminare chiaro e sicuro?',
    ctaText: 'Ti supportiamo per evitare clausole poco trasparenti.',
    basePrice: 350,
    packageDiscountPercent: 20,
    addOns: [
      { label: 'Revisione clausole entro 24h', price: 80 },
      { label: 'Check documentale aggiuntivo', price: 60 },
      { label: 'Coordinamento con notaio', price: 90 }
    ]
  },
  {
    slug: 'visure-ipotecarie',
    title: 'Visure ipotecarie e controlli legali',
    summary: 'Controlli legali per evitare vincoli e sorprese.',
    longDescription: "Verifichiamo la presenza di ipoteche, pignoramenti e gravami sull’immobile. Questo passaggio tutela l’acquirente e previene blocchi in fase di atto notarile.",
    features: [
      'Visure ipotecarie aggiornate',
      'Analisi gravami e vincoli',
      'Verifica pignoramenti e trascrizioni',
      'Report con azioni correttive suggerite'
    ],
    specs: [
      'Richiesta di visure presso conservatoria',
      'Analisi legale dei vincoli rilevati',
      'Output: report con stato dei gravami'
    ],
    benefits: [
      'Acquisto più sicuro e trasparente',
      'Riduzione dei rischi legali',
      'Tutela economica dell’acquirente',
      'Atto notarile senza sorprese'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Visure ipotecarie'
      },
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Analisi legale'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Controlli legali'
      }
    ],
    caseStudy: {
      title: 'Vincolo ipotecario risolto prima del rogito',
      metric: '−€9.800',
      description: 'Il venditore ha saldato il debito prima dell’atto grazie alla verifica preventiva.'
    },
    testimonials: [
      {
        name: 'Federica N.',
        role: 'Acquirente',
        quote: 'Sapere che tutto era libero da vincoli è stato decisivo.'
      },
      {
        name: 'Giorgio M.',
        role: 'Cliente',
        quote: 'Controllo legale completo e spiegazioni chiare.'
      }
    ],
    ctaTitle: 'Vuoi verificare i vincoli prima di acquistare?',
    ctaText: 'Richiedi un controllo legale completo sull’immobile.',
    basePrice: 240,
    packageDiscountPercent: 18,
    addOns: [
      { label: 'Verifica gravami storici', price: 70 },
      { label: 'Relazione legale dettagliata', price: 90 },
      { label: 'Confronto con tecnico esterno', price: 60 }
    ]
  },
  {
    slug: 'rogito',
    title: 'Accompagnamento al rogito',
    summary: 'Assistenza completa fino alla firma dal notaio.',
    longDescription: "Ti affianchiamo nella fase finale con una checklist completa dei documenti, coordinando le parti e assicurando che ogni passaggio sia chiaro e conforme.",
    features: [
      'Checklist documentale finale',
      'Coordinamento con notaio e venditore',
      'Verifica pagamenti e tempi di consegna',
      'Assistenza in presenza al rogito'
    ],
    specs: [
      'Raccolta documenti finali e certificazioni',
      'Verifica conformità a capitolati e accordi',
      'Output: check finale pre-rogito'
    ],
    benefits: [
      'Firma senza imprevisti',
      'Controllo completo della documentazione',
      'Tutela dell’acquirente fino alla consegna',
      'Massima serenità al momento della firma'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Rogito notarile'
      },
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Assistenza al rogito'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Firma dal notaio'
      }
    ],
    caseStudy: {
      title: 'Consegna e firma senza ritardi',
      metric: '0 ritardi',
      description: 'Tutti i documenti pronti prima della data di rogito.'
    },
    testimonials: [
      {
        name: 'Valeria P.',
        role: 'Acquirente',
        quote: 'Arrivati al rogito con tutto organizzato e chiaro.'
      },
      {
        name: 'Davide C.',
        role: 'Prima casa',
        quote: 'Presenza fondamentale nel momento più importante.'
      }
    ],
    ctaTitle: 'Vuoi arrivare al rogito senza dubbi?',
    ctaText: 'Ti seguiamo fino alla firma con controllo totale dei documenti.',
    basePrice: 290,
    packageDiscountPercent: 20,
    addOns: [
      { label: 'Checklist finale certificata', price: 60 },
      { label: 'Presenza tecnica in firma', price: 120 },
      { label: 'Assistenza post-rogito', price: 80 }
    ]
  }
];

export const BuyingDocumentsPage = createServicePage(services[0]);
export const BuyingMarketValuePage = createServicePage(services[1]);
export const BuyingOfferSupportPage = createServicePage(services[2]);
export const BuyingPreliminaryPage = createServicePage(services[3]);
export const BuyingLegalChecksPage = createServicePage(services[4]);
export const BuyingRogitoPage = createServicePage(services[5]);
