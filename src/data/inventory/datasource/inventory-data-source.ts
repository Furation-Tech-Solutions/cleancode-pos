import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";
import { Inventory } from "../models/inventory-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface InventoryDataSource {
  create(inventory: InventoryModel): Promise<any>; // Return type should be Promise of AdminEntity
  update(id: string, inventory: InventoryModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of AdminEntity or null
  getAllInventory(): Promise<any[]>; // Return type should be Promise of an array of AdminEntity
}

export class InventoryDataSourceImpl implements InventoryDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(inventory: InventoryModel): Promise<any> {
    const existinginventory = await Inventory.findOne({ name: inventory.name });
    if (existinginventory) {
      throw ApiError.emailExits()
    }

    const inventoryData = new Inventory(inventory);

    const createdInventory = await inventoryData.save();

    return createdInventory.toObject();
  }

  async update(id: string, inventory: InventoryModel): Promise<any> {
    const updatedInventory = await Inventory.findByIdAndUpdate(id, inventory, {
      new: true,
    }); // No need for conversion here
    return updatedInventory ? updatedInventory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Inventory.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const inventory = await Inventory.findById(id);
    return inventory ? inventory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInventory(): Promise<any[]> {
    const inventorys = await Inventory.find();
    return inventorys.map((inventory) => inventory.toObject()); // Convert to plain JavaScript objects before returning
  }
}

