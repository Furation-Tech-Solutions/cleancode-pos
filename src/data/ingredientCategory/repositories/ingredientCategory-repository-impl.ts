import { IngredientCategoryModel, IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";
import { IngredientCategoryDataSource } from "@data/ingredientCategory/datasources/ingredientCategory-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class IngredientCategoryRepositoryImpl implements IngredientCategoryRepository {
  private readonly dataSource: IngredientCategoryDataSource;

  constructor(dataSource: IngredientCategoryDataSource) {
    this.dataSource = dataSource;
  }

  async createIngredientCategory(ingredientCategory_name: IngredientCategoryModel): Promise<Either<ErrorClass, IngredientCategoryEntity>> {
    // return await this.dataSource.create(ingredientCategory);
    try {
      let i = await this.dataSource.create(ingredientCategory_name);
      return Right<ErrorClass, IngredientCategoryEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "ingredientCategory_conflict"){
        return Left<ErrorClass, IngredientCategoryEntity>(ApiError.ingredientCategoryExits());
      }
      return Left<ErrorClass, IngredientCategoryEntity>(ApiError.badRequest());
    }
  }

  async deleteIngredientCategory(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateIngredientCategory(id: string, data: IngredientCategoryModel): Promise<Either<ErrorClass, IngredientCategoryEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, IngredientCategoryEntity>(i);
    } catch {
      return Left<ErrorClass, IngredientCategoryEntity>(ApiError.badRequest());
    }
  }

  async getIngredientCategorys(): Promise<Either<ErrorClass, IngredientCategoryEntity[]>> {
    // return await this.dataSource.getAllIngredientCategorys();
    try {
      let i = await this.dataSource.getAllIngredientCategorys();
      return Right<ErrorClass, IngredientCategoryEntity[]>(i);
    } catch {
      return Left<ErrorClass, IngredientCategoryEntity[]>(ApiError.badRequest());
    }
  }

  async getIngredientCategoryById(id: string): Promise<Either<ErrorClass, IngredientCategoryEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, IngredientCategoryEntity | null>(i);
    } catch {
      return Left<ErrorClass, IngredientCategoryEntity | null>(ApiError.badRequest());
    }
  }
}
