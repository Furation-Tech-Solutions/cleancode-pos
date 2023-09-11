import {
  InventoryStockEntity,
  InventoryStockModel,
} from "@domain/inventoryStock/entities/inventoryStock";
import { InventoryStockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { InventoryStockDataSource } from "@data/inventoryStock/datasource/inventoryStock-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InventoryStockRepositoryImpl implements InventoryStockRepository {
  private readonly dataSource: InventoryStockDataSource;

  constructor(dataSource: InventoryStockDataSource) {
    this.dataSource = dataSource;
  }

  async createInventoryStock(
    inventoryStock: InventoryStockModel
  ): Promise<Either<ErrorClass, InventoryStockEntity>> {
    try {
      const i = await this.dataSource.create(inventoryStock);
      return Right<ErrorClass, InventoryStockEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InventoryStockEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, InventoryStockEntity>(ApiError.badRequest());
    }
  }

  async getInventoryStockById(
    id: string
  ): Promise<Either<ErrorClass, InventoryStockEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, InventoryStockEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, InventoryStockEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryStockEntity>(ApiError.badRequest());
    }
  }

  async getInventoryStocks(): Promise<
    Either<ErrorClass, InventoryStockEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllInventoryStocks();
      return Right<ErrorClass, InventoryStockEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InventoryStockEntity[]>(
          ApiError.unAuthorized()
        );
      }
      return Left<ErrorClass, InventoryStockEntity[]>(ApiError.badRequest());
    }
  }

  async updateInventoryStock(
    id: string,
    data: InventoryStockModel
  ): Promise<Either<ErrorClass, InventoryStockEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, InventoryStockEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryStockEntity>(ApiError.badRequest());
    }
  }

  async deleteInventoryStock(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}