import { DeliverypartnerModel } from "@domain/deliverypartner/entities/deliverypartner";
import ApiError from "@presentation/error-handling/api-error";
import { Deliverypartner } from "../models/deliverypartner-model";
import mongoose from "mongoose";

export interface DeliverypartnerDataSource {
    create (deliverypartner : DeliverypartnerModel) : Promise<any>;
    update (id: string, deliverypartner:DeliverypartnerModel) : Promise<any>;
    delete (id: string) : Promise<void>;
    read (id: string) : Promise<any | null>;
    getAllDeliverypartner() :  Promise<any[]>;
}

export class DeliverypartnerDataSourceImpl implements DeliverypartnerDataSource {
    constructor(private db: mongoose.Connection) {}
    async create(deliverypartner : DeliverypartnerModel) : Promise<any> {
        const existingDeliverypartner = await Deliverypartner.findOne({ phone: deliverypartner.phone });

        if (existingDeliverypartner) {
            throw ApiError.emailExits();
        }

        const DeliverypartnerData = new Deliverypartner(deliverypartner);
        const createdDeliverypartner = await DeliverypartnerData.save();

        return createdDeliverypartner.toObject();
    }
    async update(id: string, deliverypartner: DeliverypartnerModel): Promise<any> {
        const updatedDeliverypartner = await Deliverypartner.findByIdAndUpdate(id, deliverypartner, {
          new: true,
        });
        return updatedDeliverypartner ? updatedDeliverypartner.toObject() : null;
    }
    
    async delete(id: string): Promise<void> {
    await Deliverypartner.findByIdAndDelete(id);
    }
    
    async read(id: string): Promise<any | null> {
        const deliverypartner = await Deliverypartner.findById(id);
        return deliverypartner ? deliverypartner.toObject() : null;
    }
    
    async getAllDeliverypartner(): Promise<any[]> {
        const deliverypartner = await Deliverypartner.find();
        return deliverypartner.map((deliverypartner) => deliverypartner.toObject());
    }
}