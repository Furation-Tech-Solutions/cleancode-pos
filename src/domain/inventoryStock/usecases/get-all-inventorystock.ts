import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface GetAllInventorystockUsecase {
    execute : () => Promise<Either<ErrorClass, InventorystockEntity[]>>
}

export class GetAllInventorystock implements GetAllInventorystockUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor ( inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository
    }
    async execute () : Promise<Either<ErrorClass, InventorystockEntity[]>>{
        return await this.inventorystockrepository.getAllInventorystock();
    }
}