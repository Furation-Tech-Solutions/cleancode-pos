import Joi, { Schema } from "joi";
import { StaffModel } from "@domain/staff/entities/staff";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
  validatedStaffData?: StaffModel; // Assuming StaffModel is the type for the validated staff data
}

const staffSchema: Schema<StaffModel> = Joi.object({
  outletCode_byId: Joi.array()
    .items(Joi.string().required())
    .required(),
  username: Joi.string().min(5).max(50).trim().required().messages({
    'string.base': 'Username must be a string',
    'string.min': 'Username should have more than 5 characters',
    'string.max': 'Username should have less than or equal to 50 characters',
    'string.empty': 'Username cannot be empty',
    'any.required': 'Username is required',
  }),
  phone: Joi.number().required().messages({
    "any.required": "Please enter phone"
  }),
  email_address: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  jobTitle: Joi.string().max(30).trim().messages({
    'string.base': 'Job title must be a string',
    'string.max': 'Job title should be under 30 characters',
  }),
  permissions: Joi.array().items(Joi.number()),
  active: Joi.boolean().default(true),
  createdAt: Joi.date(),
  password: Joi.string().min(6).required().trim().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password should have more than 6 characters',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
  secuerityQuestion: Joi.string().allow(null).default(null),
  del_status: Joi.string().default(true),
});

function validateStaffMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const staffData: StaffModel = req.body; // Assuming the staff data is sent in the request body

  const { error, value } = staffSchema.validate(staffData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated staff data to the request object for further processing in the route handler
  req.validatedStaffData = value;
  next();
}

export default validateStaffMiddleware;

