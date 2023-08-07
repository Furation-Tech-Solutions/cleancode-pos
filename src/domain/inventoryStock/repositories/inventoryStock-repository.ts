import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";

export interface InventorystockRepository {
    createInventorystock (inventorystock : InventorystockModel) : Promise<InventorystockEntity>;
    deleteInventorystock (id : string) : Promise<void>;
    updateInventorystock (id : string, data: InventorystockModel) : Promise<InventorystockEntity>;
    getAllInventorystock () : Promise<InventorystockEntity[]>;
    getInventorystockById (id: string) : Promise<InventorystockEntity | null>;
}