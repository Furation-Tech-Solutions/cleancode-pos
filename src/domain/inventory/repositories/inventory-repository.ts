import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InventoryRepository {
  createInventory(
    inventory: InventoryModel
  ): Promise<Either<ErrorClass, InventoryEntity>>;
  deleteInventory(id: string): Promise<Either<ErrorClass, void>>;
  updateInventory(
    id: string,
    data: InventoryModel
  ): Promise<Either<ErrorClass, InventoryEntity>>;
  getInventorys(): Promise<Either<ErrorClass, InventoryEntity[]>>;
  getInventoryById(id: string): Promise<Either<ErrorClass, InventoryEntity>>;
}


