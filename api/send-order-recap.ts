export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to, subject, html } = req.body;
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
    if (!resendRes.ok) {
      const error = await resendRes.text();
      return res.status(500).send(error);
    }
    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}