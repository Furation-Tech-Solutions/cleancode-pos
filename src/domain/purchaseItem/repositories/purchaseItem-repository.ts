import { PurchaseItemEntity, PurchaseItemModel } from "@domain/purchaseItem/entities/purchaseItem";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface PurchaseItemRepository {
    createPurchaseItem(
        purchaseItem: PurchaseItemModel
    ): Promise<Either<ErrorClass, PurchaseItemEntity>>;
    getPurchaseItems(): Promise<Either<ErrorClass, PurchaseItemEntity[]>>;
    getPurchaseItemById(
        id: string
    ): Promise<Either<ErrorClass, PurchaseItemEntity>>;
    updatePurchaseItem(
        id: string,
        data: PurchaseItemModel
    ): Promise<Either<ErrorClass, PurchaseItemEntity>>;
    deletePurchaseItem(id: string): Promise<Either<ErrorClass, void>>;
}