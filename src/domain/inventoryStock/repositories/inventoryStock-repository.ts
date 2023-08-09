<<<<<<< HEAD
import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";

export interface InventorystockRepository {
    createInventorystock (inventorystock : InventorystockModel) : Promise<InventorystockEntity>;
    deleteInventorystock (id : string) : Promise<void>;
    updateInventorystock (id : string, data: InventorystockModel) : Promise<InventorystockEntity>;
    getAllInventorystock () : Promise<InventorystockEntity[]>;
    getInventorystockById (id: string) : Promise<InventorystockEntity | null>;
=======
import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface InventorystockRepository {
    createInventorystock (inventorystock : InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>>;
    deleteInventorystock (id : string) : Promise<Either<ErrorClass, void>>;
    updateInventorystock (id : string, data: InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>>;
    getAllInventorystock () : Promise<Either<ErrorClass, InventorystockEntity[]>>;
    getInventorystockById (id: string) : Promise<Either<ErrorClass, InventorystockEntity>>;
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
}