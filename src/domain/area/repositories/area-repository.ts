import {AreaModel,AreaEntity } from "@domain/area/entities/area";

export interface AreaRepository {
  createArea(area: AreaModel): Promise<AreaEntity>;
  deleteArea(id: string): Promise<void>;
  updateArea(id: string, data: AreaModel): Promise<AreaEntity>;
  getAreas(): Promise<AreaEntity[]>;
  getAreaById(id: string): Promise<AreaEntity | null>;
}