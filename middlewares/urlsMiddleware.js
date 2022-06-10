import url_schema from "../schemas/url_schema.js";
import db from "../db/db.js";

export async function validateUrlInput(req, res, next) {
  const { url } = req.body;

  const validateInputs = url_schema.validate({ url });
  if (validateInputs.error) {
    console.error("⚠ Validation Error! ", validateInputs.error.message);
    res.status(422).send(validateInputs.error.message);
    return;
  }

  res.locals.userId = res.locals.userId.userId;
  res.locals.url = url;
  next();
}

export async function validateShortUrl(req, res, next) {
  const { shortUrl } = req.params;

  const checkQuery = `SELECT * FROM urls WHERE "shortUrl" = $1`;
  const checkValues = [shortUrl];

  const updateUrlViewsQuery = `UPDATE urls 
    SET views = views + 1
    WHERE "shortUrl" = $1`;
  const updateUrlViewsValues = [shortUrl];

  const updateUserViewsQuery = `UPDATE users
  SET "visitedCount" = "visitedCount" + 1
  FROM urls
  WHERE users.id = urls."userId"`;

  try {
    const urlsDB = await db.query(checkQuery, checkValues);
    const urls = urlsDB?.rows[0];
    if (!urls) {
      console.error("⚠ Url not found!");
      res.status(404).send("⚠ Url not found!");
      return;
    }

    await db.query(updateUrlViewsQuery, updateUrlViewsValues);
    await db.query(updateUserViewsQuery);

    res.locals.url = urls.url;
    next();
  } catch (error) {
    console.error("⚠ Error validating url: ", error);
    res.status(422).send(error.message);
  }
}

export async function validateUrlId(req, res, next) {
  const { id } = req.params;

  const query = `SELECT "id", "shortUrl", "url" FROM urls WHERE "id" = $1`;
  const values = [id];

  try {
    const urlDB = await db.query(query, values);
    const urlData = urlDB?.rows[0];
    if (!urlData) {
      console.error("⚠ No url found with given id!");
      res.status(404).send("⚠ No url found with given id!");
      return;
    }

    res.locals.urlData = urlData;
    next();
  } catch (error) {
    console.error("⚠ No url found with given id: ", error);
    res.status(404).send(error.message);
  }
}
