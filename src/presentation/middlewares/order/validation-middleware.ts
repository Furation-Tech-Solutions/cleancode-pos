import Joi, { Schema } from "joi";
import { OrderModel } from "@domain/order/entities/order";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedOrderData?: OrderModel; // Assuming OrderModel is the type for the validated order data
  }

const orderSchema: Schema<OrderModel> = Joi.object({
  orderNumber: Joi.number().max(999),
  date: Joi.date().default(new Date()),
  persons: Joi.string().max(50).min(3).trim().default(null).required().messages({
      'string.max': 'Maximum 50 characters are permitted for persons',
      'string.min': 'Persons should have more than 3 characters',
      'any.required': 'Please enter persons',
    }),
  waiter: Joi.string().max(50).min(3).trim().default(null).required().messages({
      'string.max': 'Maximum 50 characters are permitted for waiter',
      'string.min': 'Waiter should have more than 3 characters',
      'any.required': 'Please enter waiter',
    }),
  orderTime: Joi.date().default(new Date()),
  orderType: Joi.string().default('dine_In').valid('dine_In', 'take_Away', 'delivery'),
  orderTable: Joi.array().required().messages({
    'array.base': 'Order table should be an array',
    'any.required': 'Please enter orderTable',
  }),
  kot_print: Joi.array(),
  total_order_price: Joi.number(),
  order_status: Joi.string().default('active').valid('active', 'running', 'billing', 'settle'),
  del_status: Joi.string().default(true),
  });
  
function validateOrderMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const orderData: OrderModel = req.body; // Assuming the order data is sent in the request body

  const { error, value } = orderSchema.validate(orderData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated order data to the request object for further processing in the route handler
  req.validatedOrderData = value;
  next();
}

export default validateOrderMiddleware;

