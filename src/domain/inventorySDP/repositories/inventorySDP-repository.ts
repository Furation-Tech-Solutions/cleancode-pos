import { InventorySDPEntity, InventorySDPModel } from "@domain/inventorySDP/entities/inventorySDP";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface InventorySDPRepository {
    createInventorySDP(
        inventorySDP: InventorySDPModel
    ): Promise<Either<ErrorClass, InventorySDPEntity>>;
    getInventorySDPs(): Promise<Either<ErrorClass, InventorySDPEntity[]>>;
    getInventorySDPById(
        id: string
    ): Promise<Either<ErrorClass, InventorySDPEntity>>;
    updateInventorySDP(
        id: string,
        data: InventorySDPModel
    ): Promise<Either<ErrorClass, InventorySDPEntity>>;
    deleteInventorySDP(id: string): Promise<Either<ErrorClass, void>>;
}