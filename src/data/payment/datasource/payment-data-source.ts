import { PaymentModel } from "@domain/payment/entities/payment";
import { Payment } from "../models/payment-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface PaymentDataSource {
  create(payment: PaymentModel): Promise<any>; // Return type should be Promise of PaymentEntity
  update(id: string, payment: PaymentModel): Promise<any>; // Return type should be Promise of PaymentEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of PaymentEntity or null
  getAllPayments(): Promise<any[]>; // Return type should be Promise of an array of PaymentEntity
}

export class PaymentDataSourceImpl implements PaymentDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(payment: PaymentModel): Promise<any> {

    const existingPayment = await Payment.findOne({ email: payment.email });
    if (existingPayment) {
      throw ApiError.emailExits()
    }

    const paymentData = new Payment(payment);

    const createdPayment = await paymentData.save();

    return createdPayment.toObject();
  }

  async update(id: string, payment: PaymentModel): Promise<any> {
    const updatedPayment = await Payment.findByIdAndUpdate(id, payment, {
      new: true,
    }); // No need for conversion here
    return updatedPayment ? updatedPayment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Payment.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const payment = await Payment.findById(id);
    return payment ? payment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllPayments(): Promise<any[]> {
    const payments = await Payment.find();
    return payments.map((payment) => payment.toObject());
  }
}

