import { FoodCategoryModel, FoodCategoryEntity } from "@domain/foodCategory/entities/foodCategory";
import { FoodCategoryRepository } from "@domain/foodCategory/repositories/foodCategory-repository";
import { FoodCategoryDataSource } from "../datasources/foodCategory-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class FoodCategoryRepositoryImpl implements FoodCategoryRepository {
  private readonly dataSource: FoodCategoryDataSource;

  constructor(dataSource: FoodCategoryDataSource) {
    this.dataSource = dataSource;
  }

  async createFoodCategory(foodCategory_Name: FoodCategoryModel): Promise<Either<ErrorClass, FoodCategoryEntity>> {
    // return await this.dataSource.create(foodCategory_Name);
    try {
      let i = await this.dataSource.create(foodCategory_Name);
      return Right<ErrorClass, FoodCategoryEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "foodCategory_conflict"){
        return Left<ErrorClass, FoodCategoryEntity>(ApiError.phoneNumberExits());
      }
      return Left<ErrorClass, FoodCategoryEntity>(ApiError.badRequest());
    }
  }

  async deleteFoodCategory(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateFoodCategory(id: string, data: FoodCategoryModel): Promise<Either<ErrorClass, FoodCategoryEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, FoodCategoryEntity>(i);
    } catch {
      return Left<ErrorClass, FoodCategoryEntity>(ApiError.badRequest());
    }
  }

  async getFoodCategorys(): Promise<Either<ErrorClass, FoodCategoryEntity[]>> {
    // return await this.dataSource.getAllFoodCategorys();
    try {
      let i = await this.dataSource.getAllFoodCategorys();
      return Right<ErrorClass, FoodCategoryEntity[]>(i);
    } catch {
      return Left<ErrorClass, FoodCategoryEntity[]>(ApiError.badRequest());
    }
  }

  async getFoodCategoryById(id: string): Promise<Either<ErrorClass, FoodCategoryEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, FoodCategoryEntity | null>(i);
    } catch {
      return Left<ErrorClass, FoodCategoryEntity | null>(ApiError.badRequest());
    }
  }
}
