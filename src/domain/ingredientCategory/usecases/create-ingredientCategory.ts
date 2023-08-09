import { IngredientCategoryEntity, IngredientCategoryModel } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateIngredientCategoryUsecase {
  execute: (IngredientCategoryData: IngredientCategoryModel) => Promise<Either<ErrorClass, IngredientCategoryEntity>>;
}

export class CreateIngredientCategory implements CreateIngredientCategoryUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryData: IngredientCategoryModel): Promise<Either<ErrorClass, IngredientCategoryEntity>> {
    return await this.ingredientCategoryRepository.createIngredientCategory(ingredientCategoryData);
  }
}
