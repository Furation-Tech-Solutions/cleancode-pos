import { FoodMenuModel, FoodMenuEntity } from "@domain/foodMenu/entities/foodMenu";
import { FoodMenuRepository } from "@domain/foodMenu/repositories/foodMenu-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetFoodMenuByIdUsecase {
  execute: (foodMenuId: string) => Promise<Either<ErrorClass, FoodMenuEntity | null>>;
}

export class GetFoodMenuById implements GetFoodMenuByIdUsecase {
  private readonly foodMenuRepository: FoodMenuRepository;

  constructor(foodMenuRepository: FoodMenuRepository) {
    this.foodMenuRepository = foodMenuRepository;
  }

  async execute(foodMenuId: string): Promise<Either<ErrorClass, FoodMenuEntity | null>> {
    return await this.foodMenuRepository.getFoodMenuById(foodMenuId);
  }
}
