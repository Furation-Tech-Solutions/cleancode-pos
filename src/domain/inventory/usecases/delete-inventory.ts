import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInventoryUsecase {
  execute: (inventoryId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInventory implements DeleteInventoryUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryId: string): Promise<Either<ErrorClass, void>> {
    return await this.inventoryRepository.deleteInventory(inventoryId);
  }
}
