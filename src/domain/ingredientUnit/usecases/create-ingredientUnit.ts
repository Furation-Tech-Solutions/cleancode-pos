import { IngredientUnitEntity, IngredientUnitModel } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";

export interface CreateIngredientUnitUsecase {
  execute: (ingredientUnitData: IngredientUnitModel) => Promise<IngredientUnitEntity>;
}

export class CreateIngredientUnit implements CreateIngredientUnitUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(ingredientUnitData: IngredientUnitModel): Promise<IngredientUnitEntity> {
    return await this.ingredientUnitRepository.createIngredientUnit(ingredientUnitData);
  }
}
