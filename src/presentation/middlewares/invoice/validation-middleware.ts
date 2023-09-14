import Joi, { Schema } from "joi";
import { InvoiceModel } from "@domain/invoice/entities/invoice";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedInvoiceData?: InvoiceModel; // Assuming InvoiceModel is the type for the validated Invoice data
  }

const invoiceSchema: Schema<InvoiceModel> = Joi.object({
  invoice_number: Joi.string().max(16).messages({
    'string.max': 'Invoice number should be under 16 characters',
    'any.required': 'Invoice number is required',
  }),
  outlet_id: Joi.array().required().messages({
    'any.required': 'Outlet ID is required',
  }),
  inventory_id: Joi.array().required().messages({
    'any.required': 'Inventory ID is required',
  }),
  dateTime: Joi.date().default(Date.now),
  items: Joi.array().items(Joi.string().required()).required().messages({
    'any.required': 'Items are required',
  }),
  subtotal: Joi.number().min(0).default(0),
  tax_rate: Joi.number().min(0).default(0),
  discount_amount: Joi.number().min(0).default(0),
  total: Joi.number().min(0).default(0),
  payment_method: Joi.string().required()
    .valid('Cash', 'Credit Card', 'Debit Card', 'Online Payment')
    .default('Online Payment')
    .messages({
      'string.valid': 'Invalid payment method',
    }),
  payment_status: Joi.string().required()
    .valid('Pending', 'Paid', 'Partially Paid')
    .default('Pending')
    .messages({
      'string.valid': 'Invalid payment status',
    }),
  del_status: Joi.string().default(true),
  });
  
function validateInvoiceMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const invoiceData: InvoiceModel = req.body; // Assuming the invoice data is sent in the request body

  const { error, value } = invoiceSchema.validate(invoiceData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated invoice data to the request object for further processing in the route handler
  req.validatedInvoiceData = value;
  next();
}

export default validateInvoiceMiddleware;

