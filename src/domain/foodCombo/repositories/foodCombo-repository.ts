import { FoodComboModel, FoodComboEntity } from "@domain/foodCombo/entities/foodCombo";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface FoodComboRepository {
  createFoodCombo(FoodCombo: FoodComboModel): Promise<Either<ErrorClass, FoodComboEntity>>;
  deleteFoodCombo(id: string): Promise<Either<ErrorClass, void>>;
  updateFoodCombo(id: string, data: FoodComboModel): Promise<Either<ErrorClass, FoodComboEntity>>;
  getFoodCombos(): Promise<Either<ErrorClass, FoodComboEntity[]>>;
  getFoodComboById(id: string): Promise<Either<ErrorClass, FoodComboEntity | null>>;
}

