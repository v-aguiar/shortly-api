import Joi from "joi";

const signup_schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "⚠ Name is required!",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "⚠ Email is required!",
    "string.email": "⚠ Email is invalid!",
  }),
  password: Joi.string().required().messages({
    "string.empty": "⚠ Password is required!",
  }),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "⚠ Passwords must match!",
  }),
});

export default signup_schema;
