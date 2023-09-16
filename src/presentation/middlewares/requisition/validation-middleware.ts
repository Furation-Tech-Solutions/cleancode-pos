import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

const statusEnum = {
  PENDING: "Pending",
  APPROVED: "Approved",
  SHIPPED: "Shipped",
  DELIVERED: "Delivery",
  CANCELLED: "Cancelled",
};

interface RequisitionInput {
  outletid: string;
  inventoryid: string;
  sender: string;
  receiver: string;
  requestDate: string;
  status: string;
  description?: string;
  del_status?: boolean;
}

const requisitionValidator = function (
  input: RequisitionInput
): RequisitionInput {
  // Define the requisitionSchema for input validation
  const requisitionSchema = Joi.object<RequisitionInput>({
    outletid: Joi.string().required().trim().messages({
      "string.base": "Outlet ID must be a string",
      "string.empty": "Outlet ID is required",
      "any.required": "Outlet ID is required",
    }),
    inventoryid: Joi.string().required().trim().messages({
      "string.base": "Inventory ID must be a string",
      "string.empty": "Inventory ID is required",
      "any.required": "Inventory ID is required",
    }),
    sender: Joi.string().required().trim().messages({
      "string.base": "Sender ID must be a string",
      "string.empty": "Sender ID is required",
      "any.required": "Sender ID is required",
    }),
    receiver: Joi.string().required().trim().messages({
      "string.base": "Receiver ID must be a string",
      "string.empty": "Receiver ID is required",
      "any.required": "Receiver ID is required",
    }),
    requestDate: Joi.date().default(new Date()).iso().messages({
      "date.base": "Request Date must be a date",
      "date.format": "Invalid date format",
    }),
    status: Joi.string()
      .valid(...Object.values(statusEnum))
      .default(statusEnum.PENDING),
    description: Joi.string().max(500).trim().messages({
      "string.base": "Description must be a string",
      "string.max": "Description should be under 500 characters",
    }),
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the requisitionSchema
  const { error, value } = requisitionSchema.validate(input, {
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

export const validateRequisitionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the requisition input using the requisitionValidator
    const validatedInput: RequisitionInput = requisitionValidator(body);

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

export default requisitionValidator;
