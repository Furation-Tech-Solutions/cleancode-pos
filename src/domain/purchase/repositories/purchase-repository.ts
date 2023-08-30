import { PurchaseModel, PurchaseEntity } from "@domain/purchase/entities/purchase";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface PurchaseRepository {
  createPurchase(
    purchase: PurchaseModel
  ): Promise<Either<ErrorClass, PurchaseEntity>>;
  deletePurchase(id: string): Promise<Either<ErrorClass, void>>;
  updatePurchase(
    id: string,
    data: PurchaseModel
  ): Promise<Either<ErrorClass, PurchaseEntity>>;
  getPurchases(): Promise<Either<ErrorClass, PurchaseEntity[]>>;
  getPurchaseById(id: string): Promise<Either<ErrorClass, PurchaseEntity>>;
}
