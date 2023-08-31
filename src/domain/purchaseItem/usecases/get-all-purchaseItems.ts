import { PurchaseItemEntity } from "@domain/purchaseItem/entities/purchaseItem";
import { PurchaseItemRepository } from "@domain/purchaseItem/repositories/purchaseItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllPurchaseItemsUsecase {
    execute: () => Promise<Either<ErrorClass, PurchaseItemEntity[]>>;
}

export class GetAllPurchaseItems implements GetAllPurchaseItemsUsecase {
    private readonly purchaseItemRepository: PurchaseItemRepository;

    constructor(purchaseItemRepository: PurchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    async execute(): Promise<Either<ErrorClass, PurchaseItemEntity[]>> {
        return await this.purchaseItemRepository.getPurchaseItems();
    }
}
