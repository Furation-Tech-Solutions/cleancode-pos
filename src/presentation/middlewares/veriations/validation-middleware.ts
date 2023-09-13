import Joi, { Schema } from "joi";
import { VeriationsModel } from "@domain/veriations/entities/veriations";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedVeriationsData?: VeriationsModel; // Assuming VeriationsModel is the type for the validated veriations data
  }

const veriationsSchema: Schema<VeriationsModel> = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Name should be a string',
      'string.empty': 'Please enter a Name',
      'string.min': 'Name should have more than 3 characters',
      'string.max': 'Name should have less than 30 characters',
      'any.required': 'Name is required',
    }),
  foodMenuCode_byId: Joi.array()
    .items(Joi.string().required())
    .required()
    .description('An array of food menu codes')
    .label('Food Menu Code')
    .messages({
      'any.required': 'At least one food menu code is required',
  }),
  dineInPrice: Joi.number(),
  takeAwayPrice: Joi.number(),
  deliveryPrice: Joi.array().items(Joi.string().required()).required().messages({
      'array.base': 'Delivery Price should be an array',
      'array.empty': 'Delivery Price array should not be empty',
      'any.required': 'At least one Delivery Price is required',
    }),
  ingredientConsumption: Joi.array().items(Joi.string().required()).required().messages({
      'array.base': 'Ingredient Consumption should be an array',
      'array.empty': 'Ingredient Consumption array should not be empty',
      'any.required': 'At least one Ingredient Consumption is required',
    }),
  del_status: Joi.boolean().default(true),
  });
  
function validateVeriationsMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const veriationsData: VeriationsModel = req.body; // Assuming the veriations data is sent in the request body

  const { error, value } = veriationsSchema.validate(veriationsData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated veriations data to the request object for further processing in the route handler
  req.validatedVeriationsData = value;
  next();
}

export default validateVeriationsMiddleware;

