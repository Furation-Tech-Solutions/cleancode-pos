import { type IngredientCategoryRepository } from "../repositories/ingredientCategory-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteIngredientCategoryUsecase {
  execute: (IngredientCategoryId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteIngredientCategory implements DeleteIngredientCategoryUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryId: string): Promise<Either<ErrorClass, void>> {
    return await this.ingredientCategoryRepository.deleteIngredientCategory(ingredientCategoryId);
  }
}
