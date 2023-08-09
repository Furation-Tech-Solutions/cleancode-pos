import { IngredientModel, IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface IngredientRepository {
  createIngredient(ingredient: IngredientModel): Promise<Either<ErrorClass, IngredientEntity>>;
  deleteIngredient(id: string): Promise<Either<ErrorClass, void>>;
  updateIngredient(id: string, data: IngredientModel): Promise<Either<ErrorClass, IngredientEntity>>;
  getIngredients(): Promise<Either<ErrorClass, IngredientEntity[]>>;
  getIngredientById(id: string): Promise<Either<ErrorClass, IngredientEntity | null>>;
}
