import { IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";

export interface GetIngredientByIdUsecase {
  execute: (IngredientId: string) => Promise<IngredientEntity | null>;
}

export class GetIngredientById implements GetIngredientByIdUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(ingredientId: string): Promise<IngredientEntity | null> {
    return await this.ingredientRepository.getIngredientById(ingredientId);
  }
}
