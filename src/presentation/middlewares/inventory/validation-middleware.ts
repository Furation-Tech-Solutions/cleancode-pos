import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface InventoryInput {
  inventoryName: string;
  location: string;
  description?: string;
  companyId: string;
  del_status: boolean;
}

const inventoryValidator = function (input: InventoryInput): InventoryInput {
  // Define the inventorySchema for input validation
  const inventorySchema = Joi.object<InventoryInput>({
    inventoryName: Joi.string().required().min(3).max(100).trim().messages({
      "string.base": "Inventory name must be a string",
      "string.empty": "Inventory name is required",
      "string.min": "Inventory name should be at least 3 characters",
      "string.max": "Inventory name should be under 100 characters",
      "any.required": "Inventory name is required",
    }),
    location: Joi.string().required().min(5).max(200).trim().messages({
      "string.base": "Location must be a string",
      "string.empty": "Location is required",
      "string.min": "Location should be at least 5 characters",
      "string.max": "Location should be under 200 characters",
      "any.required": "Location is required",
    }),
    description: Joi.string().max(500).trim().messages({
      "string.base": "Description must be a string",
      "string.max": "Description should be under 500 characters",
    }),
    companyId: Joi.string().required().trim().messages({
      "string.base": "Company ID must be a string",
      "string.empty": "Company ID is required",
      "any.required": "Company ID is required",
    }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the inventorySchema
  const { error, value } = inventorySchema.validate(input, {
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

export const validateInventoryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the inventory input using the inventoryValidator
    const validatedInput: InventoryInput = inventoryValidator(body);

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

export default inventoryValidator;
