import React from 'react';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

type FooterRoute = {
  path: string;
  label: string;
  showInNav?: boolean;
};

type FooterProps = {
  routes: FooterRoute[];
  currentPath: string;
  onNavigate: (path: string) => void;
};

export const Footer: React.FC<FooterProps> = ({ routes, currentPath, onNavigate }) => {
  const footerRoutes = routes.filter((route) => route.path !== '/' && route.showInNav !== false);

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-6">
                <Shield className="text-brand-500" />
                <span>Francesco Coppola</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Consulente immobiliare indipendente a Reggio Emilia e provincia. Ti affianco in ogni fase della compravendita con competenza tecnica, giuridica e negoziale. Disponibile in tutta l'Emilia.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Servizi</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/consulenza-acquisto/verifiche-documenti" className="hover:text-brand-400 transition-colors">Analisi Documentale</a></li>
              <li><a href="/consulenza-acquisto/valutazione-prezzo" className="hover:text-brand-400 transition-colors">Valutazione Immobiliare</a></li>
              <li><a href="/consulenza-acquisto/trattativa-offerta" className="hover:text-brand-400 transition-colors">Supporto Trattativa</a></li>
              <li><a href="/consulenza-acquisto/rogito" className="hover:text-brand-400 transition-colors">Assistenza al Rogito</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Risorse</h4>
            <ul className="space-y-3 text-sm">
              {footerRoutes.map((route) => (
                <li key={route.path}>
                  <a
                    href={route.path}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(route.path);
                    }}
                    aria-current={currentPath === route.path ? 'page' : undefined}
                    className={`transition-colors ${
                      currentPath === route.path ? 'text-brand-400' : 'hover:text-brand-400'
                    }`}
                  >
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contatti</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-500" />
                <span>info@consulenteindipendente.it</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-500" />
                <span>+39 0522 123456</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-500" />
                <span>Reggio Emilia, Via Emilia San Pietro</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2025 Francesco Coppola - Consulente Immobiliare Indipendente. P.IVA 00000000000</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
