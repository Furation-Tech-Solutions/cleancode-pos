import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
<<<<<<< HEAD


export interface DeleteInventortstockUsecase {
    execute : (inventorystockId : string) => Promise<void>;
=======
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface DeleteInventortstockUsecase {
    execute : (inventorystockId : string) => Promise<Either<ErrorClass, void>>;
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
}

export class DeleteInventorystock implements DeleteInventortstockUsecase {
    private readonly inventorystockRepository : InventorystockRepository;

    constructor (inventorystockRepository : InventorystockRepository) {
        this.inventorystockRepository= inventorystockRepository;
    }

<<<<<<< HEAD
    async execute (inventorystockId : string) : Promise<void> {
        await this.inventorystockRepository.deleteInventorystock(inventorystockId);
=======
    async execute (inventorystockId : string) : Promise<Either<ErrorClass, void>> {
        return await this.inventorystockRepository.deleteInventorystock(inventorystockId);
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
    }
}