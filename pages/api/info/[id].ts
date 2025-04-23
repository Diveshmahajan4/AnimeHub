import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const apiUrl = `https://api.amvstr.me/api/v2/info/${id}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Proxy info fetch failed:', error);
      res.status(500).json({ code: 500, message: 'Info fetch failed' });
    }
  }