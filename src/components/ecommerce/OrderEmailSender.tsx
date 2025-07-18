import React, { useState } from 'react';

interface OrderEmailSenderProps {
  pack: { title: string; price: number; features: string[] };
  maintenance: { title: string; price: number; description: string };
  formData: Record<string, any>;
  total: number;
  adminEmail: string;
}

export const OrderEmailSender: React.FC<OrderEmailSenderProps> = ({
  pack,
  maintenance,
  formData,
  total,
  adminEmail,
}) => {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSendEmail = async () => {
    setSending(true);
    setResult(null);

    const html = `
      <h2>Récapitulatif de commande</h2>
      <h3>Pack sélectionné</h3>
      <ul>
        <li><strong>${pack.title}</strong> - ${pack.price}€</li>
        ${pack.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <h3>Maintenance sélectionnée</h3>
      <ul>
        <li><strong>${maintenance.title}</strong> - ${maintenance.price}€/mois</li>
        <li>${maintenance.description}</li>
      </ul>
      <h3>Informations client</h3>
      <ul>
        ${Object.entries(formData).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}
      </ul>
      <h3>Montant total</h3>
      <p><strong>${total}€</strong> (+${maintenance.price}€/mois de maintenance)</p>
    `;

    const payload = {
      to: [formData.email, adminEmail],
      subject: 'Votre récapitulatif de commande - La Petite Vitrine',
      html,
    };

    try {
      const res = await fetch('/api/send-order-recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setResult('Email envoyé avec succès !');
      } else {
        const text = await res.text();
        setResult('Erreur lors de l’envoi : ' + text);
      }
    } catch (e: any) {
      setResult('Erreur réseau : ' + e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <button
        className="bg-amber-600 text-white px-4 py-2 rounded"
        onClick={handleSendEmail}
        disabled={sending}
      >
        {sending ? 'Envoi en cours...' : 'Envoyer le récapitulatif par email'}
      </button>
      {result && <div className="mt-2 text-sm">{result}</div>}
    </div>
  );
};
