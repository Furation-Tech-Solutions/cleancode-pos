import Joi, { Schema } from "joi";
import { DeliveryPartnerModel } from "@domain/deliveryPartner/entities/deliveryPartner";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedDeliveryPartnerData?: DeliveryPartnerModel; // Assuming DeliveryPartnerModel is the type for the validated deliveryPartner data
  }

const deliveryPartnerSchema: Schema<DeliveryPartnerModel> = Joi.object({
  DeliveryPartner_name: Joi.string().min(3).max(50).required().trim().messages({
    "string.min": "DeliveryPartner_name should have more than 3 characters",
    "string.max": "Maximum 50 characters are permitted",
    "any.required": "Please enter DeliveryPartner_name",
  }),
  email: Joi.string().required().trim().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Please enter email",
  }),
  phone: Joi.number().required().messages({ 
    "any.required": "Please enter phone" 
  }),
  address: Joi.string().min(5).max(100).required().trim().messages({
    "string.min": "Address should have more than 5 characters",
    "string.max": "Maximum 100 characters are permitted",
    "any.required": "Please enter address",
  }),
  // createdAt: Joi.date().default(Date.now),
  createdAt: Joi.date(),
  del_status: Joi.boolean().default("true")
});
  
function validateDeliveryPartnerMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const deliveryPartnerData: DeliveryPartnerModel = req.body; // Assuming the deliveryPartner data is sent in the request body

  const { error, value } = deliveryPartnerSchema.validate(deliveryPartnerData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated deliveryPartner data to the request object for further processing in the route handler
  req.validatedDeliveryPartnerData = value;
  next();
}

export default validateDeliveryPartnerMiddleware;

