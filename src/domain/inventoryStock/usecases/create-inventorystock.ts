import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
<<<<<<< HEAD


export interface CreateInventorystockUsecase {
    execute : ( inventorystockData : InventorystockModel) => Promise <InventorystockEntity>
=======
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface CreateInventorystockUsecase {
    execute : ( inventorystockData : InventorystockModel) => Promise<Either<ErrorClass, InventorystockEntity>>
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
}

export class CreateInventorystock implements CreateInventorystockUsecase {
    private readonly inventorystockRepository : InventorystockRepository;

    constructor (inventorystockRepository : InventorystockRepository) {
        this.inventorystockRepository= inventorystockRepository;
    }

<<<<<<< HEAD
    async execute (inventorystockData : InventorystockModel) : Promise<InventorystockEntity> {
=======
    async execute (inventorystockData : InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>> {
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
        return await this.inventorystockRepository.createInventorystock(inventorystockData);
    }
}