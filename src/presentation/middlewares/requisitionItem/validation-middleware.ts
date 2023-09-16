import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface RequisitionItemInput {
  requisitionid: string;
  itemid: string;
  quantity: number;
  unitOfMeasurement: string;
  del_status: boolean;
}

const requisitionItemValidator = function (
  input: RequisitionItemInput
): RequisitionItemInput {
  // Define the requisitionItemSchema for input validation
  const requisitionItemSchema = Joi.object<RequisitionItemInput>({
    requisitionid: Joi.string()
      .hex()
      .length(24) // Assuming ObjectId length is 24 characters
      .required()
      .messages({
        "string.base": "Requisition ID must be a string",
        "string.empty": "Requisition ID is required",
        "string.hex": "Invalid Requisition ID format",
        "string.length": "Requisition ID should be 24 characters long",
        "any.required": "Requisition ID is required",
      }),
    itemid: Joi.string()
      .hex()
      .length(24) // Assuming ObjectId length is 24 characters
      .required()
      .messages({
        "string.base": "Item ID must be a string",
        "string.empty": "Item ID is required",
        "string.hex": "Invalid Item ID format",
        "string.length": "Item ID should be 24 characters long",
        "any.required": "Item ID is required",
      }),
    quantity: Joi.number().min(1).required().messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "number.min": "Quantity should be at least 1",
      "any.required": "Quantity is required",
    }),
    unitOfMeasurement: Joi.string().max(50).required().messages({
      "string.base": "Unit of measurement must be a string",
      "string.empty": "Unit of measurement is required",
      "string.max": "Unit of measurement should be under 50 characters",
      "any.required": "Unit of measurement is required",
    }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the requisitionItemSchema
  const { error, value } = requisitionItemSchema.validate(input, {
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

export const validateRequisitionItemMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the requisition item input using the requisitionItemValidator
    const validatedInput: RequisitionItemInput = requisitionItemValidator(body);

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

export default requisitionItemValidator;
