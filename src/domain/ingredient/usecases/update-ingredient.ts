import { IngredientEntity, IngredientModel } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateIngredientUsecase {
  execute: (
    IngredientId: string,
    IngredientData: IngredientModel
  ) => Promise<Either<ErrorClass, IngredientEntity>>;
}

export class UpdateIngredient implements UpdateIngredientUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(ingredientId: string, ingredientData: IngredientModel): Promise<Either<ErrorClass, IngredientEntity>> {
    return await this.ingredientRepository.updateIngredient(ingredientId, ingredientData);
  }
}
