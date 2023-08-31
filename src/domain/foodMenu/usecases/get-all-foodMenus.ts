import { FoodMenuModel, FoodMenuEntity } from "@domain/foodMenu/entities/foodMenu";
import { FoodMenuRepository } from "@domain/foodMenu/repositories/foodMenu-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllFoodMenusUsecase {
  execute: () => Promise<Either<ErrorClass, FoodMenuEntity[]>>;
}

export class GetAllFoodMenus implements GetAllFoodMenusUsecase {
  private readonly foodMenuRepository: FoodMenuRepository;

  constructor(foodMenuRepository: FoodMenuRepository) {
    this.foodMenuRepository = foodMenuRepository;
  }

  async execute(): Promise<Either<ErrorClass, FoodMenuEntity[]>> {
    return await this.foodMenuRepository.getFoodMenus();
  }
}
