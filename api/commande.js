// Vercel Serverless API route for order/commande
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Méthode non autorisée' });
    return;
  }

  // Ici, récupérez les données du formulaire de commande
  const { client, products, total, message } = req.body;
  if (!client || !products || !total) {
    res.status(400).json({ success: false, error: 'Champs manquants' });
    return;
  }

  // Remplacez par votre logique d'envoi d'email ou de traitement de commande
  try {
    // Simule une réussite (remplacez par appel à Resend ou autre service)
    res.status(200).json({ success: true, info: 'Commande simulée reçue (remplacez par votre logique)' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
