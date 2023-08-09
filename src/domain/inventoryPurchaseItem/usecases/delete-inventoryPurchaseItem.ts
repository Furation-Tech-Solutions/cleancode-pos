import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemRepository } from "../repositories/inventoryPurchaseItem-repositories";

export interface DeleteInventoryPurchaseItemUsecase {
    execute : (inventoryPurchaseItemId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteInventoryPurchaseItem implements DeleteInventoryPurchaseItemUsecase{
    private readonly inventoryPurchaseItemRepository : InventoryPurchaseItemRepository;

    constructor (inventoryPurchaseItemRepository : InventoryPurchaseItemRepository) {
        this.inventoryPurchaseItemRepository= inventoryPurchaseItemRepository;
    }

    async execute (inventoryPurchaseItemId: string) : Promise<Either<ErrorClass, void>> {
        return await this.inventoryPurchaseItemRepository.deleteInventoryPurchaseItem(inventoryPurchaseItemId);
    }
}