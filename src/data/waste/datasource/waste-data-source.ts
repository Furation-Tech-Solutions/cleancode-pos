import {
  WasteEntity,
  WasteModel,
} from "@domain/waste/entities/waste";
import { Waste } from "@data/waste/models/waste-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface WasteDataSource {
  create(waste: WasteModel): Promise<WasteEntity>;
  getById(id: string): Promise<WasteEntity | null>;
  getAllWastes(): Promise<WasteEntity[]>;
  update(id: string, waste: WasteModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class WasteDataSourceImpl implements WasteDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(waste: WasteModel): Promise<WasteEntity> {
    const wasteData = new Waste(waste);

    const createdWaste = await wasteData.save();

    return createdWaste.toObject();
  }

  async getById(id: string): Promise<WasteEntity | null> {
    const waste = await Waste.findById(id);

    return waste ? waste.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllWastes(): Promise<WasteEntity[]> {
    try {
      const wastes = await Waste.find();
      return wastes.map((wastes: mongoose.Document) => wastes.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(id: string, waste: WasteModel): Promise<any> {
    try {
      const updatedWaste = await Waste.findByIdAndUpdate(id, waste, {
        new: true,
      }); // No need for conversion here
      return updatedWaste ? updatedWaste.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await Waste.findByIdAndDelete(id);
  }
}
