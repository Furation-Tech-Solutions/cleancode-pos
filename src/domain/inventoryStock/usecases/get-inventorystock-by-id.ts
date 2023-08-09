import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
<<<<<<< HEAD


export interface GetInventorystockByIdUsecase {
    execute : (inventorystockId : string) => Promise<InventorystockEntity | null>
=======
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface GetInventorystockByIdUsecase {
    execute : (inventorystockId : string) => Promise<Either<ErrorClass, InventorystockEntity>>
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
}

export class GetInventorystockById implements GetInventorystockByIdUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor (inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository;
    }

<<<<<<< HEAD
    async execute(inventorystockId: string) : Promise<InventorystockEntity | null>{
=======
    async execute(inventorystockId: string) : Promise<Either<ErrorClass, InventorystockEntity>>{
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
        return await this.inventorystockrepository.getInventorystockById(inventorystockId)
    }
}