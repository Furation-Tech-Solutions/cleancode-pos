import { CuisineModel } from "@domain/cuisine/entities/cuisine";
import { Cuisine } from "../models/cuisine-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface CuisineDataSource {
  create(cuisine: CuisineModel): Promise<any>; // Return type should be Promise of CuisineEntity
  update(id: string, cuisine: CuisineModel): Promise<any>; // Return type should be Promise of CuisineEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of CuisineEntity or null
  getAllCuisines(): Promise<any[]>; // Return type should be Promise of an array of CuisineEntity
}

export class CuisineDataSourceImpl implements CuisineDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(cuisine: CuisineModel): Promise<any> {

    const existingCuisine = await Cuisine.findOne({ name: cuisine.name });
    if (existingCuisine) {
      throw ApiError.cuisineExists()
    }

    const cuisineData = new Cuisine(cuisine);

    const createdCuisine = await cuisineData.save();

    return createdCuisine.toObject();
  }

  async update(id: string, cuisine: CuisineModel): Promise<any> {
    const updatedCuisine = await Cuisine.findByIdAndUpdate(id, cuisine, {
      new: true,
    }); // No need for conversion here
    return updatedCuisine ? updatedCuisine.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Cuisine.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const cuisine = await Cuisine.findById(id);
    return cuisine ? cuisine.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllCuisines(): Promise<any[]> {
    const cuisines = await Cuisine.find();
    return cuisines.map((cuisine) => cuisine.toObject());
  }
}

