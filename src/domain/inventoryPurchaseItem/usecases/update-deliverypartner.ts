import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemEntity, InventoryPurchaseItemModel } from "../entities/inventoryPurchaseItem";
import { InventoryPurchaseItemRepository } from "../repositories/inventoryPurchaseItem-repositories";


export interface UpdateInventoryPurchaseItemUsecase {
    execute : (inventoryPurchaseItemId : string, data: Partial<InventoryPurchaseItemModel>) => Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>
}

export class UpdateInventoryPurchaseItem implements UpdateInventoryPurchaseItemUsecase {
    private readonly inventoryPurchaseItemRepository : InventoryPurchaseItemRepository

    constructor (inventoryPurchaseItemRepository : InventoryPurchaseItemRepository){
        this.inventoryPurchaseItemRepository= inventoryPurchaseItemRepository;
    }

    async execute(inventoryPurchaseItemId : string, data : Partial<InventoryPurchaseItemModel>) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>{
        const existingInventoryPurchaseItem : InventoryPurchaseItemEntity | null = 
        await this.inventoryPurchaseItemRepository.getInventoryPurchaseItemById(inventoryPurchaseItemId);

        if(!existingInventoryPurchaseItem){ 
            throw new Error("Inventory Purchase Item is not found");
        }

        const updatedInventoryPurchaseItemData:InventoryPurchaseItemModel= {...existingInventoryPurchaseItem, ...data};

        await this.inventoryPurchaseItemRepository.updateInventoryPurchaseItem(inventoryPurchaseItemId, updatedInventoryPurchaseItemData);

        const updatedInventoryPurchaseItemEntity : InventoryPurchaseItemEntity | null=
        await this.inventoryPurchaseItemRepository.getInventoryPurchaseItemById(inventoryPurchaseItemId);

        if(!updatedInventoryPurchaseItemEntity){
            throw new Error("Inventory Purchase Item not found after update");
        }

        return updatedInventoryPurchaseItemEntity;
    }
}