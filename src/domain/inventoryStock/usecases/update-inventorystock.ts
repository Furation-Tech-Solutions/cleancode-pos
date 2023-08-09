import { InventorystockEntity, InventorystockModel } from "../entities/inventoryStock";
import { InventorystockRepository } from "../repositories/inventoryStock-repository";
<<<<<<< HEAD


export interface UpdateInventorystockUsecase {
    execute : (inventorystockId: string, data: Partial<InventorystockModel>) => Promise<InventorystockEntity>
=======
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface UpdateInventorystockUsecase {
    execute : (inventorystockId: string, data: InventorystockModel) => Promise<Either<ErrorClass, InventorystockEntity>>
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
}

export class UpdateInventorystock implements UpdateInventorystockUsecase {
    public readonly inventorystockrepository : InventorystockRepository;

    constructor (inventorystockrepository : InventorystockRepository) {
        this.inventorystockrepository= inventorystockrepository;
    }

<<<<<<< HEAD
    async execute(inventorystockId: string, data: Partial<InventorystockModel>) : Promise<InventorystockEntity> {
        const existingInventorystock : InventorystockEntity | null = 
        await this.inventorystockrepository.getInventorystockById(inventorystockId);

        if(!existingInventorystock){ 
            throw new Error("Inventorystock not found");    
        }
        const updatedInventorystockData : InventorystockModel = {...existingInventorystock, ...data};

        await this.inventorystockrepository.updateInventorystock(inventorystockId, updatedInventorystockData);

        const updatedInventorystockEntity : InventorystockEntity | null=
        await this.inventorystockrepository.getInventorystockById(inventorystockId);

        if(!updatedInventorystockEntity){
            throw new Error("Inventory stock not found after update");
        }

        return updatedInventorystockEntity;
=======
    async execute(inventorystockId: string, data: InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>> {
        return await this.inventorystockrepository.updateInventorystock(inventorystockId, data);
>>>>>>> 72028bd83c9ce3d28c92d555d1a41698d1bcd30a
    }
}