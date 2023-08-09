import ApiError from "@presentation/error-handling/api-error";
import mongoose from "mongoose";
import { InventoryPurchaseItemModel } from "@domain/inventoryPurchaseItem/entities/inventoryPurchaseItem";
import { InventoryPurchaseItem } from "../models/inventoryPurchaseItem-model";

export interface InventoryPurchaseItemDataSource {
    create (inventoryPurchaseItem : InventoryPurchaseItemModel) : Promise<any>;
    update (id: string, inventoryPurchaseItem:InventoryPurchaseItemModel) : Promise<any>;
    delete (id: string) : Promise<void>;
    read (id: string) : Promise<any | null>;
    getAllInventoryPurchaseItem() :  Promise<any[]>;
}

export class InventoryPurchaseItemDataSourceImpl implements InventoryPurchaseItemDataSource {
    constructor(private db: mongoose.Connection) {}
    async create(inventoryPurchaseItem : InventoryPurchaseItemModel) : Promise<any> {
        const existingInventoryPurchaseItem = await InventoryPurchaseItem.findOne({ item: inventoryPurchaseItem.item });

        if (existingInventoryPurchaseItem) {
            // throw ApiError.numberExits();
        }

        const InventoryPurchaseItemData = new InventoryPurchaseItem(inventoryPurchaseItem);
        const createdInventoryPurchaseItem = await InventoryPurchaseItemData.save();

        return createdInventoryPurchaseItem.toObject();
    }
    async update(id: string, inventoryPurchaseItem: InventoryPurchaseItemModel): Promise<any> {
        const updatedinventoryPurchaseItem = await InventoryPurchaseItem.findByIdAndUpdate(id, inventoryPurchaseItem, {
          new: true,
        });
        return updatedinventoryPurchaseItem ? updatedinventoryPurchaseItem.toObject() : null;
    }
    
    async delete(id: string): Promise<void> {
    await InventoryPurchaseItem.findByIdAndDelete(id);
    }
    
    async read(id: string): Promise<any | null> {
        const inventoryPurchaseItem = await InventoryPurchaseItem.findById(id);
        return inventoryPurchaseItem ? inventoryPurchaseItem.toObject() : null;
    }
    
    async getAllInventoryPurchaseItem(): Promise<any[]> {
        const inventoryPurchaseItem = await InventoryPurchaseItem.find();
        return inventoryPurchaseItem.map((inventoryPurchaseItem) => inventoryPurchaseItem.toObject());
    }
}