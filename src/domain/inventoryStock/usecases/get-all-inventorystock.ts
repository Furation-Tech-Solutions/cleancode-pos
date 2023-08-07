import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";


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