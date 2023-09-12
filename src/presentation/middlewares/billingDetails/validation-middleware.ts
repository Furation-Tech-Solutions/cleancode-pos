import Joi, { Schema } from "joi";
import { BillingDetailsModel } from "@domain/billingDetails/entities/billingDetails";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
  validatedBillingDetailsData?: BillingDetailsModel; // Assuming BillingDetailsModel is the type for the validated billingDetails data
}

const billingDetailsSchema: Schema<BillingDetailsModel> = Joi.object({
  orderNunber_byId: Joi.array().items(Joi.string().required()).required(),
  billNumber: Joi.string().max(16).messages({
    'string.max': 'billNumber should be under 16 characters',
  }),
  Dine_price: Joi.number().required().min(0).messages({
    'number.base': 'Dine_price must be a number',
    'number.min': 'Dine_price must be a non-negative number',
    'any.required': 'Dine_price is required',
  }),
  dateTime: Joi.date().default(new Date()),
  particulars: Joi.array().items(
    Joi.object({
      foodMenu: Joi.string().required(),
      quantity: Joi.number().min(0).default(0),
      rate: Joi.number().min(0).default(0),
      amount: Joi.number().min(0).default(0),
    })
  ),
  subTotal: Joi.number().min(0).default(0),
  CGST: Joi.number().min(0).default(0),
  SGST: Joi.number().min(0).default(0),
  finalTotal: Joi.number().min(0).default(0),
  gstNo: Joi.string()
    .max(16)
    .min(16)
    .trim()
    .allow(null)
    .default(null)
    .required()
    .messages({
      'string.max': 'gstNo should have a maximum of 16 characters',
      'string.min': 'gstNo should have a minimum of 16 characters',
      'string.empty': 'Please enter gstNo',
      'any.required': 'gstNo is required',
    }),
  del_status: Joi.boolean().default(true)
});

function validateBillingDetailsMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const billingDetailsData: BillingDetailsModel = req.body; // Assuming the billingDetails data is sent in the request body

  const { error, value } = billingDetailsSchema.validate(billingDetailsData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated billingDetails data to the request object for further processing in the route handler
  req.validatedBillingDetailsData = value;
  next();
}

export default validateBillingDetailsMiddleware;

