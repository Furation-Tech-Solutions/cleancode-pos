import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";


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