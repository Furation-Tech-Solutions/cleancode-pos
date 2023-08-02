import { type IngredientCategoryRepository } from "../repositories/ingredientCategory-repository";
export interface DeleteIngredientCategoryUsecase {
  execute: (IngredientCategoryId: string) => Promise<void>
}

export class DeleteIngredientCategory implements DeleteIngredientCategoryUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryId: string): Promise<void> {
    await this.ingredientCategoryRepository.deleteIngredientCategory(ingredientCategoryId);
  }
}
