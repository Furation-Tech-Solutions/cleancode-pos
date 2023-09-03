import {
    InventorySDPEntity,
    InventorySDPModel,
} from "@domain/inventorySDP/entities/inventorySDP";
import { InventorySDPRepository } from "@domain/inventorySDP/repositories/inventorySDP-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateInventorySDPUsecase {
    execute: (
        inventorySDPId: string,
        inventorySDPData: InventorySDPModel
    ) => Promise<Either<ErrorClass, InventorySDPEntity>>;
}

export class UpdateInventorySDP implements UpdateInventorySDPUsecase {
    private readonly inventorySDPRepository: InventorySDPRepository;

    constructor(inventorySDPRepository: InventorySDPRepository) {
        this.inventorySDPRepository = inventorySDPRepository;
    }

    async execute(
        inventorySDPId: string,
        inventorySDPData: InventorySDPModel
    ): Promise<Either<ErrorClass, InventorySDPEntity>> {
        return await this.inventorySDPRepository.updateInventorySDP(
            inventorySDPId,
            inventorySDPData
        );
    }
}
