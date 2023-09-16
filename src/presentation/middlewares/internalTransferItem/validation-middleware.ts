import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface InternalTransferItemInput {
  internalTransferid: string;
  itemid: string;
  quantity: number;
  unitOfMeasurement: string;
  del_status: boolean;
}

const internalTransferItemValidator = function (
  input: InternalTransferItemInput
): InternalTransferItemInput {
  // Define the schema for input validation
  const schema = Joi.object<InternalTransferItemInput>({
    internalTransferid: Joi.string().hex().required().messages({
      "string.base": "InternalTransferid must be a hexadecimal string",
      "string.empty": "InternalTransferid is required",
      "string.hex": "InternalTransferid must be a hexadecimal string",
      "any.required": "InternalTransferid is required",
    }),
    itemid: Joi.string().hex().required().messages({
      "string.base": "Itemid must be a hexadecimal string",
      "string.empty": "Itemid is required",
      "string.hex": "Itemid must be a hexadecimal string",
      "any.required": "Itemid is required",
    }),
    quantity: Joi.number().required().min(1).messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "number.min": "Quantity should be at least 1",
      "any.required": "Quantity is required",
    }),
    unitOfMeasurement: Joi.string().max(50).required().trim().messages({
      "string.base": "UnitOfMeasurement must be a string",
      "string.empty": "UnitOfMeasurement is required",
      "string.max": "Unit of measurement should be under 50 characters",
      "any.required": "UnitOfMeasurement is required",
    }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the schema
  const { error, value } = schema.validate(input, { abortEarly: false });

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

export const validateInternalTransferItemMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the input using the internalTransferItemValidator
    const validatedInput: InternalTransferItemInput =
      internalTransferItemValidator(body);

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

export default internalTransferItemValidator;
