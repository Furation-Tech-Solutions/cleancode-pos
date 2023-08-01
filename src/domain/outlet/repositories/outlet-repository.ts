import {OutletModel,OutletEntity } from "@domain/outlet/entities/outlet";

export interface OutletRepository {
  createOutlet(outlet: OutletModel): Promise<OutletEntity>;
  deleteOutlet(id: string): Promise<void>;
  updateOutlet(id: string, data: OutletModel): Promise<OutletEntity>;
  getOutlets(): Promise<OutletEntity[]>;
  getOutletById(id: string): Promise<OutletEntity | null>;
}