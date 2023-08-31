import {
    PurchaseItemEntity,
    PurchaseItemModel,
} from "@domain/purchaseItem/entities/purchaseItem";
import { PurchaseItemRepository } from "@domain/purchaseItem/repositories/purchaseItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdatePurchaseItemUsecase {
    execute: (
        purchaseItemId: string,
        purchaseItemData: PurchaseItemModel
    ) => Promise<Either<ErrorClass, PurchaseItemEntity>>;
}

export class UpdatePurchaseItem implements UpdatePurchaseItemUsecase {
    private readonly purchaseItemRepository: PurchaseItemRepository;

    constructor(purchaseItemRepository: PurchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    async execute(
        purchaseItemId: string,
        purchaseItemData: PurchaseItemModel
    ): Promise<Either<ErrorClass, PurchaseItemEntity>> {
        return await this.purchaseItemRepository.updatePurchaseItem(
            purchaseItemId,
            purchaseItemData
        );
    }
}
