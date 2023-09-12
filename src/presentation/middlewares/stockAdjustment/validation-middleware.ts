import Joi, { Schema } from "joi";
import { StockAdjustmentModel } from "@domain/stockAdjustment/entities/stockAdjustment";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedStockAdjustmentData?: StockAdjustmentModel; // Assuming StockAdjustmentModel is the type for the validated StockAdjustment data
  }

const stockAdjustmentSchema: Schema<StockAdjustmentModel> = Joi.object({
  outletStockId: Joi.array().required(),
  adjustmentType: Joi.string()
    .max(100)
    .min(3)
    .trim()
    .required()
    .messages({
      'string.max': 'Maximum 100 characters are permitted for adjustmentType.',
      'string.min': 'stockAdjustment_type should have more than 3 characters.',
      'string.empty': 'Please enter stockAdjustment_type.',
    }),
  adjustmentDate: Joi.date().default(Date.now),
  quantityChange: Joi.number().required(),
  del_status: Joi.string().default(true),
  });
  
function validateStockAdjustmentMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const stockAdjustmentData: StockAdjustmentModel = req.body; // Assuming the stockAdjustment data is sent in the request body

  const { error, value } = stockAdjustmentSchema.validate(stockAdjustmentData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated stockAdjustment data to the request object for further processing in the route handler
  req.validatedStockAdjustmentData = value;
  next();
}

export default validateStockAdjustmentMiddleware;

