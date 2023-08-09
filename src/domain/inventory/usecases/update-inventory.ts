import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";

export interface UpdateInventoryUsecase {
  execute: (
    inventoryId: string,
    inventoryData: Partial<InventoryModel>
  ) => Promise<InventoryEntity>;
}

export class UpdateInventory implements UpdateInventoryUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(
    inventoryId: string,
    inventoryData: Partial<InventoryModel>
  ): Promise<InventoryEntity> {
    const existingInventory: InventoryEntity | null =
      await this.inventoryRepository.getInventoryById(inventoryId);

    if (!existingInventory) {
      throw new Error("Inventory not found.");
    }

    // Perform the partial update by merging adminData with existingAdmin
    const updatedInventoryData: InventoryModel = {
      ...existingInventory,
      ...inventoryData,
    };

    // Save the updatedAdminData to the repository
    await this.inventoryRepository.updateInventory(inventoryId, updatedInventoryData);

    // Fetch the updated admin entity from the repository
    const updatedInventoryEntity: InventoryEntity | null =
      await this.inventoryRepository.getInventoryById(inventoryId);

    if (!updatedInventoryEntity) {
      throw new Error("Admin not found after update.");
    }

    return updatedInventoryEntity;
  }
}
