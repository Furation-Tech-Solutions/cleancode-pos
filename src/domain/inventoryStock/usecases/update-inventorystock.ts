import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface UpdateInventorystockUsecase {
    execute : (inventorystockId: string, data: InventorystockModel) => Promise<Either<ErrorClass, InventorystockEntity>>
}

export class UpdateInventorystock implements UpdateInventorystockUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor (inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository;
    }

    async execute(inventorystockId: string, data: InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>> {
        return await this.inventorystockrepository.updateInventorystock(inventorystockId, data);
    }
}