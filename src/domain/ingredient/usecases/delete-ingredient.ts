import { type IngredientRepository } from "../repositories/ingredient-repository";
export interface DeleteIngredientUsecase {
  execute: (IngredientId: string) => Promise<void>
}

export class DeleteIngredient implements DeleteIngredientUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(ingredientId: string): Promise<void> {
    await this.ingredientRepository.deleteIngredient(ingredientId);
  }
}
