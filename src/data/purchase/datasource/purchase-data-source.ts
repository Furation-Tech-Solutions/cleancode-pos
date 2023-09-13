import {
  PurchaseEntity,
  PurchaseModel,
} from "@domain/purchase/entities/purchase";
import { Purchase } from "@data/purchase/models/purchase-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface PurchaseDataSource {
  create(purchase: PurchaseModel): Promise<PurchaseEntity>;
  update(id: string, purchase: PurchaseModel): Promise<any>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<PurchaseEntity | null>;
  getAllPurchases(): Promise<PurchaseEntity[]>;
}

export class PurchaseDataSourceImpl implements PurchaseDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(purchase: PurchaseModel): Promise<PurchaseEntity> {
    const purchaseData = new Purchase(purchase);

    const createdPurchase = await purchaseData.save();

    return createdPurchase.toObject();
  }

  async getById(id: string): Promise<PurchaseEntity | null> {
    const purchase = await Purchase.findById(id);
    return purchase ? purchase.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllPurchases(): Promise<PurchaseEntity[]> {
    try {
      const purchases = await Purchase.find();
      return purchases.map((purchases: mongoose.Document) =>
        purchases.toObject()
      ); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(id: string, purchase: PurchaseModel): Promise<any> {
    try {
      const updatedPurchase = await Purchase.findByIdAndUpdate(id, purchase, {
        new: true,
      }); // No need for conversion here
      return updatedPurchase ? updatedPurchase.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await Purchase.findByIdAndDelete(id);
  }
}