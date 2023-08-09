import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface DeleteInventortstockUsecase {
    execute : (inventorystockId : string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInventorystock implements DeleteInventortstockUsecase {
    private readonly inventorystockRepository : InventorystockRepository;

    constructor (inventorystockRepository : InventorystockRepository) {
        this.inventorystockRepository= inventorystockRepository;
    }

    async execute (inventorystockId : string) : Promise<Either<ErrorClass, void>> {
        return await this.inventorystockRepository.deleteInventorystock(inventorystockId);
    }
}