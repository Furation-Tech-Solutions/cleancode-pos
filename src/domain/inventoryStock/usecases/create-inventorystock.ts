import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface CreateInventorystockUsecase {
    execute : ( inventorystockData : InventorystockModel) => Promise<Either<ErrorClass, InventorystockEntity>>
}

export class CreateInventorystock implements CreateInventorystockUsecase {
    private readonly inventorystockRepository : InventorystockRepository;

    constructor (inventorystockRepository : InventorystockRepository) {
        this.inventorystockRepository= inventorystockRepository;
    }

    async execute (inventorystockData : InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>> {
        return await this.inventorystockRepository.createInventorystock(inventorystockData);
    }
}