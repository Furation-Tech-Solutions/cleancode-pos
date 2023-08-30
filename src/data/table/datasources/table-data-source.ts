import { TableModel } from "@domain/table/entities/table";
import { Table } from "../models/table-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface TableDataSource {
  create(personName: TableModel): Promise<any>; // Return type should be Promise of TableEntity
  update(id: string, table: TableModel): Promise<any>; // Return type should be Promise of TableEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of TableEntity or null
  getAllTables(): Promise<any[]>; // Return type should be Promise of an array of TableEntity
}

export class TableDataSourceImpl implements TableDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(table: TableModel): Promise<any> {
    const existingTable = await Table.findOne({ phone_number: table.phone_number });
    if (existingTable) {
      throw ApiError.phoneNumberExits()
    }

    const tableData = new Table(table);

    const createdTable = await tableData.save();
    
    return createdTable.toObject();
  }

  async update(id: string, table: TableModel): Promise<any> {
    const updatedTable = await Table.findByIdAndUpdate(id, table, {
      new: true,
    }); // No need for conversion here
    return updatedTable ? updatedTable.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Table.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const table = await Table.findById(id);
    return table ? table.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllTables(): Promise<any[]> {
    const tables = await Table.find();
    return tables.map((table) => table.toObject()); // Convert to plain JavaScript objects before returning
  }
}
