import Joi, { Schema } from "joi";
import { AreaModel } from "@domain/area/entities/area";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedAreaData?: AreaModel; // Assuming AreaModel is the type for the validated Area data
  }

const areaSchema: Schema<AreaModel> = Joi.object({
  outletCode_byId: Joi.array().required().messages({
    'any.required': 'Please enter outlet_id',
    'objectId': 'Invalid outlet_id format. It should be a valid ObjectId.',
  }),
  area_name: Joi.string().required().min(3).max(100).messages({
    "string.base": "Area name should be a string",
    "any.required": "Area name is required",
    "string.empty": "Area name must not be empty",
    "string.min": "Area name should have at least {3} characters",
    "string.max": "Area name should have at most {100} characters",
  }),
  description: Joi.string().allow("").optional().max(200).messages({
    "string.base": "Description should be a string",
    "string.min": "Description should have at least {5} characters",
    "string.max": "Description should have at most {200} characters",
  }),
  createdBy: Joi.date(),
  phone: Joi.number().required().messages({ 
    "any.required": "Please enter phone" 
  }),
  del_status: Joi.string().default(true),
  });
  
function validateAreaMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const areaData: AreaModel = req.body; // Assuming the area data is sent in the request body

  const { error, value } = areaSchema.validate(areaData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated area data to the request object for further processing in the route handler
  req.validatedAreaData = value;
  next();
}

export default validateAreaMiddleware;

