import Joi, { Schema } from "joi";
import { TableModel } from "@domain/table/entities/table";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedTableData?: TableModel; // Assuming TableModel is the type for the validated table data
  }

const tableSchema: Schema<TableModel> = Joi.object({
    area_id: Joi.string().required(),
    outlet_id: Joi.string().required(),
    personName: Joi.string().min(3).max(50).required(),
    phone_number: Joi.string().max(10).required(),
    sit_capacity: Joi.number().min(1).max(10).required(),
    position: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(100).allow(null).default(null),
    del_status: Joi.string().default(true),
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

