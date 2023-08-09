import { IngredientModel } from "@domain/ingredient/entities/ingredient";
import { Ingredient } from "../models/ingredient-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
// import ApiError from "@presentation/error-handling/api-error";
export interface IngredientDataSource {
  create(ingredient: IngredientModel): Promise<any>; // Return type should be Promise of IngredientEntity
  update(id: string, ingredient: IngredientModel): Promise<any>; // Return type should be Promise of IngredientEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of IngredientEntity or null
  getAllIngredients(): Promise<any[]>; // Return type should be Promise of an array of IngredientEntity
}

export class IngredientDataSourceImpl implements IngredientDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(ingredient: IngredientModel): Promise<any> {

    const existingTable = await Ingredient.findOne({ name: ingredient.name });
    if (existingTable) {
      throw ApiError.ingredientCategoryExits()
    }

    const ingredientData = new Ingredient(ingredient);

    const createdIngredient = await ingredientData.save();
    
    return createdIngredient.toObject();
  }

  async update(id: string, ingredient: IngredientModel): Promise<any> {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(id, ingredient, {
      new: true,
    }); // No need for conversion here
    return updatedIngredient ? updatedIngredient.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Ingredient.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const ingredient = await Ingredient.findById(id);
    return ingredient ? ingredient.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllIngredients(): Promise<any[]> {
    const ingredients = await Ingredient.find();
    return ingredients.map((ingredient) => ingredient.toObject()); // Convert to plain JavaScript objects before returning
  }
}
