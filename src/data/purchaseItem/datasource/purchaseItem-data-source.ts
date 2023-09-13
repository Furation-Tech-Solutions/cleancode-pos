import {
    PurchaseItemEntity,
    PurchaseItemModel,
} from "@domain/purchaseItem/entities/purchaseItem";
import { PurchaseItem } from "@data/purchaseItem/models/purchaseItem-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface PurchaseItemDataSource {
    create(purchaseItem: PurchaseItemModel): Promise<PurchaseItemEntity>;
    getById(id: string): Promise<PurchaseItemEntity | null>;
    getAllPurchaseItems(): Promise<PurchaseItemEntity[]>;
    update(id: string, purchaseItem: PurchaseItemModel): Promise<any>;
    delete(id: string): Promise<void>;
}

export class PurchaseItemDataSourceImpl implements PurchaseItemDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(
        purchaseItem: PurchaseItemModel
    ): Promise<PurchaseItemEntity> {
        const purchaseItemData = new PurchaseItem(purchaseItem);

        const createdPurchaseItem = await purchaseItemData.save();

        return createdPurchaseItem.toObject();
    }

    async getById(id: string): Promise<PurchaseItemEntity | null> {
        const purchaseItem = await PurchaseItem.findById(id);
        return purchaseItem ? purchaseItem.toObject() : null; // Convert to plain JavaScript object before returning
    }

    async getAllPurchaseItems(): Promise<PurchaseItemEntity[]> {
        try {
            const purchaseItems = await PurchaseItem.find();
            return purchaseItems.map((purchaseItem: mongoose.Document) =>
                purchaseItem.toObject()
            ); // Convert to plain JavaScript objects before returning
        } catch (error) {
            throw ApiError.notFound();
        }
    }

    async update(id: string, purchaseItem: PurchaseItemModel): Promise<any> {
        try {
            const updatedPurchaseItem = await PurchaseItem.findByIdAndUpdate(
                id,
                purchaseItem,
                {
                    new: true,
                }
            ); // No need for conversion here
            return updatedPurchaseItem ? updatedPurchaseItem.toObject() : null; // Convert to plain JavaScript object before returning
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async delete(id: string): Promise<void> {
        await PurchaseItem.findByIdAndDelete(id);
    }
}