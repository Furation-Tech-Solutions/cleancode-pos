import {
  RequisitionItemEntity,
  RequisitionItemModel,
} from "@domain/requisitionItem/entities/requisitionItem";
import { RequisitionItemRepository } from "@domain/requisitionItem/repositories/requisitionItem-repository";
import { RequisitionItemDataSource } from "@data/requisitionItem/datasource/requisitionItem-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class RequisitionItemRepositoryImpl implements RequisitionItemRepository {
  private readonly dataSource: RequisitionItemDataSource;

  constructor(dataSource: RequisitionItemDataSource) {
    this.dataSource = dataSource;
  }

  async createRequisitionItem(
    requisitionItem: RequisitionItemModel
  ): Promise<Either<ErrorClass, RequisitionItemEntity>> {
    try {
      const i = await this.dataSource.create(requisitionItem);
      return Right<ErrorClass, RequisitionItemEntity>(i);
    } catch (error) {
      console.log(error);
      
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, RequisitionItemEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, RequisitionItemEntity>(ApiError.badRequest());
    }
  }

  async getRequisitionItems(): Promise<
    Either<ErrorClass, RequisitionItemEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllRequisitionItems();
      return Right<ErrorClass, RequisitionItemEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, RequisitionItemEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, RequisitionItemEntity[]>(ApiError.badRequest());
    }
  }

  async getRequisitionItemById(
    id: string
  ): Promise<Either<ErrorClass, RequisitionItemEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, RequisitionItemEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, RequisitionItemEntity>(response);
    } catch (error) {
      return Left<ErrorClass, RequisitionItemEntity>(ApiError.badRequest());
    }
  }

  async updateRequisitionItem(
    id: string,
    data: RequisitionItemModel
  ): Promise<Either<ErrorClass, RequisitionItemEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, RequisitionItemEntity>(response);
    } catch (error) {
      return Left<ErrorClass, RequisitionItemEntity>(ApiError.badRequest());
    }
  }

  async deleteRequisitionItem(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
