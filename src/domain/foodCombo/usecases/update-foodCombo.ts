import { FoodComboModel, FoodComboEntity } from "@domain/foodCombo/entities/foodCombo";
import { FoodComboRepository } from "@domain/foodCombo/repositories/foodCombo-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateFoodComboUsecase {
  execute: (
    foodComboId: string,
    foodComboData: FoodComboModel
  ) => Promise<Either<ErrorClass, FoodComboEntity>>;
}

export class UpdateFoodCombo implements UpdateFoodComboUsecase {
  private readonly foodComboRepository: FoodComboRepository;

  constructor(foodComboRepository: FoodComboRepository) {
    this.foodComboRepository = foodComboRepository;
  }
  async execute(foodComboId: string, foodComboData: FoodComboModel): Promise<Either<ErrorClass, FoodComboEntity>> {
   return await this.foodComboRepository.updateFoodCombo(foodComboId, foodComboData);
 }
}
