import { SupplierEntity,SupplierModel } from "@domain/supplier/entities/supplier";
import { Supplier } from "../models/supplier-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface SupplierDataSource {
  create(supplier: SupplierModel): Promise<SupplierEntity>; // Return type should be Promise of SupplierEntity
  update(id: string, supplier: SupplierModel): Promise<any>; // Return type should be Promise of SupplierEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<SupplierEntity | null>; // Return type should be Promise of SupplierEntity or null
  getAllSuppliers(): Promise<SupplierEntity[]>; // Return type should be Promise of an array of SupplierEntity
}

export class SupplierDataSourceImpl implements SupplierDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(supplier: SupplierModel): Promise<SupplierEntity> {
    const existingSupplier = await Supplier.findOne({
      contact: supplier.contact,
    });
    if (existingSupplier) {
      throw ApiError.emailExits();
    }

    const supplierData = new Supplier(supplier);

    const createdSupplier = await supplierData.save();

    return createdSupplier.toObject();
  }

  async update(id: string, supplier: SupplierModel): Promise<any> {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplier, {
      new: true,
    }); // No need for conversion here
    return updatedSupplier ? updatedSupplier.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Supplier.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const supplier = await Supplier.findById(id);
    return supplier ? supplier.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllSuppliers(): Promise<SupplierEntity[]> {
    try {
      const suppliers = await Supplier.find();
      return suppliers.map((suppliers: mongoose.Document) =>
        suppliers.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }
}

