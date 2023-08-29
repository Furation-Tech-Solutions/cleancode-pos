import {
  InventoryItemEntity,
  InventoryItemModel,
} from "@domain/inventoryItem/entities/inventoryItem";
import { InventoryItemRepository } from "@domain/inventoryItem/repositories/inventoryItem-repository";
import { InventoryItemDataSource } from "@data/inventoryItem/datasource/inventoryItem-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InventoryItemRepositoryImpl implements InventoryItemRepository {
  private readonly dataSource: InventoryItemDataSource;

  constructor(dataSource: InventoryItemDataSource) {
    this.dataSource = dataSource;
  }

  async createInventoryItem(
    inventoryItem: InventoryItemModel
  ): Promise<Either<ErrorClass, InventoryItemEntity>> {
    try {
      const i = await this.dataSource.create(inventoryItem);
      return Right<ErrorClass, InventoryItemEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InventoryItemEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, InventoryItemEntity>(ApiError.badRequest());
    }
  }

  async getInventoryItemById(
    id: string
  ): Promise<Either<ErrorClass, InventoryItemEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, InventoryItemEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, InventoryItemEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryItemEntity>(ApiError.badRequest());
    }
  }

  async getInventoryItems(): Promise<
    Either<ErrorClass, InventoryItemEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllInventoryItems();
      return Right<ErrorClass, InventoryItemEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InventoryItemEntity[]>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, InventoryItemEntity[]>(ApiError.badRequest());
    }
  }

  async updateInventoryItem(
    id: string,
    data: InventoryItemModel
  ): Promise<Either<ErrorClass, InventoryItemEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, InventoryItemEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryItemEntity>(ApiError.badRequest());
    }
  }

  async deleteInventoryItem(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}