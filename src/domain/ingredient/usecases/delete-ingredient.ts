import { type IngredientRepository } from "../repositories/ingredient-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteIngredientUsecase {
  execute: (IngredientId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteIngredient implements DeleteIngredientUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(ingredientId: string): Promise<Either<ErrorClass, void>> {
    return await this.ingredientRepository.deleteIngredient(ingredientId);
  }
}
