import { IngredientCategoryModel, IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";

export interface IngredientCategoryRepository {
  createIngredientCategory(ingredientCategory: IngredientCategoryModel): Promise<IngredientCategoryEntity>;
  deleteIngredientCategory(id: string): Promise<void>;
  updateIngredientCategory(id: string, data: IngredientCategoryModel): Promise<IngredientCategoryEntity>;
  getIngredientCategorys(): Promise<IngredientCategoryEntity[]>;
  getIngredientCategoryById(id: string): Promise<IngredientCategoryEntity | null>;
}
