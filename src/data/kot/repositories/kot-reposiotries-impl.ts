import { Either, Left, Right } from "monet";
import { KotDataSource } from "../datasources/kot-data-sources";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { KotRepository } from "@domain/kot/repositories/kot-repository";
import { KotEntity, KotModel } from "@domain/kot/entities/kot";


export class KotRepositoryImpl implements KotRepository{
  private readonly dataSource: KotDataSource;
  constructor(dataSource:KotDataSource){
     this.dataSource = dataSource;
  }
  async createKot(
    kot: KotModel
  ): Promise<Either<ErrorClass, KotEntity>> {
    try {
      let i = await this.dataSource.create(kot);
      return Right<ErrorClass, KotEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, KotEntity>(ApiError.kitchen_codeExists());
      }
      return Left<ErrorClass, KotEntity>(ApiError.badRequest());
    }
  }
  async getKot(): Promise<Either<ErrorClass, KotEntity[]>> {
    try {
      let i = await this.dataSource.getAllKot();
      return Right<ErrorClass, KotEntity[]>(i);
    } catch {
      return Left<ErrorClass, KotEntity[]>(ApiError.badRequest());
    }
  }

}