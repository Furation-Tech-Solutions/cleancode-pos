import { KitchenEntity } from "@domain/kitchen/entities/kitchen";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { KotEntity, KotModel } from "../entities/kot";

export interface KotRepository {
  createKot(kot: KotModel): Promise<Either<ErrorClass, KotEntity>>;
  getKot(): Promise<Either<ErrorClass, KotEntity[]>>;
  getKotById(id: string): Promise<Either<ErrorClass, KotEntity>>;
  updateKot(
    id: string,
    data: KotModel
  ): Promise<Either<ErrorClass, KotEntity>>;
  deleteKot(id: string): Promise<Either<ErrorClass, void>>;
}