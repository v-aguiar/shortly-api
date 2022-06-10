import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import db from "../db/db.js";

dotenv.config();

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

export async function signIn(req, res) {
  const { userId } = res.locals;

  const data = { userId };
  const config = { expiresIn: 60 * 60 * 24 }; // 1 day

  const token = jwt.sign(data, process.env.JWT_SECRET, config);

  const query = `INSERT INTO
    sessions ("userId", token)
    VALUES($1, $2)`;
  const values = [userId, token];

  try {
    await db.query(query, values);

    res.status(200).send({ token });
  } catch (error) {
    console.error("⚠ Error on user login: ", error);
    res.status(422).send(error.message);
  }
}
