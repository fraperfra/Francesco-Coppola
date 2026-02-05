import React, { useMemo, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';

type Project = {
  id: string;
  title: string;
  category: 'Vendita' | 'Acquisto' | 'Investimento';
  location: string;
  image: string;
  outcome: string;
};

const projects: Project[] = [
  {
    id: 'p1',
    title: 'Trilocale ristrutturato',
    category: 'Vendita',
    location: 'Reggio Emilia',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    outcome: 'Venduto in 32 giorni con prezzo target raggiunto'
  },
  {
    id: 'p2',
    title: 'Attico con terrazza',
    category: 'Acquisto',
    location: 'Modena',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    outcome: 'Negoziazione con riduzione del 7%'
  },
  {
    id: 'p3',
    title: 'Villetta indipendente',
    category: 'Investimento',
    location: 'Parma',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    outcome: 'Rendimento annuo previsto 6,2%'
  },
  {
    id: 'p4',
    title: 'Bilocale in centro',
    category: 'Vendita',
    location: 'Reggio Emilia',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    outcome: 'Open house con 14 visite in 48 ore'
  },
  {
    id: 'p5',
    title: 'Casa con giardino',
    category: 'Acquisto',
    location: 'Carpi',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    outcome: 'Due diligence completata in 10 giorni'
  },
  {
    id: 'p6',
    title: 'Locale commerciale',
    category: 'Investimento',
    location: 'Modena',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    outcome: 'Contratto di locazione chiuso prima del rogito'
  }
];

const filters: Array<Project['category'] | 'Tutti'> = ['Tutti', 'Vendita', 'Acquisto', 'Investimento'];

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>('Tutti');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tutti') {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="animate-fade-in">
      <section className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Progetti e Risultati</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Esperienze reali di acquisto, vendita e investimento seguite con metodo indipendente.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Filtra i progetti"
            subtitle="Seleziona il tipo di progetto per vedere i casi più rilevanti."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeFilter === filter
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all duration-300 group flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between text-sm text-brand-600 font-semibold mb-3">
                    <span>{project.category}</span>
                    <span className="text-slate-500">{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{project.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
