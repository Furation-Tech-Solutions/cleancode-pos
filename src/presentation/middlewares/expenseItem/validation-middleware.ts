import Joi, { Schema } from "joi";
import { ExpenseItemModel } from "@domain/expenseItem/entities/expenseItem";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedExpenseItemData?: ExpenseItemModel; // Assuming ExpenseItemModel is the type for the validated expenseItem data
  }

const expenseItemSchema: Schema<ExpenseItemModel> = Joi.object({
  name: Joi.string().min(3).max(30).trim().required().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have more than 3 characters',
      'string.max': 'Name should have less than 30 characters',
      'any.required': 'Please enter Name',
    }),
  description: Joi.string().max(500).trim().allow(null).default(null).messages({
      'string.max': "Description can't exceed 500 characters",
    }),
    staff_id: Joi.array()
    .required()
    .messages({
      'array.base': 'Staff ID should be an array',
      'any.required': 'Please enter Staff ID',
    }),
    company_id: Joi.array()
    .required()
    .messages({
      'array.base': 'Company ID should be an array',
      'any.required': 'Please enter Company ID',
    }),
  del_status: Joi.boolean().default(true),
  });
  
function validateExpenseItemMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const expenseItemData: ExpenseItemModel = req.body; // Assuming the expenseItem data is sent in the request body

  const { error, value } = expenseItemSchema.validate(expenseItemData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated expenseItem data to the request object for further processing in the route handler
  req.validatedExpenseItemData = value;
  next();
}

export default validateExpenseItemMiddleware;

