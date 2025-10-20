import type { Request, Response, NextFunction } from "express";
import type Joi from "joi";

//  middleware for validating request body
export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((d) => d.message),
      });
      return; // stop execution
    }

    req.body = value; // safe validated data
    next();
  };
};
