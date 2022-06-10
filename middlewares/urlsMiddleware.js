import url_schema from "../schemas/url_schema.js";

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
