import {AreaModel,AreaEntity } from "@domain/area/entities/area";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error"
export interface AreaRepository {
  createArea(area: AreaModel): Promise<Either<ErrorClass, AreaEntity>>;
  deleteArea(id: string): Promise<Either<ErrorClass, void>>;
  updateArea(id: string, data: AreaModel): Promise<Either<ErrorClass, AreaEntity>>;
  getAreas(): Promise<Either<ErrorClass, AreaEntity[]>>;
  getAreaById(id: string): Promise<Either<ErrorClass, AreaEntity | null>>;
}