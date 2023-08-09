import { InventoryEntity } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";

export interface GetInventoryByIdUsecase {
  execute: (inventoryId: string) => Promise<InventoryEntity | null>;
}

export class GetInventoryById implements GetInventoryByIdUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryId: string): Promise<InventoryEntity | null> {
    return await this.inventoryRepository.getInventoryById(inventoryId);
  }
}
