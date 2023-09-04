import {type FoodComboRepository } from "@domain/foodCombo/repositories/foodCombo-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteFoodComboUsecase {
  execute: (foodComboId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteFoodCombo implements DeleteFoodComboUsecase {
  private readonly foodComboRepository: FoodComboRepository;

  constructor(foodComboRepository: FoodComboRepository) {
    this.foodComboRepository = foodComboRepository;
  }

  async execute(foodComboId: string): Promise<Either<ErrorClass, void>> {
    return await this.foodComboRepository.deleteFoodCombo(foodComboId);
  }
}
