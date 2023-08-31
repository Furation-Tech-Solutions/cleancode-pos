import { PreMadeFoodModel, PreMadeFoodEntity } from "@domain/preMadeFood/entities/preMadeFood";
import { PreMadeFoodRepository } from "@domain/preMadeFood/repositories/preMadeFood-repository"; 
import { PreMadeFoodDataSource } from "@data/preMadeFood/datasource/preMadeFood-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class PreMadeFoodRepositoryImpl implements PreMadeFoodRepository {
  private readonly dataSource: PreMadeFoodDataSource;

  constructor(dataSource: PreMadeFoodDataSource) {
    this.dataSource = dataSource;
  }

  async createPreMadeFood(preMadeFood: PreMadeFoodModel): Promise<Either<ErrorClass, PreMadeFoodEntity>> {
    // return await this.dataSource.create(preMadeFood);
    try {
      let i = await this.dataSource.create(preMadeFood);
      return Right<ErrorClass, PreMadeFoodEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "preMadeFoodName_conflict"){
        return Left<ErrorClass, PreMadeFoodEntity>(ApiError.preMadeFoodExists());
      }
      return Left<ErrorClass, PreMadeFoodEntity>(ApiError.badRequest());
    }
  }

  async deletePreMadeFood(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updatePreMadeFood(id: string, data: PreMadeFoodModel): Promise<Either<ErrorClass, PreMadeFoodEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, PreMadeFoodEntity>(i);
    } catch {
      return Left<ErrorClass, PreMadeFoodEntity>(ApiError.badRequest());
    }
  }

  async getPreMadeFoods(): Promise<Either<ErrorClass, PreMadeFoodEntity[]>> {
    // return await this.dataSource.getAllPreMadeFoods();
    try {
      let i = await this.dataSource.getAllPreMadeFoods();
      return Right<ErrorClass, PreMadeFoodEntity[]>(i);
    } catch {
      return Left<ErrorClass, PreMadeFoodEntity[]>(ApiError.badRequest());
    }
  }

  async getPreMadeFoodById(id: string): Promise<Either<ErrorClass, PreMadeFoodEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, PreMadeFoodEntity | null>(i);
    } catch {
      return Left<ErrorClass, PreMadeFoodEntity | null>(ApiError.badRequest());
    }
  }
}
