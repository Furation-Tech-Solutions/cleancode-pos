import { IngredientModel, IngredientEntity } from "@domain/ingredient/entities/ingredient";

export interface IngredientRepository {
  createIngredient(ingredient: IngredientModel): Promise<IngredientEntity>;
  deleteIngredient(id: string): Promise<void>;
  updateIngredient(id: string, data: IngredientModel): Promise<IngredientEntity>;
  getIngredients(): Promise<IngredientEntity[]>;
  getIngredientById(id: string): Promise<IngredientEntity | null>;
}
