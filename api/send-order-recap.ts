export default async function handler(req: any, res: any) {
  console.log('[API] Reçu une requête:', req.method, req.body);
  if (req.method !== 'POST') {
    console.log('[API] Mauvaise méthode:', req.method);
    return res.status(405).end();
  }

  const { to, subject, html } = req.body;
  console.log('[API] Destinataires:', to);
  console.log('[API] Sujet:', subject);
  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@lapetitevitrine.com',
        to,
        subject,
        html,
      }),
    });
    console.log('[API] Statut Resend:', resendRes.status);
    const resendText = await resendRes.text();
    console.log('[API] Réponse Resend:', resendText);
    if (!resendRes.ok) {
      return res.status(500).send(resendText);
    }
    res.status(200).json({ success: true, resendText });
  } catch (e: any) {
    console.log('[API] Exception:', e.message);
    res.status(500).json({ error: e.message });
  }
}