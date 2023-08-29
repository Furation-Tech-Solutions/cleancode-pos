import { InventoryItemEntity, InventoryItemModel } from "@domain/inventoryItem/entities/inventoryItem";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InventoryItemRepository {
  createInventoryItem(
    inventoryItem: InventoryItemModel
  ): Promise<Either<ErrorClass, InventoryItemEntity>>;
  getInventoryItems(): Promise<Either<ErrorClass, InventoryItemEntity[]>>;
  getInventoryItemById(
    id: string
  ): Promise<Either<ErrorClass, InventoryItemEntity>>;
  updateInventoryItem(
    id: string,
    data: InventoryItemModel
  ): Promise<Either<ErrorClass, InventoryItemEntity>>;
  deleteInventoryItem(id: string): Promise<Either<ErrorClass, void>>;
}