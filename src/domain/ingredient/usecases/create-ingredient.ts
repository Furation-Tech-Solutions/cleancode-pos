import { IngredientEntity, IngredientModel } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";

export interface CreateIngredientUsecase {
  execute: (IngredientData: IngredientModel) => Promise<IngredientEntity>;
}

export class CreateIngredient implements CreateIngredientUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(ingredientData: IngredientModel): Promise<IngredientEntity> {
    return await this.ingredientRepository.createIngredient(ingredientData);
  }
}
