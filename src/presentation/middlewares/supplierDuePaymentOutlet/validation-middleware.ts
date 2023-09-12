import Joi, { Schema } from "joi";
import { SupplierDuePaymentOutletModel } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedSupplierDuePaymentOutletData?: SupplierDuePaymentOutletModel; // Assuming SupplierDuePaymentOutletModel is the type for the validated supplierDuePaymentOutlet data
  }

const supplierDuePaymentOutletSchema: Schema<SupplierDuePaymentOutletModel> = Joi.object({
  date: Joi.string(),
  supplier_id: Joi.array()
    .required()
    .messages({
      'array.base': 'Supplier ID should be an array',
      'any.required': 'Please enter supplier ID',
    }),
  amount: Joi.number(),
  note: Joi.string().min(3).max(200).required().trim().default(null).messages({
      'string.base': 'Note should be a string',
      'string.min': 'Note should have more than 3 characters',
      'string.max': 'Maximum 200 characters are permitted for note',
      'any.required': 'Please enter note',
    }),
  staff_id: Joi.array()
    .required()
    .messages({
      'array.base': 'Staff ID should be an array',
      'any.required': 'Please enter staff ID',
    }),
  outlet_id: Joi.array()
    .required()
    .messages({
      'array.base': 'Outlet ID should be an array',
      'any.required': 'Please enter outlet ID',
    }),
  paymentMethod: Joi.string().required().messages({
    'any.required': 'Payment method is required',
  }),
  paymentStatus: Joi.string().valid('pending', 'done').default('pending'),
  del_status: Joi.boolean().default(true)
});
  
function validateSupplierDuePaymentOutletMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const supplierDuePaymentOutletData: SupplierDuePaymentOutletModel = req.body; // Assuming the supplierDuePaymentOutlet data is sent in the request body

  const { error, value } = supplierDuePaymentOutletSchema.validate(supplierDuePaymentOutletData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated supplierDuePaymentOutlet data to the request object for further processing in the route handler
  req.validatedSupplierDuePaymentOutletData = value;
  next();
}

export default validateSupplierDuePaymentOutletMiddleware;

