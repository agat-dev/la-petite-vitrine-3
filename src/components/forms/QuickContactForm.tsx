import React, { useState } from 'react';

interface QuickContactFormProps {
  title: string;
  buttonText?: string;
  className?: string;
}

export const QuickContactForm: React.FC<QuickContactFormProps> = ({
  title,
  buttonText = "Être rappelé(e)",
  className = '',
}) => {
  const [firstName, setFirstName] = useState('');
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !contact) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setError('');
    try {
      const res = await fetch('/api/add-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, contact }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  if (sent) {
    return <p className="py-2 px-4 text-green-700 font-medium">Merci, nous vous contacterons rapidement.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md space-y-3 ${className}`}>
      <p className="font-semibold text-blue-gray900">{title}</p>
      <div className="flex-wrap flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="flex-1 px-3 py-2 border border-amber-300/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="flex-1 px-3 py-2 border border-amber-300/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-xl shadow hover:bg-amber-700 whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};
