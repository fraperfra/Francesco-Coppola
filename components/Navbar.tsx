import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from './Button';

type NavRoute = {
  path: string;
  label: string;
  showInNav?: boolean;
};

type NavbarProps = {
  routes: NavRoute[];
  currentPath: string;
  onNavigate: (path: string) => void;
};

export const Navbar: React.FC<NavbarProps> = ({ routes, currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryRoutes = routes.filter((route) => route.path !== '/' && route.showInNav !== false);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2 font-bold text-xl"
          aria-label="Vai alla home"
        >
          <Shield className={`${isScrolled ? 'text-brand-600' : 'text-white'}`} fill="currentColor" fillOpacity={0.2} />
          <span className={`${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Consulente<span className={`${isScrolled ? 'text-brand-600' : 'text-brand-300'}`}>Indipendente</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {primaryRoutes.map((route) => {
            const isActive = currentPath === route.path;
            return (
              <a
                key={route.path}
                href={route.path}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(route.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-semibold transition-colors ${
                  isScrolled ? 'text-slate-600' : 'text-white'
                } ${isActive ? 'underline decoration-2 decoration-brand-400 underline-offset-4' : 'hover:underline'}`}
              >
                {route.label}
              </a>
            );
          })}
          <Button
            variant={isScrolled ? 'primary' : 'white'}
            className="text-sm px-5 py-2"
            onClick={() => handleNavigate('/contatti')}
          >
            Prenota Consulenza
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Apri menu"
        >
          {mobileMenuOpen ? (
            <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t p-4 flex flex-col gap-4">
          {primaryRoutes.map((route) => {
            const isActive = currentPath === route.path;
            return (
              <a
                key={route.path}
                href={route.path}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(route.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`font-semibold py-2 ${isActive ? 'text-brand-600' : 'text-slate-800'}`}
              >
                {route.label}
              </a>
            );
          })}
          <Button variant="primary" fullWidth onClick={() => handleNavigate('/contatti')}>
            Prenota Consulenza
          </Button>
        </div>
      )}
    </nav>
  );
};
