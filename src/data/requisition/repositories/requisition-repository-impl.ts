import {
  RequisitionEntity,
  RequisitionModel,
} from "@domain/requisition/entities/requisition";
import { RequisitionRepository } from "@domain/requisition/repositories/requistion-repository";
import { RequisitionDataSource } from "@data/requisition/datasource/requisition-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class RequisitionRepositoryImpl implements RequisitionRepository {
  private readonly dataSource: RequisitionDataSource;

  constructor(dataSource: RequisitionDataSource) {
    this.dataSource = dataSource;
  }

  async getRequisitions(): Promise<Either<ErrorClass, RequisitionEntity[]>> {
    try {
      const response = await this.dataSource.getAllRequisitions();
      return Right<ErrorClass, RequisitionEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, RequisitionEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, RequisitionEntity[]>(ApiError.badRequest());
    }
  }

  async getRequisitionById(
    id: string
  ): Promise<Either<ErrorClass, RequisitionEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, RequisitionEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, RequisitionEntity>(response);
    } catch (error) {
      return Left<ErrorClass, RequisitionEntity>(ApiError.badRequest());
    }
  }

  async updateRequisition(
    id: string,
    data: RequisitionModel
  ): Promise<Either<ErrorClass, RequisitionEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, RequisitionEntity>(response);
    } catch (error) {
      return Left<ErrorClass, RequisitionEntity>(ApiError.badRequest());
    }
  }
}
