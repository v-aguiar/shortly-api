import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import signin_schema from "../schemas/signin_schema.js";
import signup_schema from "../schemas/signup_schema.js";
import db from "../db/db.js";

dotenv.config();

export async function validateSignUp(req, res, next) {
  const { name, email, password, confirm_password } = req.body;
  const userBody = {
    name: stripHtml(name).result.trim(),
    email: stripHtml(email).result.trim(),
    password: stripHtml(password).result.trim(),
    confirm_password: stripHtml(confirm_password).result.trim(),
  };

  const validateInputs = signup_schema.validate(userBody, {
    abortEarly: false,
  });
  if (validateInputs.error) {
    res.status(422).send(validateInputs.error.message);
    return;
  }

  const SALT = process.env.SALT | 10;
  res.locals.password = bcrypt.hashSync(userBody.password, SALT);
  res.locals.name = userBody.name;
  res.locals.email = userBody.email;
  next();
}

export async function validateSignIn(req, res, next) {
  const { email, password } = req.body;

  const validateInputs = signin_schema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validateInputs.error) {
    console.error("⚠ Validation Error! ", validateInputs.error.message);
    res.status(422).send(validateInputs.error.message);
    return;
  }

  const query = `SELECT "id", "name", "email", "password" 
    FROM users 
    WHERE email = $1`;
  const values = [email];

  try {
    const existingUser = await db.query(query, values);
    if (!existingUser.rows[0]) {
      res.status(401).send("⚠ User not registered!");
      return;
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      existingUser.rows[0].password
    );
    const isEmailValid = existingUser.rows[0].email === email;
    if (!isPasswordValid || !isEmailValid) {
      res.status(401).send("⚠ Invalid email or password!");
      return;
    }

    res.locals.userId = existingUser.rows[0].id;
    next();
  } catch (error) {
    console.error("⚠ Error on user login: ", error);
    res.status(422).send(error.message);
  }
}
