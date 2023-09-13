import Joi, { Schema } from "joi";
import { OutletModel } from "@domain/outlet/entities/outlet";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedOutletData?: OutletModel; // Assuming OutletModel is the type for the validated Outlet data
  }

const outletSchema: Schema<OutletModel> = Joi.object({
    company_id: Joi.array().required().messages({
        "string.base": `Company ID should be a string`,
        "string.empty": `Company ID is required`,
        "any.required": `Company ID is required`,
      }),
      outlet_code: Joi.string().min(1).max(50).required().messages({
        "string.base": `Outlet code should be a string`,
        "string.empty": `Outlet code is required`,
        "string.min": `Outlet code should have at least {#limit} characters`,
        "string.max": `Outlet code should have at most {#limit} characters`,
        "any.required": `Outlet code is required`,
      }),
      address: Joi.string().min(5).max(200).required().messages({
        "string.base": `Address should be a string`,
        "string.empty": `Address is required`,
        "string.min": `Address should have at least {#limit} characters`,
        "string.max": `Address should have at most {#limit} characters`,
        "any.required": `Address is required`,
      }),
      ownerName: Joi.string().min(1).max(50).required().messages({
        "string.base": `owner Name should be a string`,
        "string.empty": `owner Name is required`,
        "string.min": `owner Name should have at least {#limit} characters`,
        "string.max": `owner Name should have at most {#limit} characters`,
        "any.required": `owner Name is required`,
      }),
      gstNo: Joi.string().min(1).max(50).required().messages({
        "string.base": `gstNo should be a string`,
        "string.empty": `gstNo is required`,
        "string.min": `gstNo should have at least {#limit} characters`,
        "string.max": `gstNo should have at most {#limit} characters`,
        "any.required": `gstNo is required`,
      }),
      outletType: Joi.string().min(1).max(50).required().messages({
        "string.base": `outlet Type should be a string`,
        "string.empty": `outlet Type is required`,
        "string.min": `outlet Type should have at least {#limit} characters`,
        "string.max": `outlet Type should have at most {#limit} characters`,
        "any.required": `outlet Type is required`,
      }),
      brandLogo: Joi.string().min(1).max(50).required().messages({
        "string.base": `brand Logo should be a string`,
        "string.empty": `brand Logo is required`,
        "string.min": `brand Logo should have at least {#limit} characters`,
        "string.max": `brand Logo should have at most {#limit} characters`,
        "any.required": `brand Logo is required`,
      }),
      phone: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .required()
        .messages({
          "number.base": `Phone number should be a number`,
          "number.empty": `Phone number is required`,
          "number.min": `Phone number should have at least {#limit} digits`,
          "number.max": `Phone number should have at most {#limit} digits`,
          "any.required": `Phone number is required`,
        }),
    createdAt: Joi.date(),
    del_status: Joi.string().valid("Live", "Deleted").default("Live").messages({
        "string.base": `Delete status should be a string`,
        "string.valid": `Value is not matched`,
        "any.only": `Invalid delete status value`,
    }),
  });
  
function validateOutletMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const outletData: OutletModel = req.body; // Assuming the outlet data is sent in the request body

  const { error, value } = outletSchema.validate(outletData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated outlet data to the request object for further processing in the route handler
  req.validatedOutletData = value;
  next();
}

export default validateOutletMiddleware;

