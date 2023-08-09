import { type IngredientUnitRepository } from "../repositories/ingredientUnit-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteIngredientUnitUsecase {
  execute: (ingredientUnitId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteIngredientUnit implements DeleteIngredientUnitUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(ingredientUnitId: string): Promise<Either<ErrorClass, void>> {
    return await this.ingredientUnitRepository.deleteIngredientUnit(ingredientUnitId);
  }
}
