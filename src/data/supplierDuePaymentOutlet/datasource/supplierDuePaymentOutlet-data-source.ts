import { SupplierDuePaymentOutletModel } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { SupplierDuePaymentOutlet } from "../models/supplierDuePaymentOutlet-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface SupplierDuePaymentOutletDataSource {
  create(supplierDuePaymentOutlet: SupplierDuePaymentOutletModel): Promise<any>; // Return type should be Promise of SupplierDuePaymentOutletEntity
  update(id: string, supplierDuePaymentOutlet: SupplierDuePaymentOutletModel): Promise<any>; // Return type should be Promise of SupplierDuePaymentOutletEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of SupplierDuePaymentOutletEntity or null
  getAllSupplierDuePaymentOutlets(): Promise<any[]>; // Return type should be Promise of an array of SupplierDuePaymentOutletEntity
}

export class SupplierDuePaymentOutletDataSourceImpl implements SupplierDuePaymentOutletDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(supplierDuePaymentOutlet: SupplierDuePaymentOutletModel): Promise<any> {

    // const existingSupplierDuePaymentOutlet = await SupplierDuePaymentOutlet.findOne({ supplier_id: supplierDuePaymentOutlet.supplier_id });
    // if (existingSupplierDuePaymentOutlet) {
    //   throw ApiError.supplierIdExists()
    // }

    const supplierDuePaymentOutletData = new SupplierDuePaymentOutlet(supplierDuePaymentOutlet);

    const createdSupplierDuePaymentOutlet = await supplierDuePaymentOutletData.save();

    return createdSupplierDuePaymentOutlet.toObject();
  }

  async update(id: string, supplierDuePaymentOutlet: SupplierDuePaymentOutletModel): Promise<any> {
    const updatedSupplierDuePaymentOutlet = await SupplierDuePaymentOutlet.findByIdAndUpdate(id, supplierDuePaymentOutlet, {
      new: true,
    }); // No need for conversion here
    return updatedSupplierDuePaymentOutlet ? updatedSupplierDuePaymentOutlet.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await SupplierDuePaymentOutlet.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const supplierDuePaymentOutlet = await SupplierDuePaymentOutlet.findById(id);
    return supplierDuePaymentOutlet ? supplierDuePaymentOutlet.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllSupplierDuePaymentOutlets(): Promise<any[]> {
    const supplierDuePaymentOutlets = await SupplierDuePaymentOutlet.find();
    return supplierDuePaymentOutlets.map((supplierDuePaymentOutlet) => supplierDuePaymentOutlet .toObject());
  }
}

