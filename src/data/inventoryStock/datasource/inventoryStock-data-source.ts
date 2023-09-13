import {
  InventoryStockEntity,
  InventoryStockModel,
} from "@domain/inventoryStock/entities/inventoryStock";
import { InventoryStock } from "@data/inventoryStock/models/inventoryStock-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InventoryStockDataSource {
  create(inventoryStock: InventoryStockModel): Promise<InventoryStockEntity>;
  getById(id: string): Promise<InventoryStockEntity | null>;
  getAllInventoryStocks(): Promise<InventoryStockEntity[]>;
  update(id: string, inventoryStock: InventoryStockModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class InventoryStockDataSourceImpl implements InventoryStockDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(
    inventoryStock: InventoryStockModel
  ): Promise<InventoryStockEntity> {
    const inventoryStockData = new InventoryStock(inventoryStock);

    const createdInventoryStock = await inventoryStockData.save();

    return createdInventoryStock.toObject();
  }

  async getById(id: string): Promise<InventoryStockEntity | null> {
    const inventoryStock = await InventoryStock.findById(id);
    return inventoryStock ? inventoryStock.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInventoryStocks(): Promise<InventoryStockEntity[]> {
    try {
      const inventoryStocks = await InventoryStock.find();
      return inventoryStocks.map((inventoryStock: mongoose.Document) =>
        inventoryStock.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(id: string, inventoryStock: InventoryStockModel): Promise<any> {
    try {
      const updatedInventoryStock = await InventoryStock.findByIdAndUpdate(
        id,
        inventoryStock,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedInventoryStock ? updatedInventoryStock.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await InventoryStock.findByIdAndDelete(id);
  }
}