import Joi, { Schema } from "joi";
import { PaymentModel } from "@domain/payment/entities/payment";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedPaymentData?: PaymentModel; // Assuming PaymentModel is the type for the validated payment data
  }

const paymentSchema: Schema<PaymentModel> = Joi.object({
  name: Joi.string().min(3).max(50).required().trim().error(new Error("Please enter a name with 3 to 50 characters")),
  description: Joi.string().max(200).trim().allow(null).optional(),
  staff_id: Joi.array().required().messages({
    'array.base': 'Staff ID should be an array',
    'any.required': 'Please enter staff ID',
  }),
  company_id: Joi.array().required().messages({
    'array.base': 'Company ID should be an array',
    'any.required': 'Please enter company ID',
  }),
  order_by: Joi.string().max(50).allow(null).optional(),
  email: Joi.string().email().required().lowercase().trim().error(new Error("Please enter a valid email address")),
  del_status: Joi.boolean().default(true)
  });
  
function validatePaymentMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const paymentData: PaymentModel = req.body; // Assuming the payment data is sent in the request body

  const { error, value } = paymentSchema.validate(paymentData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated payment data to the request object for further processing in the route handler
  req.validatedPaymentData = value;
  next();
}

export default validatePaymentMiddleware;

