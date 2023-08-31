import { FoodMenuModel } from "@domain/foodMenu/entities/foodMenu";
import { FoodMenu } from "../models/foodMenu-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface FoodMenuDataSource {
  create(foodMenu: FoodMenuModel): Promise<any>; // Return type should be Promise of FoodMenuEntity
  update(id: string, foodMenu: FoodMenuModel): Promise<any>; // Return type should be Promise of FoodMenuEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of FoodMenuEntity or null
  getAllFoodMenus(): Promise<any[]>; // Return type should be Promise of an array of FoodMenuEntity
}

export class FoodMenuDataSourceImpl implements FoodMenuDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(foodMenu: FoodMenuModel): Promise<any> {

    const existingFoodMenu = await FoodMenu.findOne({ name: foodMenu.name });
    if (existingFoodMenu) {
      throw ApiError.foodMenuExists()
    }

    const foodMenuData = new FoodMenu(foodMenu);

    const createdFoodMenu = await foodMenuData.save();

    return createdFoodMenu.toObject();
  }

  async update(id: string, foodMenu: FoodMenuModel): Promise<any> {
    const updatedFoodMenu = await FoodMenu.findByIdAndUpdate(id, foodMenu, {
      new: true,
    }); // No need for conversion here
    return updatedFoodMenu ? updatedFoodMenu.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await FoodMenu.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const foodMenu = await FoodMenu.findById(id);
    return foodMenu ? foodMenu.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllFoodMenus(): Promise<any[]> {
    const foodMenus = await FoodMenu.find();
    return foodMenus.map((foodMenu) => foodMenu.toObject());
  }
}

