import {
  InventoryBillingEntity,
  InventoryBillingModel,
} from "@domain/inventoryBilling/entities/inventoryBilling";
import { InventoryBillingRepository } from "@domain/inventoryBilling/repositories/inventoryBilling-repository";
import { InventoryBillingDataSource } from "@data/inventoryBilling/datasources/inventoryBilling-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InventoryBillingRepositoryImpl implements InventoryBillingRepository {
  private readonly dataSource: InventoryBillingDataSource;

  constructor(dataSource: InventoryBillingDataSource) {
    this.dataSource = dataSource;
  }

  async createInventoryBilling(
    inventoryBilling: InventoryBillingModel
  ): Promise<Either<ErrorClass, InventoryBillingEntity>> {
    try {
      const i = await this.dataSource.create(inventoryBilling);
      return Right<ErrorClass, InventoryBillingEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InventoryBillingEntity>(
          ApiError.unAuthorized()
        );
      }
      return Left<ErrorClass, InventoryBillingEntity>(ApiError.badRequest());
    }
  }

  async deleteInventoryBilling(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateInventoryBilling(
    id: string,
    data: InventoryBillingModel
  ): Promise<Either<ErrorClass, InventoryBillingEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, InventoryBillingEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryBillingEntity>(ApiError.badRequest());
    }
  }

  async getInventoryBillings(): Promise<
    Either<ErrorClass, InventoryBillingEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllInventoryBillings();
      return Right<ErrorClass, InventoryBillingEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InventoryBillingEntity[]>(
          ApiError.unAuthorized()
        );
      }
      return Left<ErrorClass, InventoryBillingEntity[]>(ApiError.badRequest());
    }
  }

  async getInventoryBillingById(
    id: string
  ): Promise<Either<ErrorClass, InventoryBillingEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, InventoryBillingEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, InventoryBillingEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InventoryBillingEntity>(ApiError.badRequest());
    }
  }
}
