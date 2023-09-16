import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface InternalTransferInput {
  sourceInventory: string;
  destinationInventory: string;
  transferDate: string;
  del_status: boolean;
}

const internalTransferValidator = function (
  input: InternalTransferInput
): InternalTransferInput {
  // Define the internalTransferSchema for input validation
  const internalTransferSchema = Joi.object<InternalTransferInput>({
    sourceInventory: Joi.string().required().trim().messages({
      "string.base": "Source Inventory must be a string",
      "string.empty": "Source Inventory is required",
      "any.required": "Source Inventory is required",
    }),
    destinationInventory: Joi.string().required().trim().messages({
      "string.base": "Destination Inventory must be a string",
      "string.empty": "Destination Inventory is required",
      "any.required": "Destination Inventory is required",
    }),
    transferDate: Joi.date().iso().required().messages({
      "date.base": "Transfer Date must be a valid date",
      "date.empty": "Transfer Date is required",
      "date.isoDate": "Transfer Date must be in ISO date format",
      "any.required": "Transfer Date is required",
    }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the internalTransferSchema
  const { error, value } = internalTransferSchema.validate(input, {
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

export const validateInternalTransferMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the internal transfer input using the internalTransferValidator
    const validatedInput: InternalTransferInput =
      internalTransferValidator(body);

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

export default internalTransferValidator;
