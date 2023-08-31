import { VeriationsModel } from "@domain/veriations/entities/veriations";
import { Veriations } from "../models/veriations-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface VeriationsDataSource {
  create(veriations: VeriationsModel): Promise<any>; // Return type should be Promise of VeriationsEntity
  update(id: string, veriations: VeriationsModel): Promise<any>; // Return type should be Promise of VeriationsEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of VeriationsEntity or null
  getAllVeriationss(): Promise<any[]>; // Return type should be Promise of an array of VeriationsEntity
}

export class VeriationsDataSourceImpl implements VeriationsDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(veriations: VeriationsModel): Promise<any> {

    const existingVeriations = await Veriations.findOne({ name: veriations.name });
    if (existingVeriations) {
      throw ApiError.veriationsExists()
    }

    const veriationsData = new Veriations(veriations);

    const createdVeriations = await veriationsData.save();

    return createdVeriations.toObject();
  }

  async update(id: string, veriations: VeriationsModel): Promise<any> {
    const updatedVeriations = await Veriations.findByIdAndUpdate(id, veriations, {
      new: true,
    }); // No need for conversion here
    return updatedVeriations ? updatedVeriations.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Veriations.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const veriations = await Veriations.findById(id);
    return veriations ? veriations.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllVeriationss(): Promise<any[]> {
    const veriationss = await Veriations.find();
    return veriationss.map((veriations) => veriations.toObject());
  }
}

