<<<<<<< HEAD
import { InventorystockEntity, InventorystockModel } from "../entities/inventorystock";
import { InventorystockRepository } from "../repositories/inventorystock-repository";
=======
import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
>>>>>>> fad90d8a7b203a4b0a64918dcfd4f84150db3634


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