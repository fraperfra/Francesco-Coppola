import React, { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorText, setErrorText] = useState('');

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorText('Compila i campi obbligatori.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorText('Inserisci un indirizzo email valido.');
      return;
    }

    setStatus('success');
    setErrorText('');
    setForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="pt-20 animate-fade-in">
      <section className="bg-brand-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contatti</h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto">
            Richiedi una consulenza o condividi il tuo progetto: rispondiamo entro 24 ore lavorative.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Scrivici</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-name">
                    Nome e Cognome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    placeholder="Inserisci il tuo nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    placeholder="nome@email.it"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-phone">
                  Telefono
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  placeholder="+39 333 123 4567"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="contact-message">
                  Messaggio
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
                  placeholder="Descrivi la tua esigenza"
                  required
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-600 mt-4" role="alert">
                  {errorText}
                </p>
              )}
              {status === 'success' && (
                <p className="text-sm text-green-600 mt-4" role="status">
                  Messaggio inviato correttamente. Ti risponderemo a breve.
                </p>
              )}
              <button type="submit" className="mt-6 bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition">
                Invia richiesta
              </button>
            </form>

            <div className="space-y-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ufficio</h3>
                <p className="text-slate-600">Milano, Via Roma 10</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">info@consulenteindipendente.it</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Telefono</h3>
                <p className="text-slate-600">+39 02 123 4567</p>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2">Orari</h3>
                <p className="text-slate-200">Lun - Ven: 9:00 - 19:00</p>
                <p className="text-slate-200">Sab: 9:30 - 13:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
