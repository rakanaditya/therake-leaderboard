export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.NEXT_PUBLIC_API_SECRET,
        action: "getLeaderboard",
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
