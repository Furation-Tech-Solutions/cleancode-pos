import { ExpenseItemModel } from "@domain/expenseItem/entities/expenseItem";
import { ExpenseItem } from "../models/expenseItem-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface ExpenseItemDataSource {
  create(expenseItem: ExpenseItemModel): Promise<any>; // Return type should be Promise of ExpenseItemEntity
  update(id: string, expenseItem: ExpenseItemModel): Promise<any>; // Return type should be Promise of ExpenseItemEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of ExpenseItemEntity or null
  getAllExpenseItems(): Promise<any[]>; // Return type should be Promise of an array of ExpenseItemEntity
}

export class ExpenseItemDataSourceImpl implements ExpenseItemDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(expenseItem: ExpenseItemModel): Promise<any> {

    const existingExpenseItem = await ExpenseItem.findOne({ name: expenseItem.name });
    if (existingExpenseItem) {
      throw ApiError.expenseItemNameExists()
    }

    const expenseItemData = new ExpenseItem(expenseItem);

    const createdExpenseItem = await expenseItemData.save();

    return createdExpenseItem.toObject();
  }

  async update(id: string, expenseItem: ExpenseItemModel): Promise<any> {
    const updatedExpenseItem = await ExpenseItem.findByIdAndUpdate(id, expenseItem, {
      new: true,
    }); // No need for conversion here
    return updatedExpenseItem ? updatedExpenseItem.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await ExpenseItem.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const expenseItem = await ExpenseItem.findById(id);
    return expenseItem ? expenseItem.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllExpenseItems(): Promise<any[]> {
    const expenseItems = await ExpenseItem.find();
    return expenseItems.map((expenseItem) => expenseItem.toObject());
  }
}

