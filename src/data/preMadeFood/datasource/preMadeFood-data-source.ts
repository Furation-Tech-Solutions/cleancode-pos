import { PreMadeFoodModel } from "@domain/preMadeFood/entities/preMadeFood";
import { PreMadeFood } from "../models/preMadeFood-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface PreMadeFoodDataSource {
  create(preMadeFood: PreMadeFoodModel): Promise<any>; // Return type should be Promise of PreMadeFoodEntity
  update(id: string, preMadeFood: PreMadeFoodModel): Promise<any>; // Return type should be Promise of PreMadeFoodEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of PreMadeFoodEntity or null
  getAllPreMadeFoods(): Promise<any[]>; // Return type should be Promise of an array of PreMadeFoodEntity
}

export class PreMadeFoodDataSourceImpl implements PreMadeFoodDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(preMadeFood: PreMadeFoodModel): Promise<any> {

    const existingPreMadeFood = await PreMadeFood.findOne({ name: preMadeFood.name });
    if (existingPreMadeFood) {
      throw ApiError.preMadeFoodExists()
    }

    const preMadeFoodData = new PreMadeFood(preMadeFood);

    const createdPreMadeFood = await preMadeFoodData.save();

    return createdPreMadeFood.toObject();
  }

  async update(id: string, preMadeFood: PreMadeFoodModel): Promise<any> {
    const updatedPreMadeFood = await PreMadeFood.findByIdAndUpdate(id, preMadeFood, {
      new: true,
    }); // No need for conversion here
    return updatedPreMadeFood ? updatedPreMadeFood.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await PreMadeFood.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const preMadeFood = await PreMadeFood.findById(id);
    return preMadeFood ? preMadeFood.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllPreMadeFoods(): Promise<any[]> {
    const preMadeFoods = await PreMadeFood.find();
    return preMadeFoods.map((preMadeFood) => preMadeFood.toObject());
  }
}

