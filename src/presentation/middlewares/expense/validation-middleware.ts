import Joi, { Schema } from "joi";
import { ExpenseModel } from "@domain/expense/entities/expense";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedExpenseData?: ExpenseModel; // Assuming ExpenseModel is the type for the validated expense data
  }

const expenseSchema: Schema<ExpenseModel> = Joi.object({
  date: Joi.string().required(),
  amount: Joi.number(),
  staff_id: Joi.string().required().messages({
    'any.required': 'Please enter staff_id',
  }),
  note: Joi.string().max(200).min(3).allow(null),
  outlet_id: Joi.string().required().messages({
    'any.required': 'Please enter outlet_id',
  }),
  payment_id: Joi.string().required().messages({
    'any.required': 'Please enter payment_id',
  }),
  del_status: Joi.string().default(true),
  });
  
function validateExpenseMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const expenseData: ExpenseModel = req.body; // Assuming the expense data is sent in the request body

  const { error, value } = expenseSchema.validate(expenseData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated expense data to the request object for further processing in the route handler
  req.validatedExpenseData = value;
  next();
}

export default validateExpenseMiddleware;

