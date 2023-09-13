import mongoose from "mongoose";
import { Kot } from "../models/kot-model";
import { KotEntity, KotModel } from "@domain/kot/entities/kot";
import ApiError from "@presentation/error-handling/api-error";

export interface KotDataSource {
  create(kitchen: KotModel): Promise<any>;
  getAllKot(): Promise<any[]>; // Return type should be Promise of an array of Kot
  getById(id: string): Promise<KotEntity | null>;
  update(id: string, kot: KotModel): Promise<any>;
  delete(id: string): Promise<void>;
}
  

export class KotDataSourceImpl implements KotDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(kot: KotModel): Promise<any> {
    const existingKot = await Kot.findOne({ kot_number: kot.kotNumber });
    if (existingKot) {
      throw ApiError.kitchen_codeExists(); //add apierror code for kot
    }

    const kotData = new Kot(kot);

    const createKot = await kotData.save();

    return createKot.toObject();
  }

  async getAllKot(): Promise<any[]> {
    const kot = await Kot.find();
    return kot.map((kot) => kot.toObject()); // Convert to plain JavaScript objects before returning
  }

  async getById(id: string): Promise<KotEntity | null> {
    const kot = await Kot.findById(id);
    return kot ? kot.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async update(id: string, kot: KotModel): Promise<any> {
    try {
      const updatedKot = await Kot.findByIdAndUpdate(
        id,
        kot,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedKot ? updatedKot.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await Kot.findByIdAndDelete(id);
  }
}