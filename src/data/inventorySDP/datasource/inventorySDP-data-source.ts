import {
    InventorySDPEntity,
    InventorySDPModel,
} from "@domain/inventorySDP/entities/inventorySDP";
import { InventorySDP } from "@data/inventorySDP/models/inventorySDP-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface InventorySDPDataSource {
    create(inventorySDP: InventorySDPModel): Promise<InventorySDPEntity>;
    getById(id: string): Promise<InventorySDPEntity | null>;
    getAllInventorySDPs(): Promise<InventorySDPEntity[]>;
    update(id: string, inventorySDP: InventorySDPModel): Promise<any>;
    delete(id: string): Promise<void>;
}

export class InventorySDPDataSourceImpl implements InventorySDPDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(
        inventorySDP: InventorySDPModel
    ): Promise<InventorySDPEntity> {
        const inventorySDPData = new InventorySDP(inventorySDP);

        const createdInventorySDP = await inventorySDPData.save();

        return createdInventorySDP.toObject();
    }

    async getById(id: string): Promise<InventorySDPEntity | null> {
        const inventorySDP = await InventorySDP.findById(id);
        return inventorySDP ? inventorySDP.toObject() : null; // Convert to plain JavaScript object before returning
    }

    async getAllInventorySDPs(): Promise<InventorySDPEntity[]> {
        try {
            const inventorySDPs = await InventorySDP.find();
            return inventorySDPs.map((inventorySDP: mongoose.Document) =>
                inventorySDP.toObject()
            ); // Convert to plain JavaScript objects before returning
        } catch (error) {
            throw ApiError.notFound();
        }
    }

    async update(id: string, inventorySDP: InventorySDPModel): Promise<any> {
        try {
            const updatedInventorySDP = await InventorySDP.findByIdAndUpdate(
                id,
                inventorySDP,
                {
                    new: true,
                }
            ); // No need for conversion here
            return updatedInventorySDP ? updatedInventorySDP.toObject() : null; // Convert to plain JavaScript object before returning
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async delete(id: string): Promise<void> {
        await InventorySDP.findByIdAndDelete(id);
    }
}