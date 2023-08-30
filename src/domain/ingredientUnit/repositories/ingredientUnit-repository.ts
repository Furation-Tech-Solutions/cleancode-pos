import { IngredientUnitModel, IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface IngredientUnitRepository {
  createIngredientUnit(ingredientUnit: IngredientUnitModel): Promise<Either<ErrorClass, IngredientUnitEntity>>;
  deleteIngredientUnit(id: string): Promise<Either<ErrorClass, void>>;
  updateIngredientUnit(id: string, data: IngredientUnitModel): Promise<Either<ErrorClass, IngredientUnitEntity>>;
  getIngredientUnits(): Promise<Either<ErrorClass, IngredientUnitEntity[]>>;
  getIngredientUnitById(id: string): Promise<Either<ErrorClass, IngredientUnitEntity | null>>;
}
