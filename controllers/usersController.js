import db from "../db/db.js";

export async function fetchUserData(req, res) {
  const { userData } = res.locals;

  res.status(200).send(userData);
}

export async function fetchRanking(req, res) {
  const query = `SELECT users."id", users."name", COUNT(urls.*) as "linksCount", users."visitedCount" as "visitCount"
    FROM users
    LEFT JOIN urls
    ON urls."userId" = users."id"
    GROUP BY users."id"
    ORDER BY "visitCount" DESC
    LIMIT 10`;

  try {
    const ranking = await db.query(query);
    res.status(200).send(ranking.rows);
  } catch (error) {
    console.error("⚠ Error fetching ranking: ", error);
    res.status(400).send(error.message);
  }
}
