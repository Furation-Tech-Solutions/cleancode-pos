import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemEntity, InventoryPurchaseItemModel } from "../entities/inventoryPurchaseItem";
import { InventoryPurchaseItemRepository } from "../repositories/inventoryPurchaseItem-repositories";

export interface UpdateInventoryPurchaseItemUsecase {
    execute : (inventoryPurchaseItemId : string, data: InventoryPurchaseItemModel) => Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>
}

export class UpdateInventoryPurchaseItem implements UpdateInventoryPurchaseItemUsecase {
    private readonly inventoryPurchaseItemRepository : InventoryPurchaseItemRepository

    constructor (inventoryPurchaseItemRepository : InventoryPurchaseItemRepository){
        this.inventoryPurchaseItemRepository= inventoryPurchaseItemRepository;
    }

    async execute(inventoryPurchaseItemId : string, data : InventoryPurchaseItemModel) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>{
        return await this.inventoryPurchaseItemRepository.updateInventoryPurchaseItem(inventoryPurchaseItemId, data);
    }
}