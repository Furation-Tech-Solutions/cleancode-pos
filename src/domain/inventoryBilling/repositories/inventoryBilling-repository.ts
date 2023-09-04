import {
  InventoryBillingEntity,
  InventoryBillingModel,
} from "@domain/inventoryBilling/entities/inventoryBilling";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InventoryBillingRepository {
  createInventoryBilling(
    inventoryBilling: InventoryBillingModel
  ): Promise<Either<ErrorClass, InventoryBillingEntity>>;
  deleteInventoryBilling(id: string): Promise<Either<ErrorClass, void>>;
  updateInventoryBilling(
    id: string,
    data: InventoryBillingModel
  ): Promise<Either<ErrorClass, InventoryBillingEntity>>;
  getInventoryBillings(): Promise<Either<ErrorClass, InventoryBillingEntity[]>>;
  getInventoryBillingById(
    id: string
  ): Promise<Either<ErrorClass, InventoryBillingEntity>>;
}
