import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BuyingPage } from './pages/BuyingPage';
import { SellingPage } from './pages/SellingPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import {
  BuyingDocumentsPage,
  BuyingMarketValuePage,
  BuyingOfferSupportPage,
  BuyingPreliminaryPage,
  BuyingLegalChecksPage,
  BuyingRogitoPage
} from './pages/BuyingServiceDetails';
import {
  SellingMarketReportPage,
  SellingCasaOkPage,
  SellingMediaAiPage,
  SellingMarketingPage,
  SellingPrequalificaPage,
  SellingContrattualisticaPage
} from './pages/SellingServiceDetails';

type RouteConfig = {
  path: string;
  label: string;
  title: string;
  description: string;
  component: React.ReactElement;
  schema: Record<string, unknown>;
  showInNav?: boolean;
};

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Pagina non trovata</h1>
        <p className="text-lg text-slate-600">La pagina richiesta non è disponibile.</p>
      </div>
    </div>
  );
};

function App() {
  const routes: RouteConfig[] = useMemo(
    () => [
      {
        path: '/',
        label: 'Home',
        title: 'Consulente Immobiliare Indipendente',
        description: 'Consulenza indipendente per acquistare o vendere casa con sicurezza.',
        component: <HomePage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Consulente Immobiliare Indipendente',
          url: window.location.origin
        }
      },
      {
        path: '/consulenza-acquisto',
        label: 'Consulenza Acquisto',
        title: 'Consulenza Acquisto | Consulente Indipendente',
        description: 'Supporto completo per acquistare casa da privati senza rischi.',
        component: <BuyingPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Consulenza Acquisto',
          serviceType: 'Consulenza immobiliare per acquisto',
          areaServed: 'Italia'
        }
      },
      {
        path: '/consulenza-acquisto/verifiche-documenti',
        label: 'Verifiche documenti',
        title: "Verifiche Documenti Immobile | Consulenza Acquisto",
        description: "Analisi documentale e conformità dell'immobile per acquistare in sicurezza.",
        component: <BuyingDocumentsPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: "Verifiche documenti dell'immobile",
          serviceType: 'Consulenza tecnica e documentale per acquisto',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-acquisto/valutazione-prezzo',
        label: 'Valutazione prezzo',
        title: "Valutazione Prezzo di Mercato | Consulenza Acquisto",
        description: 'Valutazione indipendente del prezzo di mercato per offerte consapevoli.',
        component: <BuyingMarketValuePage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Valutazione del prezzo di mercato',
          serviceType: 'Valutazione immobiliare indipendente',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-acquisto/trattativa-offerta',
        label: 'Trattativa e offerta',
        title: "Trattativa e Offerta | Consulenza Acquisto",
        description: "Supporto alla trattativa e alla proposta d'acquisto con clausole di tutela.",
        component: <BuyingOfferSupportPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Supporto nella trattativa e formulazione offerta',
          serviceType: "Supporto negoziale per l'acquisto",
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-acquisto/contratto-preliminare',
        label: 'Contratto preliminare',
        title: "Contratto Preliminare | Consulenza Acquisto",
        description: 'Stesura e revisione del preliminare per una compravendita sicura.',
        component: <BuyingPreliminaryPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Stesura del contratto preliminare',
          serviceType: 'Supporto contrattuale per acquisto',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-acquisto/visure-ipotecarie',
        label: 'Visure ipotecarie',
        title: "Visure Ipotecarie | Consulenza Acquisto",
        description: 'Controlli legali su ipoteche e vincoli prima dell’acquisto.',
        component: <BuyingLegalChecksPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Visure ipotecarie e controlli legali',
          serviceType: 'Controlli legali per acquisto',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-acquisto/rogito',
        label: 'Rogito',
        title: "Accompagnamento al Rogito | Consulenza Acquisto",
        description: 'Assistenza completa fino alla firma dal notaio.',
        component: <BuyingRogitoPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Accompagnamento al rogito',
          serviceType: 'Assistenza al rogito notarile',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita',
        label: 'Consulenza Vendita',
        title: 'Consulenza Vendita | Consulente Indipendente',
        description: 'Vendita strategica con analisi di mercato e marketing mirato.',
        component: <SellingPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Consulenza Vendita',
          serviceType: 'Consulenza immobiliare per vendita',
          areaServed: 'Italia'
        }
      },
      {
        path: '/consulenza-vendita/report-valutazione-immobile',
        label: 'Report Valutazione Immobile',
        title: 'Report Valutazione Immobile | Consulenza Vendita',
        description: 'Report di analisi mercato immobiliare per impostare il prezzo corretto.',
        component: <SellingMarketReportPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Report Valutazione Immobile',
          serviceType: 'Valutazione immobiliare per vendita',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita/fascicolo-tecnico-casa-ok',
        label: 'Fascicolo tecnico CASA OK',
        title: 'Fascicolo tecnico CASA OK | Consulenza Vendita',
        description: 'Fascicolo tecnico completo per vendere senza rischi.',
        component: <SellingCasaOkPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Fascicolo tecnico CASA OK',
          serviceType: 'Verifica tecnica per vendita',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita/foto-video-ai',
        label: 'Foto Video AI',
        title: 'Servizio Foto Video AI | Consulenza Vendita',
        description: 'Foto professionali, virtual tour e home staging AI.',
        component: <SellingMediaAiPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Servizio Foto, Video & AI',
          serviceType: 'Servizi media per vendita immobiliare',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita/pubblicita-marketing',
        label: 'Pubblicità e Marketing',
        title: 'Pubblicità & Marketing | Consulenza Vendita',
        description: 'Campagne multicanale per aumentare la visibilità.',
        component: <SellingMarketingPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Pubblicità & Marketing',
          serviceType: 'Marketing immobiliare per vendita',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita/prequalifica-acquirenti',
        label: 'Prequalifica acquirenti',
        title: 'Prequalifica Acquirenti | Consulenza Vendita',
        description: 'Selezione dei contatti realmente interessati.',
        component: <SellingPrequalificaPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Prequalifica acquirenti',
          serviceType: 'Selezione acquirenti per vendita',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita/trattative-contrattualistica',
        label: 'Trattative e Contratti',
        title: 'Trattative & Contrattualistica | Consulenza Vendita',
        description: 'Gestione completa della trattativa fino al rogito.',
        component: <SellingContrattualisticaPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Trattative & Contrattualistica',
          serviceType: 'Supporto contrattuale per vendita',
          areaServed: 'Italia'
        },
        showInNav: false
      },
      {
        path: '/progetti',
        label: 'Progetti',
        title: 'Progetti | Consulente Indipendente',
        description: 'Casi reali di acquisto, vendita e investimento immobiliare.',
        component: <ProjectsPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Progetti'
        }
      },
      {
        path: '/chi-siamo',
        label: 'Chi Siamo',
        title: 'Chi Siamo | Consulente Indipendente',
        description: 'Team indipendente con competenze tecniche, legali e strategiche.',
        component: <AboutPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Chi Siamo'
        }
      },
      {
        path: '/blog',
        label: 'Blog',
        title: 'Blog | Consulente Indipendente',
        description: 'Guide, consigli e aggiornamenti sul mercato immobiliare.',
        component: <BlogPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog'
        }
      },
      {
        path: '/contatti',
        label: 'Contatti',
        title: 'Contatti | Consulente Indipendente',
        description: 'Richiedi una consulenza immobiliare personalizzata.',
        component: <ContactPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contatti'
        }
      }
    ],
    []
  );

  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === currentPath) {
      return;
    }
    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeRoute = routes.find((route) => route.path === currentPath);
  const page = activeRoute?.component ?? <NotFoundPage />;

  useEffect(() => {
    const title = activeRoute?.title || 'Consulente Immobiliare Indipendente';
    const description = activeRoute?.description || 'Consulenza immobiliare indipendente.';
    document.title = title;

    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.content = description;
    }

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = title;
    }

    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.content = description;
    }

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.content = `${window.location.origin}${currentPath}`;
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${window.location.origin}${currentPath}`;
    }

    const schemaScript = document.getElementById('schema-jsonld');
    if (schemaScript && activeRoute?.schema) {
      schemaScript.textContent = JSON.stringify(activeRoute.schema);
    }
  }, [activeRoute, currentPath]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900">
      <header>
        <Navbar routes={routes} currentPath={currentPath} onNavigate={navigate} />
      </header>
      <main>
        {page}
      </main>
      <Footer routes={routes} currentPath={currentPath} onNavigate={navigate} />
    </div>
  );
}

export default App;
