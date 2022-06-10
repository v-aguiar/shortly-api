import { customAlphabet } from "nanoid";

import db from "../db/db.js";

export async function shortifyUrl(req, res) {
  const { url, userId } = res.locals;

  const nanoid = customAlphabet(url, 10);
  const shortUrl = nanoid();

  const query = `INSERT INTO
    urls ("url", "shortUrl", "userId")
    VALUES($1, $2, $3)`;
  const values = [url, shortUrl, userId];

  try {
    await db.query(query, values);

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.error("⚠ Error saving url on DB: ", error);
    res.status(422).send(error.message);
  }
}
