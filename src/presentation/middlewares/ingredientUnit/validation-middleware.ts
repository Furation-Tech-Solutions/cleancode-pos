import Joi, { Schema } from "joi";
import { IngredientUnitModel } from "@domain/ingredientUnit/entities/ingredientUnit";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedIngredientUnitData?: IngredientUnitModel; // Assuming IngredientUnitModel is the type for the validated ingredientUnit data
  }

const ingredientUnitSchema: Schema<IngredientUnitModel> = Joi.object({
  ingredientUnit_name: Joi.string().max(50).min(3).required()
  .messages({
    'string.max': 'Maximum 50 characters are permitted',
    'string.min': 'ingredientUnit_name should have more than 3 characters',
    'any.required': 'Please enter ingredientUnit_name',
  }),
  description: Joi.string().max(200).required()
  .messages({
    'string.max': 'Maximum 200 characters are permitted',
  }),
  del_status: Joi.string().valid('Live', 'Deleted').default('Live')
});
  
function validateIngredientUnitMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const ingredientUnitData: IngredientUnitModel = req.body; // Assuming the ingredientUnit data is sent in the request body

  const { error, value } = ingredientUnitSchema.validate(ingredientUnitData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated ingredientUnit data to the request object for further processing in the route handler
  req.validatedIngredientUnitData = value;
  next();
}

export default validateIngredientUnitMiddleware;

