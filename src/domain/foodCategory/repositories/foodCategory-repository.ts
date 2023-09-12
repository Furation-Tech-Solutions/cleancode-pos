import { FoodCategoryModel, FoodCategoryEntity } from "@domain/foodCategory/entities/foodCategory";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface FoodCategoryRepository {
  createFoodCategory(foodCategory_Name: FoodCategoryModel): Promise<Either<ErrorClass, FoodCategoryEntity>>;
  deleteFoodCategory(id: string): Promise<Either<ErrorClass, void>>;
  updateFoodCategory(id: string, data: FoodCategoryModel): Promise<Either<ErrorClass, FoodCategoryEntity>>;
  getFoodCategorys(): Promise<Either<ErrorClass, FoodCategoryEntity[]>>;
  getFoodCategoryById(id: string): Promise<Either<ErrorClass, FoodCategoryEntity | null>>;
}
