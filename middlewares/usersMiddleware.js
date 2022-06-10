import db from "../db/db.js";

export async function validateUserData(req, res, next) {
  const { userId } = res.locals;

  const queryUserData = `SELECT users."id", users."name", users."visitedCount" as "visitCount"
    FROM users
    Where id = $1`;
  const valuesUserData = [userId];

  const queryUserUrls = `SELECT "id", "shortUrl", "url", "views" as "visitCount"
    FROM urls
    WHERE "userId" = $1`;
  const valuesUserUrls = [userId];

  try {
    const userData = await db.query(queryUserData, valuesUserData);
    const userUrls = await db.query(queryUserUrls, valuesUserUrls);

    const { id, name, visitCount } = userData.rows[0];

    res.locals.userData = {
      id,
      name,
      visitCount,
      shortenedUrls: userUrls.rows,
    };

    next();
  } catch (error) {
    console.error("⚠ Error fetching user url data: ", error);
    res.status(404).send(error.message);
  }
}
