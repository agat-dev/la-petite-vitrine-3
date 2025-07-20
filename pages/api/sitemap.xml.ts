import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://lapetitevitrine.com';

const staticRoutes = [
  '/',
  '/commande',
  '/cgv',
  '/mentions-legales',
  '/politique-confidentialite',
  '/success',
  // Ajoute ici d'autres routes statiques si besoin
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/xml');
  const urls = staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <changefreq>monthly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.7'}</priority>
    </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  res.status(200).send(sitemap);
}