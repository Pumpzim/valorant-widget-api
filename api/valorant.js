export default async function handler(req, res) {
  const region = "br";
  const platform = "pc";
  const name = "prime pumpz";
  const tag = "SSD";

  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v3/mmr/${region}/${platform}/${encodeURIComponent(name)}/${tag}`,
      {
        headers: {
          Authorization: process.env.HENRIK_API_KEY,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(json);
    }

    return res.status(200).json({
      rank: json.data.current.tier.name,
      rr: json.data.current.rr,
      elo: json.data.current.elo,
      leaderboard: json.data.current.leaderboard_placement,
      last_change: json.data.current.last_change,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
