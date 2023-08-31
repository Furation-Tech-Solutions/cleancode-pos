import { ModifierModel } from "@domain/modifier/entities/modifier";
import { Modifier } from "../models/modifier-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface ModifierDataSource {
  create(modifier: ModifierModel): Promise<any>; // Return type should be Promise of ModifierEntity
  update(id: string, modifier: ModifierModel): Promise<any>; // Return type should be Promise of ModifierEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of ModifierEntity or null
  getAllModifiers(): Promise<any[]>; // Return type should be Promise of an array of ModifierEntity
}

export class ModifierDataSourceImpl implements ModifierDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(modifier: ModifierModel): Promise<any> {

    const existingModifier = await Modifier.findOne({ name: modifier.name });
    if (existingModifier) {
      throw ApiError.modifierExists()
    }

    const modifierData = new Modifier(modifier);

    const createdModifier = await modifierData.save();

    return createdModifier.toObject();
  }

  async update(id: string, modifier: ModifierModel): Promise<any> {
    const updatedModifier = await Modifier.findByIdAndUpdate(id, modifier, {
      new: true,
    }); // No need for conversion here
    return updatedModifier ? updatedModifier.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Modifier.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const modifier = await Modifier.findById(id);
    return modifier ? modifier.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllModifiers(): Promise<any[]> {
    const modifiers = await Modifier.find();
    return modifiers.map((modifier) => modifier.toObject());
  }
}

