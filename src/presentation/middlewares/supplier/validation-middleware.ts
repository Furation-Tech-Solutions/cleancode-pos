import Joi, { Schema } from "joi";
import { SupplierModel } from "@domain/supplier/entities/supplier";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedSupplierData?: SupplierModel; // Assuming SupplierModel is the type for the validated supplier data
  }

const supplierSchema: Schema<SupplierModel> = Joi.object({
  companyId: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required()
    .description('An array of MongoDB ObjectIds referencing the "Company" model')
    .label('Company ID')
    .messages({
      'any.required': 'Please enter companyId',
    }),
  contact: Joi.string().max(13).required().messages({
    'string.max': 'Contact number should be under 13 characters',
    'any.required': 'Please enter contact number',
  }),
  address: Joi.string().min(5).max(100).trim().default(null).messages({
    'string.min': 'Address should have more than 5 characters',
    'string.max': 'Maximum 100 characters are permitted for address',
    'any.default': 'Address defaulted to null',
    'any.required': 'Please enter address',
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Please enter email',
  }),
  del_status: Joi.boolean().default(true)
  });
  
function validateSupplierMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const supplierData: SupplierModel = req.body; // Assuming the supplier data is sent in the request body

  const { error, value } = supplierSchema.validate(supplierData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated supplier data to the request object for further processing in the route handler
  req.validatedSupplierData = value;
  next();
}

export default validateSupplierMiddleware;

