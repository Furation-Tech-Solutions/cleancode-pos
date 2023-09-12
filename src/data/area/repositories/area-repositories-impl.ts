import { AreaModel, AreaEntity } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";
import { AreaDataSource } from "@data/area/datasources/area-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class AreaRepositoryImpl implements AreaRepository {
  private readonly dataSource: AreaDataSource;

  constructor(dataSource: AreaDataSource) {
    this.dataSource = dataSource;
  }

  async createArea(area: AreaModel): Promise<Either<ErrorClass, AreaEntity>> {
    // return await this.dataSource.create(area);
    try {
      let i = await this.dataSource.create(area);
      return Right<ErrorClass, AreaEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "areaName_conflict"){
        return Left<ErrorClass, AreaEntity>(ApiError.phoneNumberExits());
      }
      return Left<ErrorClass, AreaEntity>(ApiError.badRequest());
    }
  }

  async deleteArea(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateArea(id: string, data: AreaModel): Promise<Either<ErrorClass, AreaEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, AreaEntity>(i);
    } catch {
      return Left<ErrorClass, AreaEntity>(ApiError.badRequest());
    }
  }

  async getAreas(): Promise<Either<ErrorClass, AreaEntity[]>> {
    // return await this.dataSource.getAllAreas();
    try {
      let i = await this.dataSource.getAllAreas();
      return Right<ErrorClass, AreaEntity[]>(i);
    } catch {
      return Left<ErrorClass, AreaEntity[]>(ApiError.badRequest());
    }
  }

  async getAreaById(id: string): Promise<Either<ErrorClass, AreaEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, AreaEntity | null>(i);
    } catch {
      return Left<ErrorClass, AreaEntity | null>(ApiError.badRequest());
    }
  }
}