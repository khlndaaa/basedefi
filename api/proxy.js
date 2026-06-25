export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  
  // Only allow DeFiLlama
  if (!url.startsWith('https://yields.llama.fi') && !url.startsWith('https://api.llama.fi')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
