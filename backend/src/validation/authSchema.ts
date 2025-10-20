import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 3 and 30 characters and contain only letters and numbers (no symbols or spaces).",
    }),
});


export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("customer", "admin").default("customer"),
  phoneNumber: Joi.string().pattern(/^[0-9+()\- ]{7,20}$/).optional(),
  address: Joi.string().max(200).optional(),
});