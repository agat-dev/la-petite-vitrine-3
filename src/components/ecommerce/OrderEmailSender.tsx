import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface OrderEmailSenderProps {
  pack: { title: string; price: number; features: string[] };
  maintenance: { title: string; price: number; description: string };
  formData: Record<string, any>;
  total: number;
  adminEmail: string;
}

export const OrderEmailSender = forwardRef(function OrderEmailSender(
  { pack, maintenance, formData, total, adminEmail }: OrderEmailSenderProps,
  ref
) {
    
console.log('OrderEmailSender component initialized');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const log = (msg: string) => setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleSendEmail = async () => {
    setSending(true);
    setResult(null);
    setLogs([]);
    log("Début de l'envoi d'email");
    log('Payload préparé : ' + JSON.stringify({ pack, maintenance, formData, total, adminEmail }));

    const html = `
      <h2>Récapitulatif de commande</h2>
      <h3>Pack sélectionné</h3>
      <ul>
        <li><strong>${pack.title}</strong> - ${pack.price}€</li>
        ${pack.features.map((f) => `<li>${f}</li>`).join('')}
      </ul>
      <h3>Maintenance sélectionnée</h3>
      <ul>
        <li><strong>${maintenance.title}</strong> - ${maintenance.price}€/mois</li>
        <li>${maintenance.description}</li>
      </ul>
      <h3>Informations client</h3>
      <ul>
        ${Object.entries(formData)
          .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
          .join('')}
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
      log('Envoi de la requête POST à /api/send-order-recap');
      const res = await fetch('/api/send-order-recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      log('Statut HTTP: ' + res.status);
      let text = '';
      try {
        text = await res.text();
        log('Réponse brute: ' + text);
      } catch (err) {
        log('Impossible de lire la réponse brute');
      }
      if (res.ok) {
        setResult('Email envoyé avec succès !');
        log('Succès : email envoyé');
      } else {
        setResult('Erreur lors de l’envoi : ' + text);
        log('Erreur lors de l’envoi : ' + text);
      }
    } catch (e: any) {
      setResult('Erreur réseau : ' + e.message);
      log('Erreur réseau : ' + e.message);
    } finally {
      setSending(false);
    }
  };

  // CECI EST ESSENTIEL :
  useImperativeHandle(ref, () => ({
    send: handleSendEmail,
  }));

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
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-gray-500">Voir les logs</summary>
        <pre className="text-xs bg-gray-100 p-2 rounded">{logs.join('\n')}</pre>
      </details>
    </div>
  );
});
