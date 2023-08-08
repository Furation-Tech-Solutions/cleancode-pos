import { IngredientCategoryEntity, IngredientCategoryModel } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";

export interface CreateIngredientCategoryUsecase {
  execute: (IngredientCategoryData: IngredientCategoryModel) => Promise<IngredientCategoryEntity>;
}

export class CreateIngredientCategory implements CreateIngredientCategoryUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryData: IngredientCategoryModel): Promise<IngredientCategoryEntity> {
    return await this.ingredientCategoryRepository.createIngredientCategory(ingredientCategoryData);
  }
}
