import React, { useMemo, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
};

type Comment = {
  name: string;
  message: string;
  date: string;
};

const posts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Errori da evitare acquistando da privato',
    excerpt: "I 5 rischi più comuni quando non c'è un'agenzia intermediaria e come proteggersi legalmente.",
    category: 'Guida all’acquisto',
    image: 'https://picsum.photos/id/20/900/600',
    date: '2024-09-10'
  },
  {
    id: 'b2',
    title: 'Il ruolo del notaio: cosa fa e cosa no',
    excerpt: 'Molti pensano che il notaio controlli tutto, ma non verifica lo stato urbanistico.',
    category: 'Legale',
    image: 'https://picsum.photos/id/45/900/600',
    date: '2024-08-22'
  },
  {
    id: 'b3',
    title: 'Come capire se il prezzo è giusto',
    excerpt: 'Strumenti e metodi per valutare un immobile al di là del prezzo richiesto.',
    category: 'Mercato',
    image: 'https://picsum.photos/id/60/900/600',
    date: '2024-08-05'
  }
];

const categories = ['Tutti', ...Array.from(new Set(posts.map((post) => post.category)))];

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  const [comments, setComments] = useState<Record<string, Comment[]>>({
    b1: [{ name: 'Luca', message: 'Articolo molto utile, grazie.', date: '2024-09-12' }]
  });
  const [drafts, setDrafts] = useState<Record<string, { name: string; message: string }>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visiblePosts = useMemo(() => {
    if (activeCategory === 'Tutti') {
      return posts;
    }
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const handleDraftChange = (postId: string, field: 'name' | 'message', value: string) => {
    setDrafts((prev) => ({
      ...prev,
      [postId]: {
        name: field === 'name' ? value : prev[postId]?.name || '',
        message: field === 'message' ? value : prev[postId]?.message || ''
      }
    }));
  };

  const handleSubmit = (postId: string) => {
    const draft = drafts[postId];
    const name = draft?.name?.trim() || '';
    const message = draft?.message?.trim() || '';

    if (!name || !message) {
      setErrors((prev) => ({ ...prev, [postId]: 'Inserisci nome e commento.' }));
      return;
    }

    setComments((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        { name, message, date: new Date().toISOString().split('T')[0] }
      ]
    }));
    setDrafts((prev) => ({ ...prev, [postId]: { name: '', message: '' } }));
    setErrors((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="pt-20 animate-fade-in">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Approfondimenti, guide pratiche e consigli per acquistare o vendere con consapevolezza.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Ultimi articoli"
            subtitle="Filtra per argomento e lascia il tuo commento."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeCategory === category
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {visiblePosts.map((post) => (
              <article key={post.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover min-h-[260px]" />
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                      <span className="bg-white px-3 py-1 rounded-full border border-slate-200 text-brand-600 font-semibold">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{post.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>

                    <div className="bg-white rounded-xl border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Commenti</h3>
                      <div className="space-y-4 mb-6">
                        {(comments[post.id] || []).map((comment, index) => (
                          <div key={`${post.id}-${index}`} className="border border-slate-100 rounded-lg p-4">
                            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                              <span className="font-semibold text-slate-700">{comment.name}</span>
                              <span>{comment.date}</span>
                            </div>
                            <p className="text-slate-600">{comment.message}</p>
                          </div>
                        ))}
                        {!(comments[post.id] || []).length && (
                          <p className="text-slate-500">Nessun commento ancora.</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor={`${post.id}-name`}>
                            Nome
                          </label>
                          <input
                            id={`${post.id}-name`}
                            type="text"
                            value={drafts[post.id]?.name || ''}
                            onChange={(event) => handleDraftChange(post.id, 'name', event.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                            placeholder="Inserisci il tuo nome"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor={`${post.id}-message`}>
                            Commento
                          </label>
                          <input
                            id={`${post.id}-message`}
                            type="text"
                            value={drafts[post.id]?.message || ''}
                            onChange={(event) => handleDraftChange(post.id, 'message', event.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                            placeholder="Scrivi un commento"
                          />
                        </div>
                      </div>
                      {errors[post.id] && (
                        <p className="text-sm text-red-600 mt-3" role="alert">
                          {errors[post.id]}
                        </p>
                      )}
                      <button
                        onClick={() => handleSubmit(post.id)}
                        className="mt-4 bg-brand-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-brand-700 transition"
                      >
                        Pubblica commento
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
