import { IngredientUnitModel, IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";
import { IngredientUnitDataSource } from "@data/ingredientUnit/datasources/ingredientUnit-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class IngredientUnitRepositoryImpl implements IngredientUnitRepository {
  private readonly dataSource: IngredientUnitDataSource;

  constructor(dataSource: IngredientUnitDataSource) {
    this.dataSource = dataSource;
  }

  async createIngredientUnit(ingredientUnit: IngredientUnitModel): Promise<Either<ErrorClass, IngredientUnitEntity>> {
    // return await this.dataSource.create(ingredientUnit);
    try {
      let i = await this.dataSource.create(ingredientUnit);
      return Right<ErrorClass, IngredientUnitEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "ingredientUnitName_conflict"){
        return Left<ErrorClass, IngredientUnitEntity>(ApiError.ingredientUnitNameExits());
      }
      return Left<ErrorClass, IngredientUnitEntity>(ApiError.badRequest());
    }
  }

  async deleteIngredientUnit(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateIngredientUnit(id: string, data: IngredientUnitModel): Promise<Either<ErrorClass, IngredientUnitEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, IngredientUnitEntity>(i);
    } catch {
      return Left<ErrorClass, IngredientUnitEntity>(ApiError.badRequest());
    }
  }

  async getIngredientUnits(): Promise<Either<ErrorClass, IngredientUnitEntity[]>> {
    // return await this.dataSource.getAllIngredientUnits();
    try {
      let i = await this.dataSource.getAllIngredientUnits();
      return Right<ErrorClass, IngredientUnitEntity[]>(i);
    } catch {
      return Left<ErrorClass, IngredientUnitEntity[]>(ApiError.badRequest());
    }
  }

  async getIngredientUnitById(id: string): Promise<Either<ErrorClass, IngredientUnitEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, IngredientUnitEntity | null>(i);
    } catch {
      return Left<ErrorClass, IngredientUnitEntity | null>(ApiError.badRequest());
    }
  }
}
