import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface PurchaseItemInput {
  purchaseid: string;
  itemid: string;
  quantity: number;
  unitOfMeasurement: string;
  price: number;
  date: string;
  modifiedAt: Date;
  modifiedBy: string;
  del_status: boolean;
}

const purchaseItemValidator = function (
  input: PurchaseItemInput
): PurchaseItemInput {
  // Define the purchaseItemSchema for input validation
  const purchaseItemSchema = Joi.object<PurchaseItemInput>({
    purchaseid: Joi.string().required().trim().messages({
      "string.base": "Purchase ID must be a string",
      "string.empty": "Purchase ID is required",
      "any.required": "Purchase ID is required",
    }),
    itemid: Joi.string().required().trim().messages({
      "string.base": "Item ID must be a string",
      "string.empty": "Item ID is required",
      "any.required": "Item ID is required",
    }),
    quantity: Joi.number().required().min(1).messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "number.min": "Quantity should be at least 1",
      "any.required": "Quantity is required",
    }),
    unitOfMeasurement: Joi.string().required().max(50).trim().messages({
      "string.base": "Unit of measurement must be a string",
      "string.empty": "Unit of measurement is required",
      "string.max": "Unit of measurement should be under 50 characters",
      "any.required": "Unit of measurement is required",
    }),
    price: Joi.number().required().messages({
      "number.base": "Price must be a number",
      "number.empty": "Price is required",
      "any.required": "Price is required",
    }),
    date: Joi.string().required().trim().messages({
      "string.base": "Date must be a string",
      "string.empty": "Date is required",
      "any.required": "Date is required",
    }),
    modifiedAt: Joi.date().default(Date.now).messages({
      "date.base": "Modified At must be a valid date",
    }),
    modifiedBy: Joi.string().required().trim().messages({
      "string.base": "Modified By must be a string",
      "string.empty": "Modified By is required",
      "any.required": "Modified By is required",
    }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the purchaseItemSchema
  const { error, value } = purchaseItemSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    // Create an array of validation error messages
    const validationErrors = error.details.map(
      (value: ValidationErrorItem) => value.message
    );

    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validatePurchaseItemMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the purchase item input using the purchaseItemValidator
    const validatedInput: PurchaseItemInput = purchaseItemValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    // Respond with the custom error
    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};

export default purchaseItemValidator;
