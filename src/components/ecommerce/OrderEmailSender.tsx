import { useState, forwardRef, useImperativeHandle } from 'react';

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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmation de commande - La Petite Vitrine</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
          .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
          .header { text-align: center; margin-bottom: 32px; }
          .header img { height: 60px; margin-bottom: 12px; }
          .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
          .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
          .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
          .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
          .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
          ul { margin: 0 0 12px 0; padding-left: 18px; }
          li { color: #2E66C1; }
          .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
            <h1>Confirmation de commande</h1>
          </div>
          <div class="section">
            <p style="font-size:1.05rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
              Merci pour votre confiance !
            </p>
            <p style="font-size:1rem;color:#222;margin:0;">
              Vous recevrez sous 48h une validation de votre commande avec un accès à une prise de rendez-vous en ligne pour préciser votre besoin pour être certains que notre travail corresponde à vos attentes.<br>
              Vous recevrez également un lien pour procéder au paiement en ligne de votre commande.
            </p>
          </div>
          <div class="recap">
            <h2>Récapitulatif de commande</h2>
            <h3>Pack sélectionné</h3>
            <ul>
              <li style="color:#222;font-weight:600;">${pack.title} - ${pack.price}€</li>
              ${pack.features.map((f) => `<li style="color:#2E66C1;">${f}</li>`).join('')}
            </ul>
            <h3>Maintenance sélectionnée</h3>
            <ul>
              <li style="color:#222;font-weight:600;">${maintenance.title} - ${maintenance.price}€/mois</li>
              <li style="color:#2E66C1;">${maintenance.description}</li>
            </ul>
            <h3>Informations client</h3>
            <ul>
              ${Object.entries(formData)
                .map(([k, v]) => `<li><strong style="color:#2E66C1;">${k}:</strong> <span style="color:#222;">${v}</span></li>`)
                .join('')}
            </ul>
            <h3>Montant total</h3>
            <p style="font-size:1.1rem;color:#2E66C1;font-weight:700;margin:0 0 8px 0;">
              ${total}€ <span style="color:#222;font-weight:400;font-size:0.95rem;">(+${maintenance.price}€/mois de maintenance)</span>
            </p>
          </div>
          <div class="footer">
            La Petite Vitrine &mdash; contact@lapetitevitrine.com
          </div>
        </div>
      </body>
      </html>
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

  console.log('[OrderEmailSender] Monté');

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
