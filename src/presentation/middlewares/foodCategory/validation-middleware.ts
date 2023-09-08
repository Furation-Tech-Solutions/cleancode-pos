import Joi, { Schema } from "joi";
import { FoodCategoryModel } from "@domain/foodCategory/entities/foodCategory";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedFoodCategoryData?: FoodCategoryModel; // Assuming FoodCategoryModel is the type for the validated foodCategory data
  }

const foodCategorySchema: Schema<FoodCategoryModel> = Joi.object({
  // parent_id: Joi.string().default(true),
  foodCategory_Name: Joi.string().trim().required().min(3).max(100).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Food category name should have at least {#limit} characters",
    "string.max": "Food category name can't exceed {#limit} characters",
    "any.required": "Name is required",
  }),
  description: Joi.string().required().trim().max(500).messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min":
      "Food category description should have at least {#limit} characters",
    "string.max": "Food category description can't exceed {#limit} characters",
    "any.required": "Description is required",
  }),
  createdBy: Joi.date(),
  del_status: Joi.string().default(true),
  });
  
function validateFoodCategoryMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const foodCategoryData: FoodCategoryModel = req.body; // Assuming the foodCategory data is sent in the request body

  const { error, value } = foodCategorySchema.validate(foodCategoryData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated foodCategory data to the request object for further processing in the route handler
  req.validatedFoodCategoryData = value;
  next();
}

export default validateFoodCategoryMiddleware;

