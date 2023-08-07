import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";


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