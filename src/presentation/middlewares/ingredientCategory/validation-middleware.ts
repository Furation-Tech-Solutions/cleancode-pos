import Joi, { Schema } from "joi";
import { IngredientCategoryModel } from "@domain/ingredientCategory/entities/ingredientCategory";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedIngredientCategoryData?: IngredientCategoryModel; // Assuming IngredientCategoryModel is the type for the validated ingredientCategory data
  }

const ingredientCategorySchema: Schema<IngredientCategoryModel> = Joi.object({
  ingredientCategory_name: Joi.string().min(3).max(50).required().trim()
    .messages({
      "string.base": "ingredientCategory_name must be a string",
      "string.empty": "ingredientCategory_name cannot be empty",
      "string.min":
        "ingredientCategory_name should have at least {#limit} characters",
      "string.max":
        "ingredientCategory_name should have at most {#limit} characters",
      "any.required": "ingredientCategory_name is required",
    }),
  description: Joi.string().max(100).required().trim().messages({
    "string.base": "description must be a string",
    "string.empty": "description cannot be empty",
    "string.min": "description should have at least {#limit} characters",
    "string.max": "description should have at most {#limit} characters",
    "any.required": "description is required",
  }),
  createdBy: Joi.date(),
  del_status: Joi.string().valid("Live", "Deleted").default("Live").messages({
    "string.base": "del_status must be a string",
    "string.empty": "del_status cannot be empty",
    "any.only": "del_status must be either 'Live' or 'Deleted'",
  }),
});
  
function validateIngredientCategoryMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const ingredientCategoryData: IngredientCategoryModel = req.body; // Assuming the ingredientCategory data is sent in the request body

  const { error, value } = ingredientCategorySchema.validate(ingredientCategoryData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated ingredientCategory data to the request object for further processing in the route handler
  req.validatedIngredientCategoryData = value;
  next();
}

export default validateIngredientCategoryMiddleware;

