import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface InventoryItem {
  itemName: string;
  totalQuantity: number;
  unitOfMeasurement: string;
  alertQuantity: number;
  minimumQuantity: number;
}

interface InventoryStockInput {
  inventoryId: string;
  items: InventoryItem[];
  del_status: boolean;
}

const inventoryStockValidator = function (
  input: InventoryStockInput
): InventoryStockInput {
  // Define the schema for input validation
  const inventoryStockSchema = Joi.object<InventoryStockInput>({
    inventoryId: Joi.string().required().messages({
      "string.base": "InventoryId must be a string",
      "string.empty": "InventoryId is required",
      "any.required": "InventoryId is required",
    }),
    items: Joi.array()
      .items(
        Joi.object<InventoryItem>({
          itemName: Joi.string().required().trim().messages({
            "string.base": "Item name must be a string",
            "string.empty": "Item name is required",
            "any.required": "Item name is required",
          }),
          totalQuantity: Joi.number().required().messages({
            "number.base": "Total quantity must be a number",
            "number.empty": "Total quantity is required",
            "any.required": "Total quantity is required",
          }),
          unitOfMeasurement: Joi.string().required().trim().messages({
            "string.base": "Unit of measurement must be a string",
            "string.empty": "Unit of measurement is required",
            "any.required": "Unit of measurement is required",
          }),
          alertQuantity: Joi.number().required().messages({
            "number.base": "Alert quantity must be a number",
            "number.empty": "Alert quantity is required",
            "any.required": "Alert quantity is required",
          }),
          minimumQuantity: Joi.number().required().messages({
            "number.base": "Minimum quantity must be a number",
            "number.empty": "Minimum quantity is required",
            "any.required": "Minimum quantity is required",
          }),
        })
      )
      .required()
      .min(1)
      .messages({
        "array.base": "Items must be an array",
        "array.empty": "Items is required",
        "array.min": "At least one item is required",
        "any.required": "Items is required",
      }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the schema
  const { error, value } = inventoryStockSchema.validate(input, {
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

export const validateInventoryStockMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the input using the inventoryStockValidator
    const validatedInput: InventoryStockInput = inventoryStockValidator(body);

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

export default inventoryStockValidator;
