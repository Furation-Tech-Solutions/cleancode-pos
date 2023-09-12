import { FoodComboModel, FoodComboEntity } from "@domain/foodCombo/entities/foodCombo";
import { FoodComboRepository } from "@domain/foodCombo/repositories/foodCombo-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllFoodCombosUsecase {
  execute: () => Promise<Either<ErrorClass, FoodComboEntity[]>>;
}

export class GetAllFoodCombos implements GetAllFoodCombosUsecase {
  private readonly foodComboRepository: FoodComboRepository;

  constructor(foodComboRepository: FoodComboRepository) {
    this.foodComboRepository = foodComboRepository;
  }

  async execute(): Promise<Either<ErrorClass, FoodComboEntity[]>> {
    return await this.foodComboRepository.getFoodCombos();
  }
}
