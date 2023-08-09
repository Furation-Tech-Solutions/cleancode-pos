import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";


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