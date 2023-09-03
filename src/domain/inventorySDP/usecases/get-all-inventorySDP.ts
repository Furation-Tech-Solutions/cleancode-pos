import { InventorySDPEntity } from "@domain/inventorySDP/entities/inventorySDP";
import { InventorySDPRepository } from "@domain/inventorySDP/repositories/inventorySDP-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInventorySDPsUsecase {
    execute: () => Promise<Either<ErrorClass, InventorySDPEntity[]>>;
}

export class GetAllInventorySDPs implements GetAllInventorySDPsUsecase {
    private readonly inventorySDPRepository: InventorySDPRepository;

    constructor(inventorySDPRepository: InventorySDPRepository) {
        this.inventorySDPRepository = inventorySDPRepository;
    }

    async execute(): Promise<Either<ErrorClass, InventorySDPEntity[]>> {
        return await this.inventorySDPRepository.getInventorySDPs();
    }
}
