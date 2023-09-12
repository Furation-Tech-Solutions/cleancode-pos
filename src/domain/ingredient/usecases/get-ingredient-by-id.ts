import { IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetIngredientByIdUsecase {
  execute: (IngredientId: string) => Promise<Either<ErrorClass, IngredientEntity | null>>;
}

export class GetIngredientById implements GetIngredientByIdUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute(ingredientId: string): Promise<Either<ErrorClass, IngredientEntity | null>> {
    return await this.ingredientRepository.getIngredientById(ingredientId);
  }
}
