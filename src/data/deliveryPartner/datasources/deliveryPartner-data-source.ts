import { DeliveryPartnerModel } from "@domain/deliveryPartner/entities/deliveryPartner";
import { DeliveryPartner } from "../models/deliveryPartner-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
// import ApiError from "@presentation/error-handling/api-error";
export interface DeliveryPartnerDataSource {
  create(deliveryPartner: DeliveryPartnerModel): Promise<any>; // Return type should be Promise of DeliveryPartnerEntity
  update(id: string, deliveryPartner: DeliveryPartnerModel): Promise<any>; // Return type should be Promise of DeliveryPartnerEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of DeliveryPartnerEntity or null
  getAllDeliveryPartners(): Promise<any[]>; // Return type should be Promise of an array of DeliveryPartnerEntity
}

export class DeliveryPartnerDataSourceImpl implements DeliveryPartnerDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(deliveryPartner: DeliveryPartnerModel): Promise<any> {

    const existingTable = await DeliveryPartner.findOne({ email: deliveryPartner.email });
    if (existingTable) {
      throw ApiError.emailExits()
    }

    const deliveryPartnerData = new DeliveryPartner(deliveryPartner);

    const createdDeliveryPartner = await deliveryPartnerData.save();
    
    return createdDeliveryPartner.toObject();
  }

  async update(id: string, deliveryPartner: DeliveryPartnerModel): Promise<any> {
    const updatedDeliveryPartner = await DeliveryPartner.findByIdAndUpdate(id, deliveryPartner, {
      new: true,
    }); // No need for conversion here
    return updatedDeliveryPartner ? updatedDeliveryPartner.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await DeliveryPartner.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const deliveryPartner = await DeliveryPartner.findById(id);
    return deliveryPartner ? deliveryPartner.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllDeliveryPartners(): Promise<any[]> {
    const deliveryPartners = await DeliveryPartner.find();
    return deliveryPartners.map((deliveryPartner) => deliveryPartner.toObject()); // Convert to plain JavaScript objects before returning
  }
}
