import { stripHtml } from "string-strip-html";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import signin_schema from "../schemas/signin_schema.js";
import signup_schema from "../schemas/signup_schema.js";

dotenv.config();

export async function validateSignUp(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;
  const userBody = {
    name: stripHtml(name).result.trim(),
    email: stripHtml(email).result.trim(),
    password: stripHtml(password).result.trim(),
    confirmPassword: stripHtml(confirmPassword).result.trim(),
  };

  const validateInputs = signup_schema.validate(userBody, {
    abortEarly: false,
  });
  if (validateInputs.error) {
    res.status(422).send(error.message);
    return;
  }

  const SALT = process.env.SALT;
  res.locals.password = bcrypt.hashSync(userBody.password, SALT);
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

  //TODO: check if user exists on DB

  next();
}
