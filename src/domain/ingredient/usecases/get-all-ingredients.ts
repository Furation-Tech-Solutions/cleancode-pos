import { IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";

export interface GetAllIngredientsUsecase {
  execute: () => Promise<IngredientEntity[]>;
}

export class GetAllIngredients implements GetAllIngredientsUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(): Promise<IngredientEntity[]> {
    return await this.ingredientRepository.getIngredients();
  }
}
