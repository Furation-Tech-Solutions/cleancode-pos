import { PurchaseItemRepository } from "@domain/purchaseItem/repositories/purchaseItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeletePurchaseItemUsecase {
    execute: (purchaseItemId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeletePurchaseItem implements DeletePurchaseItemUsecase {
    private readonly purchaseItemRepository: PurchaseItemRepository;

    constructor(purchaseItemRepository: PurchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    async execute(purchaseItemId: string): Promise<Either<ErrorClass, void>> {
        return await this.purchaseItemRepository.deletePurchaseItem(purchaseItemId);
    }
}
