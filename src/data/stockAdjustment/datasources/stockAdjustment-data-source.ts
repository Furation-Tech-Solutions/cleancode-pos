import { StockAdjustmentModel, StockAdjustmentEntity } from "@domain/stockAdjustment/entities/stockAdjustment";
import { StockAdjustment } from "../models/stockAdjustment-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface StockAdjustmentDataSource {
  create(stockAdjustment: StockAdjustmentModel): Promise<any>; // Return type should be Promise of StockAdjustmentEntity
  update(id: string, stockAdjustment: StockAdjustmentModel): Promise<any>; // Return type should be Promise of StockAdjustmentEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of StockAdjustmentEntity or null
  getAllStockAdjustments(): Promise<any[]>; // Return type should be Promise of an array of StockAdjustmentEntity
}

export class StockAdjustmentDataSourceImpl implements StockAdjustmentDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(stockAdjustment: StockAdjustmentModel): Promise<any> {
    // const existingStockAdjustment = await StockAdjustment.findOne({outlet_code: stockAdjustment.outlet_code});
    // if (existingStockAdjustment) {
    //   throw ApiError.stockAdjustmentNameExists()
    // }

    const stockAdjustmentData = new StockAdjustment(stockAdjustment);

    const createStockAdjustment = await stockAdjustmentData.save();
    
    return createStockAdjustment.toObject();
  }

  async update(id: string, stockAdjustment: StockAdjustmentModel): Promise<any> {
    const updatedStockAdjustment = await StockAdjustment.findByIdAndUpdate(id, stockAdjustment, {
      new: true,
    }); // No need for conversion here
    return updatedStockAdjustment ? updatedStockAdjustment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await StockAdjustment.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const stockAdjustment = await StockAdjustment.findById(id);
    return stockAdjustment ? stockAdjustment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllStockAdjustments(): Promise<any[]> {
    const stockAdjustments = await StockAdjustment.find();
    return stockAdjustments.map((stockAdjustment) => stockAdjustment.toObject()); // Convert to plain JavaScript objects before returning
  }
}
