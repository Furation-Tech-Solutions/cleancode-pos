import { type IngredientUnitRepository } from "../repositories/ingredientUnit-repository";
export interface DeleteIngredientUnitUsecase {
  execute: (ingredientUnitId: string) => Promise<void>
}

export class DeleteIngredientUnit implements DeleteIngredientUnitUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(ingredientUnitId: string): Promise<void> {
    await this.ingredientUnitRepository.deleteIngredientUnit(ingredientUnitId);
  }
}
