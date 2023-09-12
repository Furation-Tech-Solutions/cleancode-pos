import { OutletStockModel } from "@domain/outletStock/entities/outletStock";
import { OutletStock } from "../models/outletStock-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface OutletStockDataSource {
  create(outletStock: OutletStockModel): Promise<any>; // Return type should be Promise of OutletStockEntity
  update(id: string, outletStock: OutletStockModel): Promise<any>; // Return type should be Promise of OutletStockEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of OutletStockEntity or null
  getAllOutletStocks(): Promise<any[]>; // Return type should be Promise of an array of OutletStockEntity
}

export class OutletStockDataSourceImpl implements OutletStockDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(outletStock: OutletStockModel): Promise<any> {

    // const existingOutletStock = await OutletStock.findOne({ name: outletStock.name });
    // if (existingOutletStock) {
    //   throw ApiError.outletStockExists()
    // }

    const outletStockData = new OutletStock(outletStock);

    const createdOutletStock = await outletStockData.save();

    return createdOutletStock.toObject();
  }

  async update(id: string, outletStock: OutletStockModel): Promise<any> {
    const updatedOutletStock = await OutletStock.findByIdAndUpdate(id, outletStock, {
      new: true,
    }); // No need for conversion here
    return updatedOutletStock ? updatedOutletStock.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await OutletStock.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const outletStock = await OutletStock.findById(id);
    return outletStock ? outletStock.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllOutletStocks(): Promise<any[]> {
    const outletStocks = await OutletStock.find();
    return outletStocks.map((outletStock) => outletStock.toObject());
  }
}

