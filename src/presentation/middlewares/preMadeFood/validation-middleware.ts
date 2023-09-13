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
  code: Joi.string().required().messages({
    'string.base': 'Code should be a string',
    'any.required': 'Code is required',
  }),
  category: Joi.array()
    .items(Joi.string().required())
    .required()
    .description('An array of category names referencing the "IngredientCategory" model')
    .label('Ingredient Category')
    .messages({
      'any.required': 'At least one category name is required',
    }),
  ingredientConsumption: Joi.array().items(Joi.string().required()),
  consumptionUnit: Joi.string(),
  costPerUnit: Joi.number(),
  lowQty: Joi.number(),
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

