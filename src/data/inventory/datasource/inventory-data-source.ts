import {
  InventoryEntity,
  InventoryModel,
} from "@domain/inventory/entities/inventory";
import { Inventory } from "../models/inventory-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InventoryDataSource {
  create(inventory: InventoryModel): Promise<InventoryEntity>;
  update(id: string, inventory: InventoryModel): Promise<any>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<InventoryEntity | null>;
  getAllInventory(): Promise<InventoryEntity[]>;
}

export class InventoryDataSourceImpl implements InventoryDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(inventory: InventoryModel): Promise<InventoryEntity> {
    
    const existinginventory = await Inventory.findOne({
      name: inventory.inventoryName,
    });
    
    if (existinginventory) {
      throw ApiError.inventory_nameExists();
    }

    const inventoryData = new Inventory(inventory);

    const createdInventory = await inventoryData.save();

    return createdInventory.toObject();
  }

  async update(id: string, inventory: InventoryModel): Promise<any> {
    try {
      
      const updatedInventory = await Inventory.findByIdAndUpdate(
        id,
        inventory,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedInventory ? updatedInventory.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await Inventory.findByIdAndDelete(id);
  }

  async getById(id: string): Promise<InventoryEntity | null> {
    const inventory = await Inventory.findById(id);
    return inventory ? inventory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInventory(): Promise<InventoryEntity[]> {
    try {
      const inventories = await Inventory.find();
      return inventories.map((inventory: mongoose.Document) =>
        inventory.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }
}
