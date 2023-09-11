import {
  InventoryStockEntity,
  InventoryStockModel,
} from "@domain/inventoryStock/entities/inventoryStock";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InventoryStockRepository {
  createInventoryStock(
    inventoryStock: InventoryStockModel
  ): Promise<Either<ErrorClass, InventoryStockEntity>>;
  getInventoryStocks(): Promise<Either<ErrorClass, InventoryStockEntity[]>>;
  getInventoryStockById(
    id: string
  ): Promise<Either<ErrorClass, InventoryStockEntity>>;
  updateInventoryStock(
    id: string,
    data: InventoryStockModel
  ): Promise<Either<ErrorClass, InventoryStockEntity>>;
  deleteInventoryStock(id: string): Promise<Either<ErrorClass, void>>;
}