import { FoodMenuModel, FoodMenuEntity } from "@domain/foodMenu/entities/foodMenu";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface FoodMenuRepository {
  createFoodMenu(FoodMenu: FoodMenuModel): Promise<Either<ErrorClass, FoodMenuEntity>>;
  deleteFoodMenu(id: string): Promise<Either<ErrorClass, void>>;
  updateFoodMenu(id: string, data: FoodMenuModel): Promise<Either<ErrorClass, FoodMenuEntity>>;
  getFoodMenus(): Promise<Either<ErrorClass, FoodMenuEntity[]>>;
  getFoodMenuById(id: string): Promise<Either<ErrorClass, FoodMenuEntity | null>>;
}

