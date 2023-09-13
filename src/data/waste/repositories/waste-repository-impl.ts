import { WasteEntity, WasteModel } from "@domain/waste/entities/waste";
import { WasteRepository } from "@domain/waste/repositories/waste-repository";
import { WasteDataSource } from "@data/waste/datasource/waste-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class WasteRepositoryImpl implements WasteRepository {
  private readonly dataSource: WasteDataSource;

  constructor(dataSource: WasteDataSource) {
    this.dataSource = dataSource;
  }

  async createWaste(
    waste: WasteModel
  ): Promise<Either<ErrorClass, WasteEntity>> {
    try {
      const i = await this.dataSource.create(waste);
      return Right<ErrorClass, WasteEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return Left<ErrorClass, WasteEntity>(ApiError.unAuthorized());
      }
      
      return Left<ErrorClass, WasteEntity>(ApiError.badRequest());
    }
  }

  async getWastes(): Promise<Either<ErrorClass, WasteEntity[]>> {
    try {
      const response = await this.dataSource.getAllWastes();
      return Right<ErrorClass, WasteEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, WasteEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, WasteEntity[]>(ApiError.badRequest());
    }
  }

  async getWasteById(id: string): Promise<Either<ErrorClass, WasteEntity>> {
    try {
      const response = await this.dataSource.getById(id);
      if (response === null) {
        return Left<ErrorClass, WasteEntity>(ApiError.notFound());
      }
      return Right<ErrorClass, WasteEntity>(response);
    } catch (error) {
      return Left<ErrorClass, WasteEntity>(ApiError.badRequest());
    }
  }

  async updateWaste(
    id: string,
    data: WasteModel
  ): Promise<Either<ErrorClass, WasteEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, WasteEntity>(response);
    } catch (error) {
      return Left<ErrorClass, WasteEntity>(ApiError.badRequest());
    }
  }

  async deleteWaste(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
