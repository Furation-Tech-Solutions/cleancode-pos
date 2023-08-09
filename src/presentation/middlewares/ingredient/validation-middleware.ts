import Joi, { Schema } from "joi";
import { IngredientModel } from "@domain/ingredient/entities/ingredient";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedIngredientData?: IngredientModel; // Assuming IngredientModel is the type for the validated ingredient data
  }

const ingredientSchema: Schema<IngredientModel> = Joi.object({
  name: Joi.string().min(3).max(50).required().trim().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name should have at least {3} characters",
    "string.max": "Name can have at most {50} characters",
    "any.required": "Name is required",
  }),
  code: Joi.number().required().messages({
    "number.base": "Code must be a number",
    "number.empty": "Code is required",
    "any.required": "Code is required",
  }),
  category: Joi.string().required().messages({
    "string.base": "category must be a string",
    "string.empty": "category is required",
    "any.required": "category is required",
  }),
  PurchaseUnit: Joi.string().required().messages({
    "string.base": "PurchaseUnit must be a string",
    "string.empty": "PurchaseUnit is required",
    "any.required": "PurchaseUnit is required",
  }),
  ConsumptionUnit: Joi.string().required().messages({
    "string.base": "ConsumptionUnit must be a string",
    "string.empty": "ConsumptionUnit is required",
    "any.required": "ConsumptionUnit is required",
  }),
  ConversionUnit: Joi.string().required().messages({
    "string.base": "ConversionUnit must be a string",
    "string.empty": "ConversionUnit is required",
    "any.required": "ConversionUnit is required",
  }),
  PurchaseRate: Joi.number().required().messages({
    "number.base": "PurchaseRate must be a number",
    "number.empty": "PurchaseRate is required",
    "any.required": "PurchaseRate is required",
  }),
  costUnit: Joi.number().required().messages({
    "number.base": "CostUnit must be a number",
    "number.empty": "CostUnit is required",
    "any.required": "CostUnit is required",
  }),
  LowQty: Joi.number().required().messages({
    "number.base": "LowQty must be a number",
    "number.empty": "LowQty is required",
    "any.required": "LowQty is required",
  }),
  del_status: Joi.boolean().default("True")
});
  
function validateIngredientMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const ingredientData: IngredientModel = req.body; // Assuming the ingredient data is sent in the request body

  const { error, value } = ingredientSchema.validate(ingredientData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated ingredient data to the request object for further processing in the route handler
  req.validatedIngredientData = value;
  next();
}

export default validateIngredientMiddleware;

