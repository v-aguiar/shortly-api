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

export async function redirectUrl(req, res) {
  const { url } = res.locals;

  res.redirect(302, url);
}

export async function fetchUrlData(req, res) {
  const { urlData } = res.locals;

  delete urlData.userId;
  res.status(200).send(urlData);
}

export async function deleteUrl(req, res) {
  const { userId, urlData } = res.locals;

  const query = `DELETE FROM urls
    WHERE "userId" = $1 AND "id" = $2`;
  const values = [userId, urlData.id];

  try {
    await db.query(query, values);

    res.status(204).send("Deleted!");
  } catch (error) {
    console.error("⚠ Error deleting url from DB: ", error);
    res.status(400).send(error.message);
  }
}
