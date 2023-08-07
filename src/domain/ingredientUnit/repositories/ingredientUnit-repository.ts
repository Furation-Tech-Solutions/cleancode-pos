import { IngredientUnitModel, IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";

export interface IngredientUnitRepository {
  createIngredientUnit(ingredientUnit: IngredientUnitModel): Promise<IngredientUnitEntity>;
  deleteIngredientUnit(id: string): Promise<void>;
  updateIngredientUnit(id: string, data: IngredientUnitModel): Promise<IngredientUnitEntity>;
  getIngredientUnits(): Promise<IngredientUnitEntity[]>;
  getIngredientUnitById(id: string): Promise<IngredientUnitEntity | null>;
}
