import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";

export interface CreateInventoryUsecase {
  execute: (inventoryData: InventoryModel) => Promise<InventoryEntity>;
}

export class CreateInventory implements CreateInventoryUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryData: InventoryModel): Promise<InventoryEntity> {
    return await this.inventoryRepository.createInventory(inventoryData);
  }
}
