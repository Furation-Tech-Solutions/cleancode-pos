import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface KotInput {
  kotNumber: string;
  typeOfOrder: string;
  waiterName: string;
  table?: string; // Change the type if needed
  order?: string; // Change the type if needed
  cookingStatus: string;
  items: Array<{
    foodItem: string; // Change the type if needed
    quantity: number;
    customerComment?: string;
  }>;
  customerCommentForAllFood?: string;
  del_status: boolean;
}

const kotValidator = function (input: KotInput): KotInput {
  // Define the kotSchema for input validation
  const kotSchema = Joi.object<KotInput>({
    kotNumber: Joi.string().required().trim().messages({
      "string.base": "Kot Number must be a string",
      "string.empty": "Kot Number is required",
      "any.required": "Kot Number is required",
    }),
    typeOfOrder: Joi.string()
      .valid("Delivery", "Takeaway", "Table")
      .required()
      .trim()
      .messages({
        "string.base": "Type of Order must be a string",
        "string.empty": "Type of Order is required",
        "any.required": "Type of Order is required",
        "any.only": "Invalid Type of Order",
      }),
    waiterName: Joi.string()
      .max(50)
      .min(3)
      .required()
      .trim()
      .default(null)
      .messages({
        "string.base": "Waiter Name must be a string",
        "string.empty": "Waiter Name is required",
        "string.max": "Waiter Name should be under 50 characters",
        "string.min": "Waiter Name should have more than 3 characters",
        "any.required": "Waiter Name is required",
      }),
    table: Joi.string().trim(), // Change the validation if needed
    order: Joi.string().trim(), // Change the validation if needed
    cookingStatus: Joi.string()
      .valid("requested", "cooking", "done")
      .default("requested")
      .trim()
      .messages({
        "string.base": "Cooking Status must be a string",
        "string.empty": "Cooking Status is required",
        "any.only": "Invalid Cooking Status",
      }),
    items: Joi.array()
      .items(
        Joi.object({
          foodItem: Joi.string().required().trim(), // Change the validation if needed
          quantity: Joi.number().required().default(1),
          customerComment: Joi.string().allow(null).default(null), // Change the validation if needed
        })
      )
      .required()
      .messages({
        "array.base": "Items must be an array",
        "array.empty": "Items is required",
        "any.required": "Items is required",
      }),
    customerCommentForAllFood: Joi.string().allow(null).default(null), // Change the validation if needed
    del_status: Joi.boolean().default(true),
  });

  // Validate the request body against the kotSchema
  const { error, value } = kotSchema.validate(input, { abortEarly: false });

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

export const validateKotMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the kot input using the kotValidator
    const validatedInput: KotInput = kotValidator(body);

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

export default kotValidator;
