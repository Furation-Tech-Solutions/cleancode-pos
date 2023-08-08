import { InventoryEntity } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";

export interface GetAllInventorysUsecase {
  execute: () => Promise<InventoryEntity[]>;
}

export class GetAllInventories implements GetAllInventorysUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.getInventorys();
  }
}
