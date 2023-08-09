import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemEntity } from "../entities/inventoryPurchaseItem";
import { InventoryPurchaseItemRepository } from "../repositories/inventoryPurchaseItem-repositories";


export interface GetInventoryPurchaseItemByIdUsecase {
    execute : (inventoryPurchaseItemId: string) => Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>;
}

export class GetInventoryPurchaseItemById implements GetInventoryPurchaseItemByIdUsecase {
    private readonly inventoryPurchaseItemRepository : InventoryPurchaseItemRepository;

    constructor (inventoryPurchaseItemRepository : InventoryPurchaseItemRepository){
        this.inventoryPurchaseItemRepository= inventoryPurchaseItemRepository;
    }

    async execute(inventoryPurchaseItemId: string) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>{
        return await this.inventoryPurchaseItemRepository.getInventoryPurchaseItemById(inventoryPurchaseItemId);
    }
}