import { CuisineModel, CuisineEntity } from "@domain/cuisine/entities/cuisine";
import { CuisineRepository } from "@domain/cuisine/repositories/cuisine-repository"; 
import { CuisineDataSource } from "@data/cuisine/datasource/cuisine-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class CuisineRepositoryImpl implements CuisineRepository {
  private readonly dataSource: CuisineDataSource;

  constructor(dataSource: CuisineDataSource) {
    this.dataSource = dataSource;
  }

  async createCuisine(cuisine: CuisineModel): Promise<Either<ErrorClass, CuisineEntity>> {
    // return await this.dataSource.create(cuisine);
    try {
      let i = await this.dataSource.create(cuisine);
      return Right<ErrorClass, CuisineEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "cuisineName_conflict"){
        return Left<ErrorClass, CuisineEntity>(ApiError.cuisineExists());
      }
      return Left<ErrorClass, CuisineEntity>(ApiError.badRequest());
    }
  }

  async deleteCuisine(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateCuisine(id: string, data: CuisineModel): Promise<Either<ErrorClass, CuisineEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, CuisineEntity>(i);
    } catch {
      return Left<ErrorClass, CuisineEntity>(ApiError.badRequest());
    }
  }

  async getCuisines(): Promise<Either<ErrorClass, CuisineEntity[]>> {
    // return await this.dataSource.getAllCuisines();
    try {
      let i = await this.dataSource.getAllCuisines();
      return Right<ErrorClass, CuisineEntity[]>(i);
    } catch {
      return Left<ErrorClass, CuisineEntity[]>(ApiError.badRequest());
    }
  }

  async getCuisineById(id: string): Promise<Either<ErrorClass, CuisineEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, CuisineEntity | null>(i);
    } catch {
      return Left<ErrorClass, CuisineEntity | null>(ApiError.badRequest());
    }
  }
}
