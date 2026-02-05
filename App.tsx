import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BuyingPage } from './pages/BuyingPage';
import { SellingPage } from './pages/SellingPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { PackageBuilderPage } from './pages/PackageBuilderPage';
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
        title: 'Consulente Immobiliare Indipendente Reggio Emilia | Francesco Coppola',
        description: 'Consulente immobiliare indipendente a Reggio Emilia e provincia. Ti affianco nell\'acquisto o vendita casa senza conflitti di interesse. Disponibile in tutta l\'Emilia.',
        component: <HomePage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Francesco Coppola - Consulente Immobiliare Indipendente',
          url: window.location.origin,
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
        }
      },
      {
        path: '/consulenza-acquisto',
        label: 'Consulenza Acquisto',
        title: 'Consulenza Acquisto Casa Reggio Emilia | Supporto Completo',
        description: 'Cerchi casa a Reggio Emilia? Ti assisto nell\'acquisto da privato: verifiche documenti, valutazione prezzo, trattativa e rogito. Nessun conflitto di interesse.',
        component: <BuyingPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Consulenza Acquisto Immobiliare',
          serviceType: 'Consulenza immobiliare per acquisto',
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
        }
      },
      {
        path: '/crea-pacchetto',
        label: 'Crea il tuo pacchetto',
        title: 'Crea il tuo pacchetto | Consulente Indipendente',
        description: 'Configura un pacchetto personalizzato di servizi immobiliari.',
        component: <PackageBuilderPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Configuratore pacchetti personalizzati',
          serviceType: 'Configurazione pacchetto servizi immobiliari',
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
        },
        showInNav: false
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
        },
        showInNav: false
      },
      {
        path: '/consulenza-vendita',
        label: 'Consulenza Vendita',
        title: 'Vendere Casa a Reggio Emilia | Consulenza Vendita Immobiliare',
        description: 'Vuoi vendere casa a Reggio Emilia? Valutazione di mercato, foto professionali, marketing e assistenza fino al rogito. Massimizza il valore del tuo immobile.',
        component: <SellingPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Consulenza Vendita Immobiliare',
          serviceType: 'Consulenza immobiliare per vendita',
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
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
          areaServed: ['Reggio Emilia', 'Emilia-Romagna']
        },
        showInNav: false
      },
      {
        path: '/progetti',
        label: 'Progetti',
        title: 'Progetti e Case Study | Compravendite a Reggio Emilia',
        description: 'Casi reali di acquisto e vendita immobiliare a Reggio Emilia e provincia. Scopri come ho aiutato i miei clienti a concludere la compravendita in sicurezza.',
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
        title: 'Chi Sono | Francesco Coppola Consulente Immobiliare Reggio Emilia',
        description: 'Sono Francesco Coppola, consulente immobiliare indipendente a Reggio Emilia. Competenze tecniche, giuridiche e negoziali al servizio di chi compra o vende casa.',
        component: <AboutPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Chi Sono'
        }
      },
      {
        path: '/blog',
        label: 'Blog',
        title: 'Blog Immobiliare Reggio Emilia | Guide e Consigli',
        description: 'Guide, consigli e aggiornamenti sul mercato immobiliare di Reggio Emilia e provincia. Come comprare e vendere casa in sicurezza.',
        component: <BlogPage />,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog Immobiliare'
        }
      },
      {
        path: '/contatti',
        label: 'Contatti',
        title: 'Contatti | Consulente Immobiliare Reggio Emilia',
        description: 'Contattami per una consulenza immobiliare a Reggio Emilia e provincia. Rispondo entro 24 ore. Disponibile in tutta l\'Emilia per sopralluoghi e assistenza.',
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

  const navigate = useCallback((to: string) => {
    if (to === currentPath) {
      return;
    }
    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a') as HTMLAnchorElement | null;
      if (!link) {
        return;
      }
      if (link.target && link.target !== '_self') {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      if (href.startsWith('#')) {
        return;
      }
      if (!href.startsWith('/')) {
        return;
      }
      event.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [navigate]);

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
