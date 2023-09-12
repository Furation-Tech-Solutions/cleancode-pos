import { IngredientCategoryModel, IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface IngredientCategoryRepository {
  createIngredientCategory(ingredientCategory: IngredientCategoryModel): Promise<Either<ErrorClass, IngredientCategoryEntity>>;
  deleteIngredientCategory(id: string): Promise<Either<ErrorClass, void>>;
  updateIngredientCategory(id: string, data: IngredientCategoryModel): Promise<Either<ErrorClass, IngredientCategoryEntity>>;
  getIngredientCategorys(): Promise<Either<ErrorClass, IngredientCategoryEntity[]>>;
  getIngredientCategoryById(id: string): Promise<Either<ErrorClass, IngredientCategoryEntity | null>>;
}
