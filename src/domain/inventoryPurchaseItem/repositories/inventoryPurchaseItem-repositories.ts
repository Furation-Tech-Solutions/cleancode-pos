import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventoryPurchaseItemEntity, InventoryPurchaseItemModel } from "../entities/inventoryPurchaseItem";


export interface InventoryPurchaseItemRepository{
    createInventoryPurchaseItem(inventoryPurchaseItem:InventoryPurchaseItemModel) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>;
    deleteInventoryPurchaseItem(id:string): Promise<Either<ErrorClass, void>>;
    getAllInventoryPurchaseItem() : Promise<Either<ErrorClass, InventoryPurchaseItemEntity[]>>;
    getInventoryPurchaseItemById(id: string) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>;
    updateInventoryPurchaseItem(id: string, data: InventoryPurchaseItemModel) : Promise<Either<ErrorClass, InventoryPurchaseItemEntity>>
}