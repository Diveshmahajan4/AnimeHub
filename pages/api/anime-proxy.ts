import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { p = 1 } = req.query;
  
    const url = `https://api.amvstr.me/api/v2/trending?limit=8&p=${p}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).json({ code: 500, message: 'Proxy fetch failed' });
    }
  }