import { FoodComboModel, FoodComboEntity } from "@domain/foodCombo/entities/foodCombo";
import { FoodComboRepository } from "@domain/foodCombo/repositories/foodCombo-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetFoodComboByIdUsecase {
  execute: (foodComboId: string) => Promise<Either<ErrorClass, FoodComboEntity | null>>;
}

export class GetFoodComboById implements GetFoodComboByIdUsecase {
  private readonly foodComboRepository: FoodComboRepository;

  constructor(foodComboRepository: FoodComboRepository) {
    this.foodComboRepository = foodComboRepository;
  }

  async execute(foodComboId: string): Promise<Either<ErrorClass, FoodComboEntity | null>> {
    return await this.foodComboRepository.getFoodComboById(foodComboId);
  }
}
