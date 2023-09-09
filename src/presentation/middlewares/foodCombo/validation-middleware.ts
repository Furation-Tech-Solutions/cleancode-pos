import Joi, { Schema } from "joi";
import { FoodComboModel } from "@domain/foodCombo/entities/foodCombo";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedFoodComboData?: FoodComboModel; // Assuming FoodComboModel is the type for the validated foodCombo data
  }

const foodComboSchema: Schema<FoodComboModel> = Joi.object({
  name: Joi.string().max(30).min(3).required().trim().messages({
      'string.base': 'Name should be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name should have more than 3 characters',
      'string.max': 'Name should have less than 30 characters',
      'any.required': 'Please enter Name',
    }),
  code: Joi.string().max(50).min(1).required().trim().allow(null).messages({
      'string.base': 'Code should be a string',
      'string.empty': 'Code is required',
      'string.min': 'Code should have more than 1 character',
      'string.max': 'Maximum 50 characters are permitted',
      'any.required': 'Please enter code',
    }),
  food_category: Joi.string().required().messages({
    'string.base': 'food category should be a string',
    'string.empty': 'food category is required',
  }),
  foodMenu: Joi.array().items(
    Joi.object({
      food_item: Joi.string().hex().length(24).required(),
      quantity: Joi.number().min(0).default(0),
    })
  ),
  Dine_price: Joi.number(),
  Takeaway_price: Joi.number(),
  Delivery_price: Joi.array().items(
    Joi.object({
      deliveryPartnerName: Joi.string().hex().length(24).default(null),
      price: Joi.number().min(0).default(0),
    })
  ),
  description: Joi.string().max(200).trim().allow(null).messages({
      'string.base': 'Description should be a string',
      'string.max': 'Maximum 200 characters are permitted',
    }),
  isVeg: Joi.boolean(),
  isBeverage: Joi.boolean(),
  outlet: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required()
    .description('An array of MongoDB ObjectIds referencing the "Outlet" model')
    .label('Outlet ID')
    .messages({
      'any.required': 'Please enter an outlet',
    }),
  del_status: Joi.boolean().default(true)
  });
  
function validateFoodComboMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const foodComboData: FoodComboModel = req.body; // Assuming the foodCombo data is sent in the request body

  const { error, value } = foodComboSchema.validate(foodComboData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated foodCombo data to the request object for further processing in the route handler
  req.validatedFoodComboData = value;
  next();
}

export default validateFoodComboMiddleware;

