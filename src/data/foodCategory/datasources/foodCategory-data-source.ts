import { FoodCategoryModel } from "@domain/foodCategory/entities/foodCategory";
import { FoodCategory } from "../models/foodCategory-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface FoodCategoryDataSource {
  create(foodCategory: FoodCategoryModel): Promise<any>; // Return type should be Promise of FoodCategoryEntity
  update(id: string, foodCategory: FoodCategoryModel): Promise<any>; // Return type should be Promise of FoodCategoryEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of FoodCategoryEntity or null
  getAllFoodCategorys(): Promise<any[]>; // Return type should be Promise of an array of FoodCategoryEntity
}

export class FoodCategoryDataSourceImpl implements FoodCategoryDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(foodCategory: FoodCategoryModel): Promise<any> {
    const existingFoodCategory = await FoodCategory.findOne({ foodCategory_Name: foodCategory.foodCategory_Name });
    if (existingFoodCategory) {
      throw ApiError.foodCategoryExits()
    }

    const foodCategoryData = new FoodCategory(foodCategory);

    const createdFoodCategory = await foodCategoryData.save();
    
    return createdFoodCategory.toObject();
  }

  async update(id: string, foodCategory: FoodCategoryModel): Promise<any> {
    const updatedFoodCategory = await FoodCategory.findByIdAndUpdate(id, foodCategory, {
      new: true,
    }); // No need for conversion here
    return updatedFoodCategory ? updatedFoodCategory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await FoodCategory.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const foodCategory = await FoodCategory.findById(id);
    return foodCategory ? foodCategory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllFoodCategorys(): Promise<any[]> {
    const foodCategorys = await FoodCategory.find();
    return foodCategorys.map((foodCategory) => foodCategory.toObject()); // Convert to plain JavaScript objects before returning
  }
}
