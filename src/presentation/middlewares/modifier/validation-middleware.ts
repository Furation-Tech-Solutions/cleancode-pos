import Joi, { Schema } from "joi";
import { ModifierModel } from "@domain/modifier/entities/modifier";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedModifierData?: ModifierModel; // Assuming ModifierModel is the type for the validated modifier data
  }

const modifierSchema: Schema<ModifierModel> = Joi.object({
  name: Joi.string().min(3).max(50).trim().required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have more than 5 characters',
      'string.max': 'Name should have less than or equal to 50 characters',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
    }),
  salePrice: Joi.number().required(),
  ingredientConsumption: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required()
    .description('An array of MongoDB ObjectIds referencing the "Ingredient" model')
    .label('Ingredient ID')
    .messages({
      'any.required': 'At least one Ingredient ID is required',
    }),
  description: Joi.string().min(5).max(50).trim().required().messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description should have more than 5 characters',
      'string.max': 'Description should have less than or equal to 50 characters',
      'string.empty': 'Description cannot be empty',
      'any.required': 'Description is required',
    }),
  totalCostOfIngredients: Joi.number().required(),
  del_status: Joi.string().default(true),
  });
  
function validateModifierMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const modifierData: ModifierModel = req.body; // Assuming the modifier data is sent in the request body

  const { error, value } = modifierSchema.validate(modifierData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated modifier data to the request object for further processing in the route handler
  req.validatedModifierData = value;
  next();
}

export default validateModifierMiddleware;

