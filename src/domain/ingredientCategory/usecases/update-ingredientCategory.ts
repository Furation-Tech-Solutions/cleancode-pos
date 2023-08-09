import { IngredientCategoryEntity, IngredientCategoryModel } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateIngredientCategoryUsecase {
  execute: (
    IngredientCategoryId: string,
    IngredientCategoryData: IngredientCategoryModel
  ) => Promise<Either<ErrorClass, IngredientCategoryEntity>>;
}

export class UpdateIngredientCategory implements UpdateIngredientCategoryUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryId: string, ingredientCategoryData: IngredientCategoryModel): Promise<Either<ErrorClass, IngredientCategoryEntity>> {
    return await this.ingredientCategoryRepository.updateIngredientCategory(ingredientCategoryId, ingredientCategoryData);
  }
  
}
