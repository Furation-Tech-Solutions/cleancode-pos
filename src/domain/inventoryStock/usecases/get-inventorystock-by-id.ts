import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface GetInventorystockByIdUsecase {
    execute : (inventorystockId : string) => Promise<Either<ErrorClass, InventorystockEntity>>
}

export class GetInventorystockById implements GetInventorystockByIdUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor (inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository;
    }

    async execute(inventorystockId: string) : Promise<Either<ErrorClass, InventorystockEntity>>{
        return await this.inventorystockrepository.getInventorystockById(inventorystockId)
    }
}