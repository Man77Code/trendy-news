export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      status: "error",
      message: "Search query missing"
    });
  }

  try {
    const API_KEY = process.env.NEWS_API_KEY;

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&pageSize=100&apiKey=${API_KEY}`
    );

    const data = await response.json();

    // Allow browser access
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    if (data.status !== "ok") {
      return res.status(400).json({
        status: "error",
        message: data.message || "API fetch error"
      });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
}