import Joi, { Schema } from "joi";
import { OutletStockModel } from "@domain/outletStock/entities/outletStock";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedOutletStockData?: OutletStockModel; // Assuming OutletStockModel is the type for the validated outletStock data
  }

const outletStockSchema: Schema<OutletStockModel> = Joi.object({
  outletCode_byId: Joi.array()
    .items(Joi.string().required())
    .required(),
  items: Joi.string().max(200).allow(null).trim().default(null),
  qty: Joi.number().required().allow(null).default(null).messages({
    'any.required': 'Please enter Quantity',
  }),
  flag: Joi.string().max(50).allow(null).trim().default(null),
  del_status: Joi.string().default(true),
  });
  
function validateOutletStockMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const outletStockData: OutletStockModel = req.body; // Assuming the outletStock data is sent in the request body

  const { error, value } = outletStockSchema.validate(outletStockData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated outletStock data to the request object for further processing in the route handler
  req.validatedOutletStockData = value;
  next();
}

export default validateOutletStockMiddleware;

