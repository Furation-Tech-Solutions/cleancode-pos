import { InventorystockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { InventorystockDataSource } from "../datasources/inventoryStock-data-source";
import { InventorystockEntity, InventorystockModel } from "@domain/inventoryStock/entities/inventoryStock";


export class InventorystockRepositoryImpl implements InventorystockRepository {
    private readonly datasource: InventorystockDataSource;

    constructor ( datasource : InventorystockDataSource ){
        this.datasource= datasource
    }

    async createInventorystock(inventorystock: InventorystockModel) : Promise<InventorystockEntity> {
        return await this.datasource.create(inventorystock);
    }

    async deleteInventorystock(id: string): Promise<void> {
        await this.datasource.delete(id);
    }

    async updateInventorystock(id: string, data: InventorystockModel): Promise<InventorystockEntity> {
        return await  this.datasource.update(id, data);
    }

    async getAllInventorystock(): Promise<InventorystockEntity[]> {
        return await this.datasource.getAllInventorystock();
    }

    async getInventorystockById(id: string): Promise<InventorystockEntity | null> {
        return await this.datasource.read(id);
    }
}