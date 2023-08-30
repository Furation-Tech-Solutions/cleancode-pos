import { IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllIngredientCategorysUsecase {
  execute: () => Promise<Either<ErrorClass, IngredientCategoryEntity[]>>;
}

export class GetAllIngredientCategorys implements GetAllIngredientCategorysUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  async execute(): Promise<Either<ErrorClass, IngredientCategoryEntity[]>> {
    return await this.ingredientCategoryRepository.getIngredientCategorys();
  }
}
