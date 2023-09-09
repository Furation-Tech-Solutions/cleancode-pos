import Joi, { Schema } from "joi";
import { TableModel } from "@domain/table/entities/table";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
  validatedTableData?: TableModel; // Assuming TableModel is the type for the validated table data
}

const tableSchema: Schema<TableModel> = Joi.object({
  area_id: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required()
    .description('An array of MongoDB ObjectIds referencing the "Area" model')
    .label('Area ID')
    .messages({
      'any.required': 'Please enter area_id',
    }),
  outletCode_byId:Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required()
    .description('A MongoDB ObjectId referencing the "Outlet" model')
    .label('Outlet ID')
    .messages({
      'any.required': 'Please enter outlet_id',
    }),
  tableNumber: Joi.number().required(),
  seatingCapacity: Joi.number(),
  description: Joi.string()
    .max(100)
    .trim()
    .default(null)
    .messages({
      'string.max': 'Maximum 100 characters are permitted',
    }),
  phone_number: Joi.number()
    .required()
    .messages({
      'any.required': 'Please enter phone_number',
    }),
  del_status: Joi.boolean().default(true)
});

function validateTableMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const tableData: TableModel = req.body; // Assuming the table data is sent in the request body

  const { error, value } = tableSchema.validate(tableData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated table data to the request object for further processing in the route handler
  req.validatedTableData = value;
  next();
}

export default validateTableMiddleware;

