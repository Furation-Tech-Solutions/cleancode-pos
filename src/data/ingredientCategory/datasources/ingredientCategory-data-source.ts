import { IngredientCategoryModel } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategory } from "../models/ingredientCategory-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
// import ApiError from "@presentation/error-handling/api-error";
export interface IngredientCategoryDataSource {
  create(ingredientCategory: IngredientCategoryModel): Promise<any>; // Return type should be Promise of IngredientCategoryEntity
  update(id: string, ingredientCategory: IngredientCategoryModel): Promise<any>; // Return type should be Promise of IngredientCategoryEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of IngredientCategoryEntity or null
  getAllIngredientCategorys(): Promise<any[]>; // Return type should be Promise of an array of IngredientCategoryEntity
}

export class IngredientCategoryDataSourceImpl implements IngredientCategoryDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(ingredientCategory: IngredientCategoryModel): Promise<any> {

    const existingTable = await IngredientCategory.findOne({ ingredientCategory_name: ingredientCategory.ingredientCategory_name });
    if (existingTable) {
      throw ApiError.ingredientCategoryExits()
    }

    const ingredientCategoryData = new IngredientCategory(ingredientCategory);

    const createdIngredientCategory = await ingredientCategoryData.save();
    
    return createdIngredientCategory.toObject();
  }

  async update(id: string, ingredientCategory: IngredientCategoryModel): Promise<any> {
    const updatedIngredientCategory = await IngredientCategory.findByIdAndUpdate(id, ingredientCategory, {
      new: true,
    }); // No need for conversion here
    return updatedIngredientCategory ? updatedIngredientCategory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await IngredientCategory.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const ingredientCategory = await IngredientCategory.findById(id);
    return ingredientCategory ? ingredientCategory.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllIngredientCategorys(): Promise<any[]> {
    const ingredientCategorys = await IngredientCategory.find();
    return ingredientCategorys.map((ingredientCategory) => ingredientCategory.toObject()); // Convert to plain JavaScript objects before returning
  }
}
