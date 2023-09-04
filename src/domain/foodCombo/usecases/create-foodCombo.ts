import { FoodComboModel, FoodComboEntity } from "@domain/foodCombo/entities/foodCombo";
import { FoodComboRepository } from "@domain/foodCombo/repositories/foodCombo-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateFoodComboUsecase {
  execute: (foodComboData: FoodComboModel) => Promise<Either<ErrorClass, FoodComboEntity>>;
}

export class CreateFoodCombo implements CreateFoodComboUsecase {
  private readonly foodComboRepository: FoodComboRepository;

  constructor(foodComboRepository: FoodComboRepository) {
    this.foodComboRepository = foodComboRepository;
  }

  async execute(foodComboData: FoodComboModel): Promise<Either<ErrorClass, FoodComboEntity>> {
    return await this.foodComboRepository.createFoodCombo(foodComboData);
  }
}
