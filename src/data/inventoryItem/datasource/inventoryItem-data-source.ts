import {
  InventoryItemEntity,
  InventoryItemModel,
} from "@domain/inventoryItem/entities/inventoryItem";
import { InventoryItem } from "@data/inventoryItem/models/inventoryItem-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InventoryItemDataSource {
  create(inventoryItem: InventoryItemModel): Promise<InventoryItemEntity>;
  getById(id: string): Promise<InventoryItemEntity | null>;
  getAllInventoryItems(): Promise<InventoryItemEntity[]>;
  update(id: string, inventoryItem: InventoryItemModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class InventoryItemDataSourceImpl implements InventoryItemDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(
    inventoryItem: InventoryItemModel
  ): Promise<InventoryItemEntity> {
    const inventoryItemData = new InventoryItem(inventoryItem);

    const createdInventoryItem = await inventoryItemData.save();

    return createdInventoryItem.toObject();
  }

  async getById(id: string): Promise<InventoryItemEntity | null> {
    const inventoryItem = await InventoryItem.findById(id);
    return inventoryItem ? inventoryItem.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInventoryItems(): Promise<InventoryItemEntity[]> {
    try {
      const inventoryItems = await InventoryItem.find();
      return inventoryItems.map((inventoryItem: mongoose.Document) =>
        inventoryItem.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(id: string, inventoryItem: InventoryItemModel): Promise<any> {
    try {
      const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(
        id,
        inventoryItem,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedInventoryItem ? updatedInventoryItem.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await InventoryItem.findByIdAndDelete(id);
  }
}