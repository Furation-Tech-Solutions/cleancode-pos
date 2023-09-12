import { FoodCategoryEntity } from "@domain/foodCategory/entities/foodCategory";
import { FoodCategoryRepository } from "@domain/foodCategory/repositories/foodCategory-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllFoodCategorysUsecase {
  execute: () => Promise<Either<ErrorClass, FoodCategoryEntity[]>>;
}

export class GetAllFoodCategorys implements GetAllFoodCategorysUsecase {
  private readonly foodCategoryRepository: FoodCategoryRepository;

  constructor(foodCategoryRepository: FoodCategoryRepository) {
    this.foodCategoryRepository = foodCategoryRepository;
  }

  async execute(): Promise<Either<ErrorClass, FoodCategoryEntity[]>> {
    return await this.foodCategoryRepository.getFoodCategorys();
  }
}
