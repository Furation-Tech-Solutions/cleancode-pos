import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface InventorystockRepository {
    createInventorystock (inventorystock : InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>>;
    deleteInventorystock (id : string) : Promise<Either<ErrorClass, void>>;
    updateInventorystock (id : string, data: InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>>;
    getAllInventorystock () : Promise<Either<ErrorClass, InventorystockEntity[]>>;
    getInventorystockById (id: string) : Promise<Either<ErrorClass, InventorystockEntity>>;
}