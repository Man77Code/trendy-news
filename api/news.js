export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(400).json({ error: data.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching news" });
  }
}