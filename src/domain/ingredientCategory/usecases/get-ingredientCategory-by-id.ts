import { IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";

export interface GetIngredientCategoryByIdUsecase {
  execute: (ingredientCategoryId: string) => Promise<IngredientCategoryEntity | null>;
}

export class GetIngredientCategoryById implements GetIngredientCategoryByIdUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryId: string): Promise<IngredientCategoryEntity | null> {
    return await this.ingredientCategoryRepository.getIngredientCategoryById(ingredientCategoryId);
  }
}
