import { InventorySDPRepository } from "@domain/inventorySDP/repositories/inventorySDP-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInventorySDPUsecase {
    execute: (inventorySDPId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInventorySDP implements DeleteInventorySDPUsecase {
    private readonly inventorySDPRepository: InventorySDPRepository;

    constructor(inventorySDPRepository: InventorySDPRepository) {
        this.inventorySDPRepository = inventorySDPRepository;
    }

    async execute(inventorySDPId: string): Promise<Either<ErrorClass, void>> {
        return await this.inventorySDPRepository.deleteInventorySDP(inventorySDPId);
    }
}
