import {KitchenModel,KitchenEntity } from "@domain/kitchen/entities/kitchen";
import { Either } from "monet";
import  ErrorClass from "@presentation/error-handling/api-error";

export interface KitchenRepository {
  createKitchen(kitchen: KitchenModel): Promise<Either<ErrorClass, KitchenEntity>>;
  deleteKitchen(id: string): Promise<Either<ErrorClass, void>>;
  updateKitchen(id: string, data: KitchenModel): Promise<Either<ErrorClass, KitchenEntity>>;
  getKitchens(): Promise<Either<ErrorClass, KitchenEntity[]>>;
  getKitchenById(id: string): Promise<Either<ErrorClass, KitchenEntity | null>>;
}