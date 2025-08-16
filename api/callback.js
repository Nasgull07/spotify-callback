export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('No code provided');
  }

  const clientId = 'dc51fd1033aa43209b33ba5c17eb0c2a';
  const clientSecret = 'c3cead8258cc4cf29a467edf9018cfcf';
  const redirectUri = 'https://spotify-callback-three.vercel.app/api/callback';

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
  });

  const data = await response.json();
  if (!response.ok) {
    return res.status(500).json({ error: data });
  }

  return res.status(200).json(data);
}