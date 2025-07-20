import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstName, contact } = req.body;
  if (!firstName || !contact) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const token = process.env.NOTION_TOKEN as string;
    const databaseId = process.env.NOTION_DATABASE_ID as string;

    await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: firstName } }] },
          Contact: { rich_text: [{ text: { content: contact } }] },
        },
      }),
    });

    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
