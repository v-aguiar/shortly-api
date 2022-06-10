import jwt from "jsonwebtoken";

import db from "../db/db.js";

export async function signUp(req, res) {
  const { name, email, password } = res.locals;

  console.log(res.locals.name);

  try {
    const query = `INSERT INTO
      users(name, email, password)
      VALUES($1, $2, $3)`;
    const values = [name, email, password];

    await db.query(query, values);

    res.sendStatus(201);
  } catch (error) {
    console.error("⚠ Error on user registration: ", error);
    res.status(422).send(error.message);
  }
}

export async function signIn(req, res) {}
