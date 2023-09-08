import Joi, { Schema } from "joi";
import { CuisineModel } from "@domain/cuisine/entities/cuisine";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedCuisineData?: CuisineModel; // Assuming CuisineModel is the type for the validated cuisine data
  }

const cuisineSchema: Schema<CuisineModel> = Joi.object({
  name: Joi.string().min(3).max(50).trim().required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have more than 5 characters',
      'string.max': 'Name should have less than or equal to 50 characters',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
    }),
  description: Joi.string().min(5).max(50).trim().required().messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description should have more than 5 characters',
      'string.max': 'Description should have less than or equal to 50 characters',
      'string.empty': 'Description cannot be empty',
      'any.required': 'Description is required',
    }),
  createdBy: Joi.date(),
  del_status: Joi.string().default(true),
  });
  
function validateCuisineMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const cuisineData: CuisineModel = req.body; // Assuming the cuisine data is sent in the request body

  const { error, value } = cuisineSchema.validate(cuisineData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated cuisine data to the request object for further processing in the route handler
  req.validatedCuisineData = value;
  next();
}

export default validateCuisineMiddleware;

