import { IngredientModel, IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";
import { IngredientDataSource } from "@data/ingredient/datasources/ingredient-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class IngredientRepositoryImpl implements IngredientRepository {
  private readonly dataSource: IngredientDataSource;

  constructor(dataSource: IngredientDataSource) {
    this.dataSource = dataSource;
  }

  async createIngredient(ingredient: IngredientModel): Promise<Either<ErrorClass, IngredientEntity>> {
    // return await this.dataSource.create(ingredient);
    try {
      let i = await this.dataSource.create(ingredient);
      return Right<ErrorClass, IngredientEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "ingredient_conflict"){
        return Left<ErrorClass, IngredientEntity>(ApiError.ingredientExits());
      }
      return Left<ErrorClass, IngredientEntity>(ApiError.badRequest());
    }
  }

  async deleteIngredient(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateIngredient(id: string, data: IngredientModel): Promise<Either<ErrorClass, IngredientEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, IngredientEntity>(i);
    } catch {
      return Left<ErrorClass, IngredientEntity>(ApiError.badRequest());
    }
  }

  async getIngredients(): Promise<Either<ErrorClass, IngredientEntity[]>> {
    // return await this.dataSource.getAllIngredients();
    try {
      let i = await this.dataSource.getAllIngredients();
      return Right<ErrorClass, IngredientEntity[]>(i);
    } catch {
      return Left<ErrorClass, IngredientEntity[]>(ApiError.badRequest());
    }
  }

  async getIngredientById(id: string): Promise<Either<ErrorClass, IngredientEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, IngredientEntity | null>(i);
    } catch {
      return Left<ErrorClass, IngredientEntity | null>(ApiError.badRequest());
    }
  }
}
