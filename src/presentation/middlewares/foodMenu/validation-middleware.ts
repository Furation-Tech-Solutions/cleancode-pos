import Joi, { Schema } from "joi";
import { FoodMenuModel } from "@domain/foodMenu/entities/foodMenu";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
  validatedFoodMenuData?: FoodMenuModel; // Assuming FoodMenuModel is the type for the validated foodMenu data
}

const foodMenuSchema: Schema<FoodMenuModel> = Joi.object({
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
  cuisine: Joi.array()
    .items(Joi.string().required().label('Cuisine ID'))
    .required()
    .messages({
      'any.required': 'At least one Cuisine ID is required',
    }),

  subCategory: Joi.array()
    .items(Joi.string().required().label('FoodCategory ID'))
    .required()
    .messages({
      'any.required': 'At least one FoodCategory ID is required',
    }),

  ingredientConsumption: Joi.array()
    .items(Joi.string().required().label('Ingredient ID'))
    .required()
    .messages({
      'any.required': 'At least one Ingredient ID is required',
    }),
  totalCostOfIngredients: Joi.number(),
  dineInPrice: Joi.number(),
  takeAwayPrice: Joi.number(),
  deliveryPrice: Joi.array().items(Joi.string().required()).required().messages({
    'array.base': 'DeliveryPrice should be an array',
    'array.empty': 'DeliveryPrice is required',
  }),
  description: Joi.string().max(200).trim().allow(null).messages({
    'string.base': 'Description should be a string',
    'string.max': 'Maximum 200 characters are permitted',
  }),
  foodImage: Joi.string(),
  isItVeg: Joi.boolean(),
  isItBebrages: Joi.boolean(),
  del_status: Joi.boolean().default(true)
});

function validateFoodMenuMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const foodMenuData: FoodMenuModel = req.body; // Assuming the foodMenu data is sent in the request body

  const { error, value } = foodMenuSchema.validate(foodMenuData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated foodMenu data to the request object for further processing in the route handler
  req.validatedFoodMenuData = value;
  next();
}

export default validateFoodMenuMiddleware;

