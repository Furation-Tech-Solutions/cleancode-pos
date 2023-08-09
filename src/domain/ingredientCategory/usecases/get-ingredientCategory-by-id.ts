import { IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetIngredientCategoryByIdUsecase {
  execute: (ingredientCategoryId: string) => Promise<Either<ErrorClass, IngredientCategoryEntity | null>>;
}

export class GetIngredientCategoryById implements GetIngredientCategoryByIdUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(ingredientCategoryId: string): Promise<Either<ErrorClass, IngredientCategoryEntity | null>> {
    return await this.ingredientCategoryRepository.getIngredientCategoryById(ingredientCategoryId);
  }
}
