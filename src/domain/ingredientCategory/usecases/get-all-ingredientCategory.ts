import { IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";

export interface GetAllIngredientCategorysUsecase {
  execute: () => Promise<IngredientCategoryEntity[]>;
}

export class GetAllIngredientCategorys implements GetAllIngredientCategorysUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(): Promise<IngredientCategoryEntity[]> {
    return await this.ingredientCategoryRepository.getIngredientCategorys();
  }
}
