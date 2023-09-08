import Joi from 'joi';
import { KitchenModel } from "@domain/kitchen/entities/kitchen";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedKitchenData?: KitchenModel; // Assuming KitchenModel is the type for the validated kitchen data
  }

  const kitchenValidationSchema = Joi.object({
    outlet_code: Joi.string().max(50).min(1).required()
      .messages({
        'string.max': 'Maximum 50 characters are permitted',
        'string.min': 'outlet_code should have more than 1 character',
        'any.required': 'Please enter outlet_code',
      }),
  
    kitchen_code: Joi.string().max(50).min(1).required()
      .messages({
        'string.max': 'Maximum 50 characters are permitted',
        'string.min': 'kitchen_code should have more than 1 character',
        'any.required': 'Please enter kitchen_code',
      }),
  
    kitchen_area: Joi.string().required()
      .messages({
        'any.required': 'Please enter kitchen area',
      }),
  
    kitchen_name: Joi.string().max(50).min(3).required()
      .messages({
        'string.max': 'Maximum 50 characters are permitted',
        'string.min': 'Kitchen name should have more than 3 characters',
        'any.required': 'Please enter Kitchen Name',
      }),
  
    createdBy: Joi.date(),
    del_status: Joi.string().valid('Live', 'Deleted').default('Live')
      .messages({
        'any.only': 'Value is not matched',
      }),
  });
  
function validateKitchenMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const kitchenData: KitchenModel = req.body; // Assuming the table data is sent in the request body

  const { error, value } = kitchenValidationSchema.validate(kitchenData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated table data to the request object for further processing in the route handler
  req.validatedKitchenData = value;
  next();
}

export default validateKitchenMiddleware;

