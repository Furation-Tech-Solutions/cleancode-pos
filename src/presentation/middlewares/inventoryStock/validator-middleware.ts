import ApiError from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const inventoryStockRequestBodyValidator = Joi.object({
    company_id: Joi.string().required().messages({
        "any.required": "Please enter companyId"
    }),
    inventory_id: Joi.string().required().messages({
        "any.required": "Please enter inventory_id"
    }),
    item: Joi.string().min(3).max(50).required().messages({
        "string.min": "Delivery Partner item should have more than 3 characters",
        "string.max": "Inventory stock item should have less than 50 characters",
        "any.required": "Please enter item name"
    }),
    total_qtn: Joi.string().required().messages({
        "any.required": "Please enter total Quantity"
    }),
    flag: Joi.string().required().messages({
        "any.required": "Please enter flag"
    }),
    createdAt: Joi.date().iso().optional()
});

export default function validateBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  try {
    const { error } = inventoryStockRequestBodyValidator.validate(req.body);
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