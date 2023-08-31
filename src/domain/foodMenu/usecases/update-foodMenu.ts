import { FoodMenuModel, FoodMenuEntity } from "@domain/foodMenu/entities/foodMenu";
import { FoodMenuRepository } from "@domain/foodMenu/repositories/foodMenu-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateFoodMenuUsecase {
  execute: (
    foodMenuId: string,
    foodMenuData: FoodMenuModel
  ) => Promise<Either<ErrorClass, FoodMenuEntity>>;
}

export class UpdateFoodMenu implements UpdateFoodMenuUsecase {
  private readonly foodMenuRepository: FoodMenuRepository;

  constructor(foodMenuRepository: FoodMenuRepository) {
    this.foodMenuRepository = foodMenuRepository;
  }
  async execute(foodMenuId: string, foodMenuData: FoodMenuModel): Promise<Either<ErrorClass, FoodMenuEntity>> {
   return await this.foodMenuRepository.updateFoodMenu(foodMenuId, foodMenuData);
 }
}
