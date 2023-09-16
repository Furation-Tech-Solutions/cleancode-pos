import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import ApiError from "@presentation/error-handling/api-error";

const paymentModeEnum = {
  DEBITCARD: "Debit Card",
  CREDITCARD: "Credit Card",
  CASH: "Cash",
  UPI: "Upi",
  BANKTRANSFER: "BankTransfer",
};

interface PurchaseInput {
  inventoryId: string;
  supplierId: string;
  paymentMode: string;
  grandTotal?: number;
  amountDue?: number;
  amountPaid?: number;
  invoiceNumber: string;
  date: string;
  del_status: boolean;
}

const purchaseValidator = function (input: PurchaseInput): PurchaseInput {
  const purchaseSchema = Joi.object<PurchaseInput>({
    inventoryId: Joi.string().required(),
    supplierId: Joi.string().required(),
    paymentMode: Joi.string()
      .valid(...Object.values(paymentModeEnum))
      .default("Cash"),
    grandTotal: Joi.number().optional(),
    amountDue: Joi.number().optional(),
    amountPaid: Joi.number().optional(),
    invoiceNumber: Joi.string().required(),
    date: Joi.string().required(),
    del_status: Joi.boolean().default(true),
  });

  const { error, value } = purchaseSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors = error.details.map((value) => value.message);

    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validatePurchaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const validatedInput: PurchaseInput = purchaseValidator(body);
    req.body = validatedInput;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};

export default purchaseValidator;
