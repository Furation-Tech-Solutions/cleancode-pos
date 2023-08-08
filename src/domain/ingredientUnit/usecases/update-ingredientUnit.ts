import { IngredientUnitEntity, IngredientUnitModel } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateIngredientUnitUsecase {
  execute: (
    ingredientUnitId: string,
    ingredientUnitData: IngredientUnitModel
  ) => Promise<Either<ErrorClass, IngredientUnitEntity>>;
}

export class UpdateIngredientUnit implements UpdateIngredientUnitUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(ingredientUnitId: string, ingredientUnitData: IngredientUnitModel): Promise<Either<ErrorClass, IngredientUnitEntity>> {
    return await this.ingredientUnitRepository.updateIngredientUnit(ingredientUnitId, ingredientUnitData);
  }

}
