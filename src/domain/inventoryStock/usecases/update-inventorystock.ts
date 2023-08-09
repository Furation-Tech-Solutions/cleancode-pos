<<<<<<< HEAD
import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";
=======
import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
>>>>>>> fad90d8a7b203a4b0a64918dcfd4f84150db3634


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