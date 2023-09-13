import { AreaModel, AreaEntity } from "@domain/area/entities/area";
import { Area } from "../models/area-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface AreaDataSource {
  create(area: AreaModel): Promise<any>; // Return type should be Promise of AreaEntity
  update(id: string, area: AreaModel): Promise<any>; // Return type should be Promise of AreaEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of AreaEntity or null
  getAllAreas(): Promise<any[]>; // Return type should be Promise of an array of AreaEntity
}

export class AreaDataSourceImpl implements AreaDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(area: AreaModel): Promise<any> {
    const existingArea = await Area.findOne({outletCode_byId: area.outletCode_byId});
    if (existingArea) {
      throw ApiError.areaNameExists()
    }

    const areaData = new Area(area);

    const createArea = await areaData.save();
    
    return createArea.toObject();
  }

  async update(id: string, area: AreaModel): Promise<any> {
    const updatedArea = await Area.findByIdAndUpdate(id, area, {
      new: true,
    }); // No need for conversion here
    return updatedArea ? updatedArea.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Area.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const area = await Area.findById(id);
    return area ? area.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllAreas(): Promise<any[]> {
    const areas = await Area.find();
    return areas.map((area) => area.toObject()); // Convert to plain JavaScript objects before returning
  }
}
