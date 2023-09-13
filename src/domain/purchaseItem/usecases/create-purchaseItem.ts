import {
    PurchaseItemEntity,
    PurchaseItemModel,
} from "@domain/purchaseItem/entities/purchaseItem";
import { PurchaseItemRepository } from "@domain/purchaseItem/repositories/purchaseItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreatePurchaseItemUsecase {
    execute: (
        purchaseItemData: PurchaseItemModel
    ) => Promise<Either<ErrorClass, PurchaseItemEntity>>;
}

export class CreatePurchaseItem implements CreatePurchaseItemUsecase {
    private readonly purchaseItemRepository: PurchaseItemRepository;

    constructor(purchaseItemRepository: PurchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    async execute(
        purchaseItemData: PurchaseItemModel
    ): Promise<Either<ErrorClass, PurchaseItemEntity>> {
        return await this.purchaseItemRepository.createPurchaseItem(
            purchaseItemData
        );
    }
}
