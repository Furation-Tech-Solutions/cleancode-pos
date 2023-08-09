<<<<<<< HEAD
import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";
=======
import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
>>>>>>> fad90d8a7b203a4b0a64918dcfd4f84150db3634


export interface CreateInventorystockUsecase {
    execute : ( inventorystockData : InventorystockModel) => Promise <InventorystockEntity>
}

export class CreateInventorystock implements CreateInventorystockUsecase {
    private readonly inventorystockRepository : InventorystockRepository;

    constructor (inventorystockRepository : InventorystockRepository) {
        this.inventorystockRepository= inventorystockRepository;
    }

    async execute (inventorystockData : InventorystockModel) : Promise<InventorystockEntity> {
        return await this.inventorystockRepository.createInventorystock(inventorystockData);
    }
}