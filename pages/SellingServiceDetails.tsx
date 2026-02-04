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
        source: 'servizio-vendita',
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
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="selling-name">
            Nome e Cognome
          </label>
          <input
            id="selling-name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="selling-email">
            Email
          </label>
          <input
            id="selling-email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange('email', event.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="selling-phone">
          Telefono
        </label>
        <input
          id="selling-phone"
          type="tel"
          value={form.phone}
          onChange={(event) => handleChange('phone', event.target.value)}
          className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="selling-message">
          Messaggio
        </label>
        <textarea
          id="selling-message"
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

    return (
      <div className="pt-20 animate-fade-in">
        <section className="bg-brand-900 text-white py-20">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-brand-100 mb-6" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="hover:text-white">Home</a>
                </li>
                <li>/</li>
                <li>
                  <a href="/consulenza-vendita" className="hover:text-white">Consulenza Vendita</a>
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
        <ServicePricingSection service={service} />

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
    slug: 'report-valutazione-immobile',
    title: 'Report Valutazione Immobile',
    summary: 'Report di analisi mercato immobiliare per una valutazione affidabile.',
    longDescription: "Analizziamo dati tecnici e comparabili reali per stimare con precisione il valore dell’immobile. Questo report ti consente di impostare il prezzo corretto e di ridurre i tempi di vendita.",
    features: [
      'Analisi comparativa con immobili simili venduti in zona',
      'Studio della domanda locale e della fascia prezzo ideale',
      'Report con range di valore e consigli di posizionamento',
      'Allineamento con strategie di marketing e vendita'
    ],
    specs: [
      'Dati comparabili: 10-20 immobili rilevanti',
      'Sopralluogo con checklist tecnica',
      'Output: report dettagliato con strategia di prezzo'
    ],
    benefits: [
      'Prezzo competitivo e realistico',
      'Riduzione dei tempi di vendita',
      'Maggiore credibilità verso gli acquirenti',
      'Decisioni basate su dati oggettivi'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Analisi di mercato'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Valutazione immobiliare'
      },
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Report tecnico'
      }
    ],
    caseStudy: {
      title: 'Valutazione centrata al primo mese',
      metric: '−32 giorni',
      description: 'Immobile venduto in tempi rapidi grazie al prezzo corretto.'
    },
    testimonials: [
      {
        name: 'Paolo G.',
        role: 'Venditore',
        quote: 'Il report ci ha dato subito la direzione giusta.'
      },
      {
        name: 'Anna D.',
        role: 'Venditrice',
        quote: 'Prezzo realistico e vendita senza stress.'
      }
    ],
    ctaTitle: 'Vuoi una valutazione affidabile del tuo immobile?',
    ctaText: 'Richiedi il report di valutazione per impostare il prezzo corretto.',
    basePrice: 320,
    packageDiscountPercent: 20,
    addOns: [
      { label: 'Report express 48h', price: 90 },
      { label: 'Analisi comparabili extra', price: 80 },
      { label: 'Consulenza strategia prezzo', price: 70 }
    ]
  },
  {
    slug: 'fascicolo-tecnico-casa-ok',
    title: 'Fascicolo tecnico CASA OK',
    summary: 'Documentazione completa per vendere senza rischi.',
    longDescription: "Prepariamo un fascicolo completo della documentazione tecnica e di provenienza, così l’immobile risulta conforme e vendibile senza blocchi o richieste last minute.",
    features: [
      'Raccolta documenti tecnici e catastali',
      'Verifica conformità urbanistica e impiantistica',
      'Controllo provenienza e titoli edilizi',
      'Fascicolo digitale pronto per gli acquirenti'
    ],
    specs: [
      'Documenti richiesti: planimetrie, visure, APE',
      'Tempi medi: 7-10 giorni lavorativi',
      'Output: fascicolo completo e checklist'
    ],
    benefits: [
      'Vendita senza intoppi',
      'Maggiore trasparenza verso l’acquirente',
      'Riduzione dei tempi di trattativa',
      'Tutela contro contestazioni'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Fascicolo tecnico'
      },
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Documentazione completa'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Conformità immobile'
      }
    ],
    caseStudy: {
      title: 'Vendita sbloccata in 48 ore',
      metric: '100% conformità',
      description: 'Documentazione pronta ha accelerato la firma del preliminare.'
    },
    testimonials: [
      {
        name: 'Giorgio M.',
        role: 'Venditore',
        quote: 'Fascicolo impeccabile, trattativa chiusa in pochi giorni.'
      },
      {
        name: 'Lucia R.',
        role: 'Venditrice',
        quote: 'Trasparenza totale con gli acquirenti.'
      }
    ],
    ctaTitle: 'Vuoi un fascicolo tecnico completo?',
    ctaText: 'Prepariamo tutta la documentazione per vendere senza rischi.',
    basePrice: 420,
    packageDiscountPercent: 22,
    addOns: [
      { label: 'Aggiornamento planimetrie', price: 110 },
      { label: 'Verifica impianti avanzata', price: 140 },
      { label: 'Report conformità express', price: 90 }
    ]
  },
  {
    slug: 'foto-video-ai',
    title: 'Servizio Foto, Video & AI',
    summary: 'Immagini professionali e virtual tour per valorizzare l’immobile.',
    longDescription: "Realizziamo fotografie professionali, video e virtual tour per massimizzare la visibilità dell’annuncio. L’AI permette soluzioni di home staging virtuale per aumentare l’attrattività.",
    features: [
      'Shooting fotografico professionale',
      'Video e virtual tour immersivo',
      'Home staging virtuale con AI',
      'Materiale ottimizzato per i portali'
    ],
    specs: [
      'Durata shooting: 1-2 ore',
      'Output: set foto HD + video + tour',
      'Consegna materiali: 3-5 giorni'
    ],
    benefits: [
      'Aumento visite qualificate',
      'Maggior engagement sugli annunci',
      'Percezione premium dell’immobile',
      'Riduzione dei tempi di vendita'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Foto professionali'
      },
      {
        webp: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Virtual tour'
      },
      {
        webp: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Home staging virtuale'
      }
    ],
    caseStudy: {
      title: 'Open house con più visite',
      metric: '+40%',
      description: 'Più richieste grazie a foto e video professionali.'
    },
    testimonials: [
      {
        name: 'Elisa T.',
        role: 'Venditrice',
        quote: 'Le foto hanno fatto la differenza: tante visite qualificate.'
      },
      {
        name: 'Marco B.',
        role: 'Venditore',
        quote: 'Virtual tour impeccabile e home staging realistico.'
      }
    ],
    ctaTitle: 'Vuoi valorizzare la tua casa al massimo?',
    ctaText: 'Prenota il servizio foto e video professionale con AI.',
    basePrice: 350,
    packageDiscountPercent: 18,
    addOns: [
      { label: 'Virtual tour 3D', price: 160 },
      { label: 'Home staging virtuale', price: 130 },
      { label: 'Video reel social', price: 90 }
    ]
  },
  {
    slug: 'pubblicita-marketing',
    title: 'Pubblicità & Marketing',
    summary: 'Campagne multicanale per vendere più velocemente.',
    longDescription: "Distribuiamo l’annuncio sui portali immobiliari principali e attiviamo campagne mirate su social e Google, con marketing locale per raggiungere gli acquirenti giusti.",
    features: [
      'Pubblicazione su portali immobiliari leader',
      'Campagne social e Google mirate',
      'Marketing locale e promozioni dedicate',
      'Monitoraggio performance annunci'
    ],
    specs: [
      'Durata campagne: 30-60 giorni',
      'Report settimanali di performance',
      'Ottimizzazione creatività in corsa'
    ],
    benefits: [
      'Maggiore visibilità online',
      'Più contatti qualificati',
      'Riduzione dei tempi di vendita',
      'Budget ottimizzato'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Marketing digitale'
      },
      {
        webp: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Campagne social'
      },
      {
        webp: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Pubblicità immobiliare'
      }
    ],
    caseStudy: {
      title: 'Campagna social ad alto rendimento',
      metric: '+120 lead',
      description: 'Incremento contatti qualificati in 30 giorni.'
    },
    testimonials: [
      {
        name: 'Giovanni L.',
        role: 'Venditore',
        quote: 'Più visibilità e contatti rispetto a qualsiasi altra agenzia.'
      },
      {
        name: 'Sofia M.',
        role: 'Venditrice',
        quote: 'Campagne mirate davvero efficaci.'
      }
    ],
    ctaTitle: 'Vuoi massimizzare la visibilità del tuo annuncio?',
    ctaText: 'Attiviamo il piano marketing più efficace per il tuo immobile.',
    basePrice: 390,
    packageDiscountPercent: 20,
    addOns: [
      { label: 'Campagna social extra', price: 120 },
      { label: 'Landing dedicata annuncio', price: 140 },
      { label: 'Report performance settimanale', price: 80 }
    ]
  },
  {
    slug: 'prequalifica-acquirenti',
    title: 'Prequalifica acquirenti',
    summary: 'Selezione dei contatti davvero interessati e solvibili.',
    longDescription: "Filtriamo le richieste e qualifichiamo gli acquirenti per evitare visite inutili. Il processo riduce i tempi di vendita e aumenta la qualità delle trattative.",
    features: [
      'Screening delle richieste in ingresso',
      'Verifica capacità finanziaria',
      'Selezione appuntamenti con buyer qualificati',
      'Report di avanzamento periodico'
    ],
    specs: [
      'Questionario di prequalifica',
      'Controllo documentale e creditizio',
      'Aggiornamenti settimanali'
    ],
    benefits: [
      'Meno visite inutili',
      'Trattative più veloci',
      'Miglior qualità dei contatti',
      'Ottimizzazione dei tempi di vendita'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Selezione acquirenti'
      },
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Qualifica contatti'
      },
      {
        webp: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Acquirenti selezionati'
      }
    ],
    caseStudy: {
      title: 'Visite ridotte del 60%',
      metric: '−60%',
      description: 'Solo contatti realmente interessati e con budget adeguato.'
    },
    testimonials: [
      {
        name: 'Laura V.',
        role: 'Venditrice',
        quote: 'Visite più mirate e risultati concreti.'
      },
      {
        name: 'Riccardo F.',
        role: 'Venditore',
        quote: 'Meno perdite di tempo, più efficacia.'
      }
    ],
    ctaTitle: 'Vuoi contatti realmente interessati?',
    ctaText: 'Attiviamo il filtro acquirenti per velocizzare la vendita.',
    basePrice: 240,
    packageDiscountPercent: 18,
    addOns: [
      { label: 'Report finanziario avanzato', price: 110 },
      { label: 'Screening documentale extra', price: 90 },
      { label: 'Aggiornamento settimanale call', price: 60 }
    ]
  },
  {
    slug: 'trattative-contrattualistica',
    title: 'Trattative & Contrattualistica',
    summary: 'Gestione della trattativa fino alla firma dal notaio.',
    longDescription: "Ti affianchiamo in tutte le fasi di trattativa fino al contratto preliminare e alla firma dal notaio, con la massima tutela e trasparenza.",
    features: [
      'Gestione trattative e negoziazione prezzo',
      'Redazione preliminare e accordi',
      'Coordinamento con notaio',
      'Supporto fino al rogito'
    ],
    specs: [
      'Check documentale pre-firma',
      'Cronoprogramma trattativa condiviso',
      'Supporto operativo in presenza'
    ],
    benefits: [
      'Tutela legale completa',
      'Trattative più rapide',
      'Massima chiarezza contrattuale',
      'Acquirenti più sicuri e decisi'
    ],
    gallery: [
      {
        webp: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Trattativa'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Contratto preliminare'
      },
      {
        webp: 'https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=400&h=300&fm=webp&q=80',
        jpg: 'https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Firma dal notaio'
      }
    ],
    caseStudy: {
      title: 'Firma al primo appuntamento',
      metric: '−14 giorni',
      description: 'Trattativa chiusa rapidamente con documenti pronti.'
    },
    testimonials: [
      {
        name: 'Giorgia A.',
        role: 'Venditrice',
        quote: 'Supporto costante e firma rapida.'
      },
      {
        name: 'Alessandro P.',
        role: 'Venditore',
        quote: 'Contratti chiari e trattativa ben gestita.'
      }
    ],
    ctaTitle: 'Vuoi una trattativa seguita in ogni dettaglio?',
    ctaText: 'Ti accompagniamo fino al rogito con la massima tutela.',
    basePrice: 480,
    packageDiscountPercent: 22,
    addOns: [
      { label: 'Presenza in tutte le visite', price: 150 },
      { label: 'Revisione contratti aggiuntiva', price: 120 },
      { label: 'Assistenza post-rogito', price: 90 }
    ]
  }
];

export const SellingMarketReportPage = createServicePage(services[0]);
export const SellingCasaOkPage = createServicePage(services[1]);
export const SellingMediaAiPage = createServicePage(services[2]);
export const SellingMarketingPage = createServicePage(services[3]);
export const SellingPrequalificaPage = createServicePage(services[4]);
export const SellingContrattualisticaPage = createServicePage(services[5]);
