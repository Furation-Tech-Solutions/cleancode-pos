import {
  InventoryBillingEntity,
  InventoryBillingModel,
} from "@domain/inventoryBilling/entities/inventoryBilling";
import { InventoryBilling } from "@data/inventoryBilling/models/inventoryBilling-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InventoryBillingDataSource {
  create(
    inventoryBilling: InventoryBillingModel
  ): Promise<InventoryBillingEntity>;
  getById(id: string): Promise<InventoryBillingEntity | null>;
  getAllInventoryBillings(): Promise<InventoryBillingEntity[]>;
  update(id: string, inventoryBilling: InventoryBillingModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class InventoryBillingDataSourceImpl implements InventoryBillingDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(
    inventoryBilling: InventoryBillingModel
  ): Promise<InventoryBillingEntity> {
    const inventoryBillingData = new InventoryBilling(inventoryBilling);

    const createdInventoryBilling = await inventoryBillingData.save();

    return createdInventoryBilling.toObject();
  }

  async getById(id: string): Promise<InventoryBillingEntity | null> {
    const inventoryBilling = await InventoryBilling.findById(id);
    return inventoryBilling ? inventoryBilling.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllInventoryBillings(): Promise<InventoryBillingEntity[]> {
    try {
      const inventoryBillings = await InventoryBilling.find();
      return inventoryBillings.map((inventoryBilling: mongoose.Document) =>
        inventoryBilling.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(
    id: string,
    inventoryBilling: InventoryBillingModel
  ): Promise<any> {
    try {
      const updatedInventoryBilling = await InventoryBilling.findByIdAndUpdate(
        id,
        inventoryBilling,
        {
          new: true,
        }
      ); // No need for conversion here
      return updatedInventoryBilling
        ? updatedInventoryBilling.toObject()
        : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await InventoryBilling.findByIdAndDelete(id);
  }
}
