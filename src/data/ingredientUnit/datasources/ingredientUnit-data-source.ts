import { IngredientUnitModel } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnit } from "../models/ingredientUnit-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
// import ApiError from "@presentation/error-handling/api-error";
export interface IngredientUnitDataSource {
  create(ingredientUnit: IngredientUnitModel): Promise<any>; // Return type should be Promise of IngredientUnitEntity
  update(id: string, ingredientUnit: IngredientUnitModel): Promise<any>; // Return type should be Promise of IngredientUnitEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of IngredientUnitEntity or null
  getAllIngredientUnits(): Promise<any[]>; // Return type should be Promise of an array of IngredientUnitEntity
}

export class IngredientUnitDataSourceImpl implements IngredientUnitDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(ingredientUnit: IngredientUnitModel): Promise<any> {

    const existingTable = await IngredientUnit.findOne({ ingredientUnit_name: ingredientUnit.ingredientUnit_name });
    if (existingTable) {
      throw ApiError.ingredientUnitNameExits()
    }

    const ingredientUnitData = new IngredientUnit(ingredientUnit);

    const createdIngredientUnit = await ingredientUnitData.save();
    
    return createdIngredientUnit.toObject();
  }

  async update(id: string, ingredientUnit: IngredientUnitModel): Promise<any> {
    const updatedIngredientUnit = await IngredientUnit.findByIdAndUpdate(id, ingredientUnit, {
      new: true,
    }); // No need for conversion here
    return updatedIngredientUnit ? updatedIngredientUnit.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await IngredientUnit.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const ingredientUnit = await IngredientUnit.findById(id);
    return ingredientUnit ? ingredientUnit.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllIngredientUnits(): Promise<any[]> {
    const ingredientUnits = await IngredientUnit.find();
    return ingredientUnits.map((ingredientUnit) => ingredientUnit.toObject()); // Convert to plain JavaScript objects before returning
  }
}
