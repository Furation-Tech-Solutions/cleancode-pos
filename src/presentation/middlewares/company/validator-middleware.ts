import ApiError from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const companyRequestBodyValidator = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Company name should have more than 3 characters",
    "string.max": "Company name should have less than 30 characters",
    "any.required": "Please enter Company Name",
  }),
  email: Joi.string().email().required().lowercase().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Please enter an email address",
  }),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+\d+$/)
    .required()
    .messages({
      "string.length":
        "Phone Number should have exactly 13 characters included country code",
      "string.pattern.base":
        "Phone Number should start with a '+' followed by digits",
      "any.required": "Please enter a phone number",
    }),
  gstNo: Joi.string().length(15).optional().messages({
    "string.length": "Company GST No should have exactly 15 characters",
  }),
  companyLogo: Joi.string().allow(null).optional(),
  ownerName: Joi.string().min(3).max(30).required().messages({
    "string.min": "Owner name should have more than 3 characters",
    "string.max": "Owner name should have less than 30 characters",
    "any.required": "Please enter owner name",
  }),
  brand: Joi.string().max(30).optional().messages({
    "string.max": "Brand name should be under 30 Characters",
  }),
  active: Joi.boolean().optional().default(true),
  createdAt: Joi.date(), // Accepts the date as a string in ISO 8601 format
});

export default function validateBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  try {
    const { error } = companyRequestBodyValidator.validate(req.body);
    if (error) {
      const errorMessages: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path.join(".")] = detail.message;
      });
      return res.status(400).json({ error: errorMessages });
    }
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).json({ error: error.message });
    }
    ApiError.internalError();
  }
}
