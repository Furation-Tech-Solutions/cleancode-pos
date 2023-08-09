import { InventorystockEntity } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";


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