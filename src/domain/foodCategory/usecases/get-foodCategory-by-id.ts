import { FoodCategoryEntity } from "@domain/foodCategory/entities/foodCategory";
import { FoodCategoryRepository } from "@domain/foodCategory/repositories/foodCategory-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetFoodCategoryByIdUsecase {
  execute: (foodCategoryId: string) => Promise<Either<ErrorClass, FoodCategoryEntity | null>>;
}

export class GetFoodCategoryById implements GetFoodCategoryByIdUsecase {
  private readonly foodCategoryRepository: FoodCategoryRepository;

  constructor(foodCategoryRepository: FoodCategoryRepository) {
    this.foodCategoryRepository = foodCategoryRepository;
  }

  async execute(foodCategoryId: string): Promise<Either<ErrorClass, FoodCategoryEntity | null>> {
    return await this.foodCategoryRepository.getFoodCategoryById(foodCategoryId);
  }
}
