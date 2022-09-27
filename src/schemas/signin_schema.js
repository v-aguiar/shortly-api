import Joi from "joi";

const sign_in_schema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "⚠ Email is required!",
    "string.email": "⚠ Email is invalid!",
  }),
  password: Joi.string().required().messages({
    "string.empty": "⚠ Password is required!",
  }),
});

export default sign_in_schema;
