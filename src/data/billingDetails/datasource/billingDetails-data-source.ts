import { BillingDetailsModel } from "@domain/billingDetails/entities/billingDetails";
import { BillingDetails } from "../models/billingDetails-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface BillingDetailsDataSource {
  create(billingDetails: BillingDetailsModel): Promise<any>; // Return type should be Promise of BillingDetailsEntity
  update(id: string, billingDetails: BillingDetailsModel): Promise<any>; // Return type should be Promise of BillingDetailsEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of BillingDetailsEntity or null
  getAllBillingDetailss(): Promise<any[]>; // Return type should be Promise of an array of BillingDetailsEntity
}

export class BillingDetailsDataSourceImpl implements BillingDetailsDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(billingDetails: BillingDetailsModel): Promise<any> {

    // const existingBillingDetails = await BillingDetails.findOne({ gstNo: billingDetails.gstNo });
    // if (existingBillingDetails) {
    //   throw ApiError.gstExists()
    // }

    const billingDetailsData = new BillingDetails(billingDetails);

    const createdBillingDetails = await billingDetailsData.save();

    return createdBillingDetails.toObject();
  }

  async update(id: string, billingDetails: BillingDetailsModel): Promise<any> {
    const updatedBillingDetails = await BillingDetails.findByIdAndUpdate(id, billingDetails, {
      new: true,
    }); // No need for conversion here
    return updatedBillingDetails ? updatedBillingDetails.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await BillingDetails.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const billingDetails = await BillingDetails.findById(id);
    return billingDetails ? billingDetails.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllBillingDetailss(): Promise<any[]> {
    const billingDetailss = await BillingDetails.find();
    return billingDetailss.map((billingDetails) => billingDetails.toObject());
  }
}

