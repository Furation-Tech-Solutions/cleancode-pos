import {
  InternalTransferItemEntity,
  InternalTransferItemModel,
} from "@domain/internalTransferItem/entities/internalTransferItem";
import { InternalTransferItemRepository } from "@domain/internalTransferItem/repositories/internalTransferItem-repository";
import { InternalTransferItemDataSource } from "@data/internalTransferItem/datasources/internalTransferItem-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InternalTransferItemRepositoryImpl
  implements InternalTransferItemRepository
{
  private readonly dataSource: InternalTransferItemDataSource;

  constructor(dataSource: InternalTransferItemDataSource) {
    this.dataSource = dataSource;
  }

  async createInternalTransferItem(
    internalTransferItem: InternalTransferItemModel
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>> {
    try {
      const i = await this.dataSource.create(internalTransferItem);
      return Right<ErrorClass, InternalTransferItemEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InternalTransferItemEntity>(
          ApiError.unAuthorized()
        );
      }
      console.log(error);
      
      return Left<ErrorClass, InternalTransferItemEntity>(
        ApiError.badRequest()
      );
    }
  }

  async getInternalTransferItemById(
    id: string
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>> {
    try {
      const response = await this.dataSource.getById(id);

      if (response === null) {
        return Left<ErrorClass, InternalTransferItemEntity>(
          ApiError.notFound()
        );
      }
      return Right<ErrorClass, InternalTransferItemEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InternalTransferItemEntity>(
        ApiError.badRequest()
      );
    }
  }

  async getInternalTransferItems(): Promise<
    Either<ErrorClass, InternalTransferItemEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllInternalTransferItems();
      return Right<ErrorClass, InternalTransferItemEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InternalTransferItemEntity[]>(
          ApiError.unAuthorized()
        );
      }
      return Left<ErrorClass, InternalTransferItemEntity[]>(
        ApiError.badRequest()
      );
    }
  }

  async updateInternalTransferItem(
    id: string,
    data: InternalTransferItemModel
  ): Promise<Either<ErrorClass, InternalTransferItemEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, InternalTransferItemEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InternalTransferItemEntity>(
        ApiError.badRequest()
      );
    }
  }

  async deleteInternalTransferItem(
    id: string
  ): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
