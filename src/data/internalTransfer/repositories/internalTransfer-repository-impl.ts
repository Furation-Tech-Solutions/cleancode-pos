import {
  InternalTransferEntity,
  InternalTransferModel,
} from "@domain/internalTransfer/entities/internalTransfer";
import { InternalTransferRepository } from "@domain/internalTransfer/repositories/internalTransfer-repository";
import { InternalTransferDataSource } from "@data/internalTransfer/datasources/internalTransfer-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class InternalTransferRepositoryImpl implements InternalTransferRepository {
  private readonly dataSource: InternalTransferDataSource;

  constructor(dataSource: InternalTransferDataSource) {
    this.dataSource = dataSource;
  }

  async createInternalTransfer(
    internalTransfer: InternalTransferModel
  ): Promise<Either<ErrorClass, InternalTransferEntity>> {
    try {
      const i = await this.dataSource.create(internalTransfer);
      return Right<ErrorClass, InternalTransferEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InternalTransferEntity>(
          ApiError.unAuthorized()
        );
      }
      return Left<ErrorClass, InternalTransferEntity>(ApiError.badRequest());
    }
  }

  async getInternalTransferById(
    id: string
  ): Promise<Either<ErrorClass, InternalTransferEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      
      if (response === null) {
        return Left<ErrorClass, InternalTransferEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, InternalTransferEntity>(response);
    } catch (error) {
      return Left<ErrorClass, InternalTransferEntity>(ApiError.badRequest());
    }
  }

  async getInternalTransfers(): Promise<
    Either<ErrorClass, InternalTransferEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllInternalTransfers();
      return Right<ErrorClass, InternalTransferEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, InternalTransferEntity[]>(
          ApiError.unAuthorized()
        );
      }
      return Left<ErrorClass, InternalTransferEntity[]>(ApiError.badRequest());
    }
  }

  async updateInternalTransfer(
    id: string,
    data: InternalTransferModel
  ): Promise<Either<ErrorClass, InternalTransferEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, InternalTransferEntity>(response);
    } catch (error) {      
      return Left<ErrorClass, InternalTransferEntity>(ApiError.badRequest());
    }
  }

  async deleteInternalTransfer(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}