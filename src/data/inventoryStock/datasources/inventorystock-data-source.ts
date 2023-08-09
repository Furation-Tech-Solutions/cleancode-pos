import { InventorystockEntity, InventorystockModel } from "@domain/inventoryStock/entities/inventorystock";
import mongoose from "mongoose";
import { Inventorystock } from "../models/inventorystock-model";
import ApiError from "@presentation/error-handling/api-error";


export interface InventorystockDataSource {
    create (inventorystock : InventorystockModel) : Promise<any>;
    delete (id:string) : Promise<void>;
    update (id:string, inventorystock: InventorystockModel) : Promise<any>;
    getAllInventorystock () : Promise<any[]>;
    read (id:string) : Promise<any | null>
}

export class InventorystockDataSourceImpl implements InventorystockDataSource {
    constructor(private db: mongoose.Connection) {};

    async create (inventorystock : InventorystockModel) : Promise<any> {
        const existingInventorystock= await Inventorystock.findOne({item: inventorystock.item});
        if(existingInventorystock!=null){
            // throw ApiError(itemExists)
        }
        const newInventorystock= new Inventorystock(inventorystock);
        const inventorystockData= await newInventorystock.save();

        return inventorystockData.toObject();
    }

    async delete(id:string) : Promise<void> {
        await  Inventorystock.findByIdAndDelete(id);
    }

    async update(id:string, inventorystock: InventorystockModel) : Promise<any> {
        const updatedInventorystock= await Inventorystock.findByIdAndUpdate(id, inventorystock, {new:true});
        return updatedInventorystock ? updatedInventorystock.toObject() : null;
    }

    async getAllInventorystock() : Promise<any[]> {
        const inventorystocks= await Inventorystock.find();
        return inventorystocks.map((inventorystock)=>inventorystock.toObject());
    }

    async read (id:string) : Promise<any | null> {
        const inventorystock= await Inventorystock.findById(id);
        return inventorystock? inventorystock.toObject() : null;
    }
}