import { type FoodCategoryRepository } from "../repositories/foodCategory-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteFoodCategoryUsecase {
  execute: (foodCategoryId: string) => Promise<Either<ErrorClass, void>>;
}
export class DeleteFoodCategory implements DeleteFoodCategoryUsecase {
  private readonly foodCategoryRepository: FoodCategoryRepository;

  constructor(foodCategoryRepository: FoodCategoryRepository) {
    this.foodCategoryRepository = foodCategoryRepository;
  }

  async execute(foodCategoryId: string): Promise<Either<ErrorClass, void>> {
   return await this.foodCategoryRepository.deleteFoodCategory(foodCategoryId);
  }
}
