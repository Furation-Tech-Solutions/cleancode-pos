import { type InventoryRepository } from "@domain/inventory/repositories/inventory-repository";

export interface DeleteInventoryUsecase {
  execute: (inventoryId: string) => Promise<void>
}

export class DeleteInventory implements DeleteInventoryUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryId: string): Promise<void> {
    await this.inventoryRepository.deleteInventory(inventoryId);
  }
}
