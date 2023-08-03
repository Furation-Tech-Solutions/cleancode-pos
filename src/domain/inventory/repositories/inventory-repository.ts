import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";

export interface InventoryRepository {
  createInventory(inventory: InventoryModel): Promise<InventoryEntity>;
  deleteInventory(id: string): Promise<void>;
  updateInventory(id: string, data: InventoryModel): Promise<InventoryEntity>;
  getInventorys(): Promise<InventoryEntity[]>;
  getInventoryById(id: string): Promise<InventoryEntity | null>;
}


