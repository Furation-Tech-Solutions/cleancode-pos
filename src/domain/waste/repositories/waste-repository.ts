import {
  WasteModel,
  WasteEntity,
} from "@domain/waste/entities/waste";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface WasteRepository {
  createWaste(waste: WasteModel): Promise<Either<ErrorClass, WasteEntity>>;
  deleteWaste(id: string): Promise<Either<ErrorClass, void>>;
  getWastes(): Promise<Either<ErrorClass, WasteEntity[]>>;
  getWasteById(id: string): Promise<Either<ErrorClass, WasteEntity>>;
  updateWaste(
    id: string,
    data: WasteModel
  ): Promise<Either<ErrorClass, WasteEntity>>;
}
