import Joi from "joi";

const url_schema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.empty": "⚠ URL is required!",
    "string.uri": "⚠ Must be a valid URL!",
  }),
});

export default url_schema;
