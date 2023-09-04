import { FoodComboModel, FoodComboEntity } from "@domain/foodCombo/entities/foodCombo";
import { FoodComboRepository } from "@domain/foodCombo/repositories/foodCombo-repository"; 
import { FoodComboDataSource } from "@data/foodCombo/datasource/foodCombo-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class FoodComboRepositoryImpl implements FoodComboRepository {
  private readonly dataSource: FoodComboDataSource;

  constructor(dataSource: FoodComboDataSource) {
    this.dataSource = dataSource;
  }

  async createFoodCombo(foodCombo: FoodComboModel): Promise<Either<ErrorClass, FoodComboEntity>> {
    // return await this.dataSource.create(foodCombo);
    try {
      let i = await this.dataSource.create(foodCombo);
      return Right<ErrorClass, FoodComboEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "foodComboName_conflict"){
        return Left<ErrorClass, FoodComboEntity>(ApiError.foodComboExists());
      }
      return Left<ErrorClass, FoodComboEntity>(ApiError.badRequest());
    }
  }

  async deleteFoodCombo(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateFoodCombo(id: string, data: FoodComboModel): Promise<Either<ErrorClass, FoodComboEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, FoodComboEntity>(i);
    } catch {
      return Left<ErrorClass, FoodComboEntity>(ApiError.badRequest());
    }
  }

  async getFoodCombos(): Promise<Either<ErrorClass, FoodComboEntity[]>> {
    // return await this.dataSource.getAllFoodCombos();
    try {
      let i = await this.dataSource.getAllFoodCombos();
      return Right<ErrorClass, FoodComboEntity[]>(i);
    } catch {
      return Left<ErrorClass, FoodComboEntity[]>(ApiError.badRequest());
    }
  }

  async getFoodComboById(id: string): Promise<Either<ErrorClass, FoodComboEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, FoodComboEntity | null>(i);
    } catch {
      return Left<ErrorClass, FoodComboEntity | null>(ApiError.badRequest());
    }
  }
}
