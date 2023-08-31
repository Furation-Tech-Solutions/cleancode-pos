import {type FoodMenuRepository } from "@domain/foodMenu/repositories/foodMenu-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteFoodMenuUsecase {
  execute: (foodMenuId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteFoodMenu implements DeleteFoodMenuUsecase {
  private readonly foodMenuRepository: FoodMenuRepository;

  constructor(foodMenuRepository: FoodMenuRepository) {
    this.foodMenuRepository = foodMenuRepository;
  }

  async execute(foodMenuId: string): Promise<Either<ErrorClass, void>> {
    return await this.foodMenuRepository.deleteFoodMenu(foodMenuId);
  }
}
