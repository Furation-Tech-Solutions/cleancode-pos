import { ExpenseModel } from "@domain/expense/entities/expense";
import { Expense } from "../models/expense-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface ExpenseDataSource {
  create(expense: ExpenseModel): Promise<any>; // Return type should be Promise of ExpenseEntity
  update(id: string, expense: ExpenseModel): Promise<any>; // Return type should be Promise of ExpenseEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of ExpenseEntity or null
  getAllExpenses(): Promise<any[]>; // Return type should be Promise of an array of ExpenseEntity
}

export class ExpenseDataSourceImpl implements ExpenseDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(expense: ExpenseModel): Promise<any> {

    // const existingExpense = await Expense.findOne({ name: expense.name });
    // if (existingExpense) {
    //   throw ApiError.expenseExists()
    // }

    const expenseData = new Expense(expense);

    const createdExpense = await expenseData.save();

    return createdExpense.toObject();
  }

  async update(id: string, expense: ExpenseModel): Promise<any> {
    const updatedExpense = await Expense.findByIdAndUpdate(id, expense, {
      new: true,
    }); // No need for conversion here
    return updatedExpense ? updatedExpense.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Expense.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const expense = await Expense.findById(id);
    return expense ? expense.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllExpenses(): Promise<any[]> {
    const expenses = await Expense.find();
    return expenses.map((expense) => expense.toObject());
  }
}

