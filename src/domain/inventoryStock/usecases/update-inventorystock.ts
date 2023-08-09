import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";


export interface UpdateInventorystockUsecase {
    execute : (inventorystockId: string, data: Partial<InventorystockModel>) => Promise<InventorystockEntity>
}

export class UpdateInventorystock implements UpdateInventorystockUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor (inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository;
    }

    async execute(inventorystockId: string, data: Partial<InventorystockModel>) : Promise<InventorystockEntity> {
        const existingInventorystock : InventorystockEntity | null = 
        await this.inventorystockrepository.getInventorystockById(inventorystockId);

        if(!existingInventorystock){ 
            throw new Error("Inventorystock not found");    
        }
        const updatedInventorystockData : InventorystockModel = {...existingInventorystock, ...data};

        await this.inventorystockrepository.updateInventorystock(inventorystockId, updatedInventorystockData);

        const updatedInventorystockEntity : InventorystockEntity | null=
        await this.inventorystockrepository.getInventorystockById(inventorystockId);

        if(!updatedInventorystockEntity){
            throw new Error("Inventory stock not found after update");
        }

        return updatedInventorystockEntity;
    }
}