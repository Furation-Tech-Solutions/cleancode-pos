<<<<<<< HEAD
import { InventorystockRepository } from "@domain/inventoryStock/repositories/inventorystock-repository";
import { InventorystockDataSource } from "../datasources/inventoryStock-data-source";
import { InventorystockEntity, InventorystockModel } from "@domain/inventoryStock/entities/inventorystock";
=======
import { InventorystockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { InventorystockEntity, InventorystockModel } from "@domain/inventoryStock/entities/inventoryStock";
import { Either, Left, Right } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { InventorystockDataSource } from "../datasources/inventorystock-data-source";
import ApiError from "@presentation/error-handling/api-error";
>>>>>>> fad90d8a7b203a4b0a64918dcfd4f84150db3634


export class InventorystockRepositoryImpl implements InventorystockRepository {
    private readonly datasource: InventorystockDataSource;

    constructor ( datasource : InventorystockDataSource ){
        this.datasource= datasource
    }

<<<<<<< HEAD
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
=======
    async createInventorystock(inventorystock: InventorystockModel) : Promise<Either<ErrorClass, InventorystockEntity>> {
        try {
            let i = await this.datasource.create(inventorystock);
            return Right<ErrorClass, InventorystockEntity>(i);
          } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
              return Left<ErrorClass, InventorystockEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, InventorystockEntity>(ApiError.badRequest());
          }
        // return await this.datasource.create(inventorystock);
    }

    async deleteInventorystock(id: string): Promise<Either<ErrorClass, void>> {
        try {
            let i = await this.datasource.delete(id);
            return Right<ErrorClass, InventorystockEntity>
          } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
              return Left<ErrorClass, InventorystockEntity>(ApiError.emailExits());
            }
            return Left<ErrorClass, InventorystockEntity>(ApiError.badRequest());
          }
        // return await this.datasource.delete(id);
    }

    async updateInventorystock(id: string, data: InventorystockModel): Promise<Either<ErrorClass, InventorystockEntity>> {
        return await  this.datasource.update(id, data);
    }

    async getAllInventorystock(): Promise<Either<ErrorClass, InventorystockEntity[]>> {
        return await this.datasource.getAllInventorystock();
    }

    async getInventorystockById(id: string): Promise<Either<ErrorClass, InventorystockEntity | null>> {
>>>>>>> fad90d8a7b203a4b0a64918dcfd4f84150db3634
        return await this.datasource.read(id);
    }
}