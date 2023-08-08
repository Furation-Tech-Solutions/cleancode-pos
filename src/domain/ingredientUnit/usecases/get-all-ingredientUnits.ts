import { IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";

export interface GetAllIngredientUnitsUsecase {
  execute: () => Promise<IngredientUnitEntity[]>;
}

export class GetAllIngredientUnits implements GetAllIngredientUnitsUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(): Promise<IngredientUnitEntity[]> {
    return await this.ingredientUnitRepository.getIngredientUnits();
  }
}
