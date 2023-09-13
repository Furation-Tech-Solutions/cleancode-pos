import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { Outlet } from "../models/outlet-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface OutletDataSource {
  create(outlet: OutletModel): Promise<OutletEntity>; // Return type should be Promise of OutletEntity
  update(id: string, outlet: OutletModel): Promise<any>; // Return type should be Promise of OutletEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<OutletEntity | null>; // Return type should be Promise of OutletEntity or null
  getAllOutlets(): Promise<OutletEntity[]>; // Return type should be Promise of an array of OutletEntity
}

export class OutletDataSourceImpl implements OutletDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(outlet: OutletModel): Promise<OutletEntity> {
    const existingOutlet = await Outlet.findOne({ gstNo: outlet.gstNo });
    if (existingOutlet) {
      throw ApiError.emailExits()
    }

    const outletData = new Outlet(outlet);

    const createdOutlet = await outletData.save();

    return createdOutlet.toObject();
  }

  async update(id: string, outlet: OutletModel): Promise<any> {
    const updatedOutlet = await Outlet.findByIdAndUpdate(id, outlet, {
      new: true,
    }); // No need for conversion here
    return updatedOutlet ? updatedOutlet.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Outlet.findByIdAndDelete(id);
  }

  async read(id: string): Promise<OutletEntity | null> {
    const outlet = await Outlet.findById(id);
    return outlet ? outlet.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllOutlets(): Promise<OutletEntity[]> {
    const outlets = await Outlet.find();
    return outlets.map((outlet) => outlet.toObject()); // Convert to plain JavaScript objects before returning
  }
}

