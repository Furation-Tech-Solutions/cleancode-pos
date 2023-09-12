import { FoodMenuModel, FoodMenuEntity } from "@domain/foodMenu/entities/foodMenu";
import { FoodMenuRepository } from "@domain/foodMenu/repositories/foodMenu-repository"; 
import { FoodMenuDataSource } from "@data/foodMenu/datasource/foodMenu-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class FoodMenuRepositoryImpl implements FoodMenuRepository {
  private readonly dataSource: FoodMenuDataSource;

  constructor(dataSource: FoodMenuDataSource) {
    this.dataSource = dataSource;
  }

  async createFoodMenu(foodMenu: FoodMenuModel): Promise<Either<ErrorClass, FoodMenuEntity>> {
    // return await this.dataSource.create(foodMenu);
    try {
      let i = await this.dataSource.create(foodMenu);
      return Right<ErrorClass, FoodMenuEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "foodMenuName_conflict"){
        return Left<ErrorClass, FoodMenuEntity>(ApiError.foodMenuExists());
      }
      return Left<ErrorClass, FoodMenuEntity>(ApiError.badRequest());
    }
  }

  async deleteFoodMenu(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateFoodMenu(id: string, data: FoodMenuModel): Promise<Either<ErrorClass, FoodMenuEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, FoodMenuEntity>(i);
    } catch {
      return Left<ErrorClass, FoodMenuEntity>(ApiError.badRequest());
    }
  }

  async getFoodMenus(): Promise<Either<ErrorClass, FoodMenuEntity[]>> {
    // return await this.dataSource.getAllFoodMenus();
    try {
      let i = await this.dataSource.getAllFoodMenus();
      return Right<ErrorClass, FoodMenuEntity[]>(i);
    } catch {
      return Left<ErrorClass, FoodMenuEntity[]>(ApiError.badRequest());
    }
  }

  async getFoodMenuById(id: string): Promise<Either<ErrorClass, FoodMenuEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, FoodMenuEntity | null>(i);
    } catch {
      return Left<ErrorClass, FoodMenuEntity | null>(ApiError.badRequest());
    }
  }
}
