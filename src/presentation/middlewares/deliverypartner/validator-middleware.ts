import ApiError from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const deliverypartnerRequestBodyValidator = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.min": "Delivery partner name should have more than 3 characters",
        "string.max": "Delivery partner name should have less than 50 characters",
        "any.required": "Please enter Delivery partner Name"
    }),
    phone: Joi.string().length(13).pattern(/^\+\d+$/).required().messages({
        "string.length": "Phone Number should have exactly 13 characters included country code",
        "string.pattern.base": "Phone Number should start with a '+' followed by digits",
        "any.required": "Please enter a phone number"
    }),
    address: Joi.string().min(10).max(100).required().messages({
        "string.min": "Delivery partner Address should have more than 3 characters",
        "string.max": "Delivery partner Address should have less than 30 characters",
        "any.required": "Please enter Delivery partner Address"
    }),
    createdAt: Joi.date().iso().optional()
});

export default function validateBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  try {
    const { error } = deliverypartnerRequestBodyValidator.validate(req.body);
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