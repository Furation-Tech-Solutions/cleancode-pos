import { FoodComboModel } from "@domain/foodCombo/entities/foodCombo";
import { FoodCombo } from "../models/foodCombo-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface FoodComboDataSource {
  create(foodCombo: FoodComboModel): Promise<any>; // Return type should be Promise of FoodComboEntity
  update(id: string, foodCombo: FoodComboModel): Promise<any>; // Return type should be Promise of FoodComboEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of FoodComboEntity or null
  getAllFoodCombos(): Promise<any[]>; // Return type should be Promise of an array of FoodComboEntity
}

export class FoodComboDataSourceImpl implements FoodComboDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(foodCombo: FoodComboModel): Promise<any> {

    const existingFoodCombo = await FoodCombo.findOne({ name: foodCombo.name });
    if (existingFoodCombo) {
      throw ApiError.foodComboExists()
    }

    const foodComboData = new FoodCombo(foodCombo);

    const createdFoodCombo = await foodComboData.save();

    return createdFoodCombo.toObject();
  }

  async update(id: string, foodCombo: FoodComboModel): Promise<any> {
    const updatedFoodCombo = await FoodCombo.findByIdAndUpdate(id, foodCombo, {
      new: true,
    }); // No need for conversion here
    return updatedFoodCombo ? updatedFoodCombo.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await FoodCombo.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const foodCombo = await FoodCombo.findById(id);
    return foodCombo ? foodCombo.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllFoodCombos(): Promise<any[]> {
    const foodCombos = await FoodCombo.find();
    return foodCombos.map((foodCombo) => foodCombo.toObject());
  }
}

