import {
    InventorySDPEntity,
    InventorySDPModel,
} from "@domain/inventorySDP/entities/inventorySDP";
import { InventorySDPRepository } from "@domain/inventorySDP/repositories/inventorySDP-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateInventorySDPUsecase {
    execute: (
        inventorySDPData: InventorySDPModel
    ) => Promise<Either<ErrorClass, InventorySDPEntity>>;
}

export class CreateInventorySDP implements CreateInventorySDPUsecase {
    private readonly inventorySDPRepository: InventorySDPRepository;

    constructor(inventorySDPRepository: InventorySDPRepository) {
        this.inventorySDPRepository = inventorySDPRepository;
    }

    async execute(
        inventorySDPData: InventorySDPModel
    ): Promise<Either<ErrorClass, InventorySDPEntity>> {
        return await this.inventorySDPRepository.createInventorySDP(
            inventorySDPData
        );
    }
}
