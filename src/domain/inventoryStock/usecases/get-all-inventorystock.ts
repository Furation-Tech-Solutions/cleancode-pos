import { InventorystockEntity } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
<<<<<<< HEAD


export interface GetAllInventorystockUsecase {
    execute : () => Promise<InventorystockEntity[]>
=======
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface GetAllInventorystockUsecase {
    execute : () => Promise<Either<ErrorClass, InventorystockEntity[]>>
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
}

export class GetAllInventorystock implements GetAllInventorystockUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor ( inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository
    }
<<<<<<< HEAD
    async execute () : Promise<InventorystockEntity[]>{
=======
    async execute () : Promise<Either<ErrorClass, InventorystockEntity[]>>{
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
        return await this.inventorystockrepository.getAllInventorystock();
    }
}