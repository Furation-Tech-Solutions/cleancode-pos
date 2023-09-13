import { PurchaseItemEntity } from "@domain/purchaseItem/entities/purchaseItem";
import { PurchaseItemRepository } from "@domain/purchaseItem/repositories/purchaseItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetPurchaseItemByIdUsecase {
    execute: (
        purchaseItemId: string
    ) => Promise<Either<ErrorClass, PurchaseItemEntity>>;
}

export class GetPurchaseItemById implements GetPurchaseItemByIdUsecase {
    private readonly purchaseItemRepository: PurchaseItemRepository;

    constructor(purchaseItemRepository: PurchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    async execute(
        purchaseItemId: string
    ): Promise<Either<ErrorClass, PurchaseItemEntity>> {
        return await this.purchaseItemRepository.getPurchaseItemById(purchaseItemId);
    }
}
