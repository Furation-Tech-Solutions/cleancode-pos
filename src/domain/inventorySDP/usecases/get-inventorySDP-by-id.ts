import { InventorySDPEntity } from "@domain/inventorySDP/entities/inventorySDP";
import { InventorySDPRepository } from "@domain/inventorySDP/repositories/inventorySDP-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetInventorySDPByIdUsecase {
    execute: (
        inventorySDPId: string
    ) => Promise<Either<ErrorClass, InventorySDPEntity>>;
}

export class GetInventorySDPById implements GetInventorySDPByIdUsecase {
    private readonly inventorySDPRepository: InventorySDPRepository;

    constructor(inventorySDPRepository: InventorySDPRepository) {
        this.inventorySDPRepository = inventorySDPRepository;
    }

    async execute(
        inventorySDPId: string
    ): Promise<Either<ErrorClass, InventorySDPEntity>> {
        return await this.inventorySDPRepository.getInventorySDPById(inventorySDPId);
    }
}
