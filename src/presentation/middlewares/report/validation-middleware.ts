import Joi, { Schema } from "joi";
import { ReportModel } from "@domain/report/entities/report";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedReportData?: ReportModel; // Assuming ReportModel is the type for the validated Report data
  }

const reportSchema: Schema<ReportModel> = Joi.object({
  reportDate: Joi.date().default(new Date()),
  cashier: Joi.array().required(),
  totalSales: Joi.number().required(),
  totalProfit: Joi.number().required(),
  totalTax: Joi.number().default(0),
  totalDiscount: Joi.number().default(0),
  createdAt: Joi.date().default(new Date()),
  del_status: Joi.string().default(true),
  });
  
function validateReportMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const reportData: ReportModel = req.body; // Assuming the report data is sent in the request body

  const { error, value } = reportSchema.validate(reportData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated report data to the request object for further processing in the route handler
  req.validatedReportData = value;
  next();
}

export default validateReportMiddleware;

