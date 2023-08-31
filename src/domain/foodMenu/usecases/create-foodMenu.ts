import { FoodMenuModel, FoodMenuEntity } from "@domain/foodMenu/entities/foodMenu";
import { FoodMenuRepository } from "@domain/foodMenu/repositories/foodMenu-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateFoodMenuUsecase {
  execute: (foodMenuData: FoodMenuModel) => Promise<Either<ErrorClass, FoodMenuEntity>>;
}

export class CreateFoodMenu implements CreateFoodMenuUsecase {
  private readonly foodMenuRepository: FoodMenuRepository;

  constructor(foodMenuRepository: FoodMenuRepository) {
    this.foodMenuRepository = foodMenuRepository;
  }

  async execute(foodMenuData: FoodMenuModel): Promise<Either<ErrorClass, FoodMenuEntity>> {
    return await this.foodMenuRepository.createFoodMenu(foodMenuData);
  }
}
