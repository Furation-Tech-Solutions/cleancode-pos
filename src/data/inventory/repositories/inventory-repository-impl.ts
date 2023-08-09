import { InventoryEntity, InventoryModel } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";
import { InventoryDataSource } from "@data/inventory/datasource/inventory-data-source";

export class InventoryRepositoryImpl implements InventoryRepository {
  private readonly dataSource: InventoryDataSource;

  constructor(dataSource: InventoryDataSource) {
    this.dataSource = dataSource;
  }

  async createInventory(inventory: InventoryModel): Promise<InventoryEntity> {
    return await this.dataSource.create(inventory);
  }

  async deleteInventory(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateInventory(id: string, data: InventoryModel): Promise<InventoryEntity> {
    return await this.dataSource.update(id, data);
  }

  async getInventorys(): Promise<InventoryEntity[]> {
    return await this.dataSource.getAllInventory();
  }

  async getInventoryById(id: string): Promise<InventoryEntity | null> {
    return await this.dataSource.read(id);
  }
}
