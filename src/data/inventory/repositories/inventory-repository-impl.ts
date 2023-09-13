import {
  InventoryEntity,
  InventoryModel,
} from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";
import { InventoryDataSource } from "@data/inventory/datasource/inventory-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InventoryRepositoryImpl implements InventoryRepository {
  private readonly dataSource: InventoryDataSource;

  constructor(dataSource: InventoryDataSource) {
    this.dataSource = dataSource;
  }

  async createInventory(
    inventory: InventoryModel
  ): Promise<Either<ErrorClass, InventoryEntity>> {
    try {
      const i = await this.dataSource.create(inventory);
      return Right<ErrorClass, InventoryEntity>(i);
    } catch (error) {
      
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, InventoryEntity>(
          ApiError.inventory_nameExists()
        );
      }
      
      return Left<ErrorClass, InventoryEntity>(ApiError.badRequest());
    }
  }

  async deleteInventory(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateInventory(
    id: string,
    data: InventoryModel
  ): Promise<Either<ErrorClass, InventoryEntity>> {
    try {
      
      
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, InventoryEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryEntity>(ApiError.badRequest());
    }
  }

  async getInventorys(): Promise<Either<ErrorClass, InventoryEntity[]>> {
    try {
      const response = await this.dataSource.getAllInventory();
      return Right<ErrorClass, InventoryEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, InventoryEntity[]>(
          ApiError.inventory_nameExists()
        );
      }
      return Left<ErrorClass, InventoryEntity[]>(ApiError.badRequest());
    }
  }

  async getInventoryById(
    id: string
  ): Promise<Either<ErrorClass, InventoryEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, InventoryEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, InventoryEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryEntity>(ApiError.badRequest());
    }
  }
}
