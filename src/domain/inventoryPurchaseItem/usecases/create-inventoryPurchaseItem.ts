
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemEntity, InventoryPurchaseItemModel } from "../entities/inventoryPurchaseItem";
import { InventoryPurchaseItemRepository } from "../repositories/inventoryPurchaseItem-repositories";


export interface CreateInventoryPurchaseItemUsecase {
    execute: (inventoryPurchaseItemData: InventoryPurchaseItemModel) => Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>
}

export class CreateInventoryPurchaseItem implements CreateInventoryPurchaseItemUsecase {
    private readonly inventoryPurchaseItemRepository : InventoryPurchaseItemRepository;

    constructor (inventoryPurchaseItemRepository : InventoryPurchaseItemRepository) {
        this.inventoryPurchaseItemRepository= inventoryPurchaseItemRepository;
    }

    async execute(inventoryPurchaseItemData: InventoryPurchaseItemModel) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>> {
        return await this.inventoryPurchaseItemRepository.createInventoryPurchaseItem(inventoryPurchaseItemData);
    }
}