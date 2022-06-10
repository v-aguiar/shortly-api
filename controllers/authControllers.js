import jwt from "jsonwebtoken";

import db from "../db/db.js";

export async function singUp(req, res) {
  const { name, email } = req.body;
  const password = res.locals.password;

  const userBody = {
    name: stripHtml(name).result.trim(),
    email: stripHtml(email).result.trim(),
    password,
  };

  try {
    const query = `INSERT INTO
      users(name, email, password)
      VALUES($1, $2, $3)`;
    const values = [userBody.name, userBody.email, userBody.password];

    await db.query(query, values);

    res.sendStatus(201);
  } catch (error) {
    console.error("⚠ Error on user registration: ", error);
    res.status(400).send(error.message);
  }
}

export async function singIn(req, res) {}
