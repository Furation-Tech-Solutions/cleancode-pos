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

  async createRequisition(
    requisition: RequisitionModel
  ): Promise<Either<ErrorClass, RequisitionEntity>> {
    try {
      const i = await this.dataSource.create(requisition);
      return Right<ErrorClass, RequisitionEntity>(i);
    } catch (error) {
      
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, RequisitionEntity>(ApiError.unAuthorized());
      }
      console.log(error);
      
      return Left<ErrorClass, RequisitionEntity>(ApiError.badRequest());
    }
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
      console.log(error);
      
      
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

  async deleteRequisition(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
