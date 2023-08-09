import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemEntity } from "../entities/inventoryPurchaseItem";
import { InventoryPurchaseItemRepository } from "../repositories/inventoryPurchaseItem-repositories";

export interface GetAllInventoryPurchaseItemUsecase {
    execute : () => Promise<Either<ErrorClass, InventoryPurchaseItemEntity[]>>
}

export class GetAllInventoryPurchaseItem implements GetAllInventoryPurchaseItemUsecase {
    private readonly inventoryPurchaseItemRepository : InventoryPurchaseItemRepository;

    constructor (inventoryPurchaseItemRepository : InventoryPurchaseItemRepository) {
        this.inventoryPurchaseItemRepository= inventoryPurchaseItemRepository;
    }

    async execute () : Promise<Either<ErrorClass, InventoryPurchaseItemEntity[]>> {
        return await this.inventoryPurchaseItemRepository.getAllInventoryPurchaseItem();
    }
}