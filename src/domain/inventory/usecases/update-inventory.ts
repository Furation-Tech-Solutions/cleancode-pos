import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateInventoryUsecase {
  execute: (
    inventoryId: string,
    inventoryData: InventoryModel
  ) => Promise<Either<ErrorClass, InventoryEntity>>;
}

export class UpdateInventory implements UpdateInventoryUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(
    inventoryId: string,
    inventoryData: InventoryModel
  ): Promise<Either<ErrorClass, InventoryEntity>> {
    return await this.inventoryRepository.updateInventory(
      inventoryId,
      inventoryData
    );
  }
}
