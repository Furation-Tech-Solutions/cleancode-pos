import { IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllIngredientsUsecase {
  execute: () => Promise<Either<ErrorClass, IngredientEntity[]>>;
}

export class GetAllIngredients implements GetAllIngredientsUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(): Promise<Either<ErrorClass, IngredientEntity[]>> {
    return await this.ingredientRepository.getIngredients();
  }
}
