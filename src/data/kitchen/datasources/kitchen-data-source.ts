import { Kitchen } from "../models/kitchen-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { KitchenModel } from "@domain/kitchen/entities/kitchen";
export interface KitchenDataSource {
  create(kitchen: KitchenModel): Promise<any>; // Return type should be Promise of KitchenEntity
  update(id: string, kitchen: KitchenModel): Promise<any>; // Return type should be Promise of KitchenEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of KitchenEntity or null
  getAllkitchens(): Promise<any[]>; // Return type should be Promise of an array of KitchenEntity
}

export class KitchenDataSourceImpl implements KitchenDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(kitchen: KitchenModel): Promise<any> {
    const existingKitchen = await Kitchen.findOne({kitchen_code: kitchen.kitchen_code});
    if (existingKitchen) {
      throw ApiError.kitchen_codeExists();
    }

    const kitchenData = new Kitchen(kitchen);

    const createKitchen = await kitchenData.save();
    
    return createKitchen.toObject();
  }

  async update(id: string, kitchen: KitchenModel): Promise<any> {
    const updatedKitchen = await Kitchen.findByIdAndUpdate(id, kitchen, {
      new: true,
    }); // No need for conversion here
    return updatedKitchen ? updatedKitchen.toObject() :null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Kitchen.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const kitchen = await Kitchen.findById(id);
    return kitchen ? kitchen.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllkitchens(): Promise<any[]> {
    const kitchens = await Kitchen.find();
    return kitchens.map((kitchen) => kitchen.toObject()); // Convert to plain JavaScript objects before returning
  }
}
