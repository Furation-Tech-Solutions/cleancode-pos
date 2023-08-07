import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";


export interface DeleteInventortstockUsecase {
    execute : (inventorystockId : string) => Promise<void>;
}

export class DeleteInventorystock implements DeleteInventortstockUsecase {
    private readonly inventorystockRepository : InventorystockRepository;

    constructor (inventorystockRepository : InventorystockRepository) {
        this.inventorystockRepository= inventorystockRepository;
    }

    async execute (inventorystockId : string) : Promise<void> {
        await this.inventorystockRepository.deleteInventorystock(inventorystockId);
    }
}