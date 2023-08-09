import { FoodCategoryEntity, FoodCategoryModel } from "@domain/foodCategory/entities/foodCategory";
import { FoodCategoryRepository } from "@domain/foodCategory/repositories/foodCategory-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateFoodCategoryUsecase {
  execute: (foodCategoryData: FoodCategoryModel) => Promise<Either<ErrorClass, FoodCategoryEntity>>;
}

export class CreateFoodCategory implements CreateFoodCategoryUsecase {
  private readonly foodCategoryRepository: FoodCategoryRepository;

  constructor(foodCategoryRepository: FoodCategoryRepository) {
    this.foodCategoryRepository = foodCategoryRepository;
  }

  async execute(foodCategoryData: FoodCategoryModel): Promise<Either<ErrorClass, FoodCategoryEntity>> {
    return await this.foodCategoryRepository.createFoodCategory(foodCategoryData);
  }
}
