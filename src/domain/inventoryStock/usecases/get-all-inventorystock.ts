<<<<<<< HEAD
import { InventorystockEntity } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";
=======
import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
>>>>>>> fad90d8a7b203a4b0a64918dcfd4f84150db3634


export interface GetAllInventorystockUsecase {
    execute : () => Promise<InventorystockEntity[]>
}

export class GetAllInventorystock implements GetAllInventorystockUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor ( inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository
    }
    async execute () : Promise<InventorystockEntity[]>{
        return await this.inventorystockrepository.getAllInventorystock();
    }
}