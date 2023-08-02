import { IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";

export interface GetIngredientUnitByIdUsecase {
  execute: (ingredientUnitId: string) => Promise<IngredientUnitEntity | null>;
}

export class GetIngredientUnitById implements GetIngredientUnitByIdUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  async execute(ingredientUnitId: string): Promise<IngredientUnitEntity | null> {
    return await this.ingredientUnitRepository.getIngredientUnitById(ingredientUnitId);
  }
}
