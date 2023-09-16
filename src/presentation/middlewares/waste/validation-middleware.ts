import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface WasteInput {
  date: Date;
  responsiblePerson: string; // You can use ObjectId or string here based on your setup
  ingredients: string[]; // Array of Ingredient ObjectId or string
  foodMenu: string; // FoodMenu ObjectId or string
  quantity: number;
  unitOfMeasurement: string;
  totalLoss: number;
  notes?: string;
  addedBy: string; // Staff ObjectId or string
  del_status: boolean
}

const wasteValidator = function (input: WasteInput): WasteInput {
  const wasteSchema = Joi.object<WasteInput>({
    date: Joi.date().required(),
    responsiblePerson: Joi.string().required(), // You can use Joi.string().objectId() if using ObjectId
    ingredients: Joi.array().items(Joi.string()).required(), // You can use Joi.string().objectId() if using ObjectId
    foodMenu: Joi.string().required(), // You can use Joi.string().objectId() if using ObjectId
    quantity: Joi.number().required().min(1).messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "number.min": "Quantity should be at least 1",
      "any.required": "Quantity is required",
    }),
    unitOfMeasurement: Joi.string().required().max(50).messages({
      "string.base": "Unit of measurement must be a string",
      "string.empty": "Unit of measurement is required",
      "string.max": "Unit of measurement should be under 50 characters",
      "any.required": "Unit of measurement is required",
    }),
    totalLoss: Joi.number().required().messages({
      "number.base": "Total loss must be a number",
      "number.empty": "Total loss is required",
      "any.required": "Total loss is required",
    }),
    notes: Joi.string(),
    addedBy: Joi.string().required(), // You can use Joi.string().objectId() if using ObjectId
    del_status: Joi.boolean().default(true),
  });

  const { error, value } = wasteSchema.validate(input, { abortEarly: false });

  if (error) {
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

export const validateWasteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const validatedInput: WasteInput = wasteValidator(body);
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};
