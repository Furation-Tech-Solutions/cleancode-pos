import { InventorystockEntity } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";


export interface GetInventorystockByIdUsecase {
    execute : (inventorystockId : string) => Promise<InventorystockEntity | null>
}

export class GetInventorystockById implements GetInventorystockByIdUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor (inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository;
    }

    async execute(inventorystockId: string) : Promise<InventorystockEntity | null>{
        return await this.inventorystockrepository.getInventorystockById(inventorystockId)
    }
}