import {
  PurchaseEntity,
  PurchaseModel,
} from "@domain/purchase/entities/purchase";
import { PurchaseRepository } from "@domain/purchase/repositories/purchase-repository";
import { PurchaseDataSource } from "@data/purchase/datasource/purchase-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class PurchaseRepositoryImpl implements PurchaseRepository {
  private readonly dataSource: PurchaseDataSource;

  constructor(dataSource: PurchaseDataSource) {
    this.dataSource = dataSource;
  }

  async createPurchase(
    purchase: PurchaseModel
  ): Promise<Either<ErrorClass, PurchaseEntity>> {
    try {
      const i = await this.dataSource.create(purchase);
      return Right<ErrorClass, PurchaseEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, PurchaseEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, PurchaseEntity>(ApiError.badRequest());
    }
  }

  async getPurchases(): Promise<Either<ErrorClass, PurchaseEntity[]>> {
    try {
      const response = await this.dataSource.getAllPurchases();
      return Right<ErrorClass, PurchaseEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, PurchaseEntity[]>(
          ApiError.notFound()
        );
      }
      return Left<ErrorClass, PurchaseEntity[]>(ApiError.badRequest());
    }
  }

  async getPurchaseById(
    id: string
  ): Promise<Either<ErrorClass, PurchaseEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, PurchaseEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, PurchaseEntity>(response);
    } catch (error) {
      return Left<ErrorClass, PurchaseEntity>(ApiError.badRequest());
    }
  }

  async updatePurchase(
    id: string,
    data: PurchaseModel
  ): Promise<Either<ErrorClass, PurchaseEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, PurchaseEntity>(response);
    } catch (error) {
      return Left<ErrorClass, PurchaseEntity>(ApiError.badRequest());
    }
  }

  async deletePurchase(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}