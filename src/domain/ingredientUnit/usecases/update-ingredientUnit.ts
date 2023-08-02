import { IngredientUnitEntity, IngredientUnitModel } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";

export interface UpdateIngredientUnitUsecase {
  execute: (
    ingredientUnitId: string,
    ingredientUnitData: Partial<IngredientUnitModel>
  ) => Promise<IngredientUnitEntity>;
}

export class UpdateIngredientUnit implements UpdateIngredientUnitUsecase {
  private readonly ingredientUnitRepository: IngredientUnitRepository;

  constructor(ingredientUnitRepository: IngredientUnitRepository) {
    this.ingredientUnitRepository = ingredientUnitRepository;
  }

  // async execute(ingredientUnitId: string, ingredientUnitData: IngredientUnitModel): Promise<IngredientUnitEntity> {
  //   return await this.ingredientUnitRepository.updateIngredientUnit(ingredientUnitId, ingredientUnitData);
  // }
  // UpdateIngredientUnitUsecase
  async execute(
    ingredientUnitId: string,
    ingredientUnitData: Partial<IngredientUnitModel>
  ): Promise<IngredientUnitEntity> {
    const existingIngredientUnit: IngredientUnitEntity | null =
      await this.ingredientUnitRepository.getIngredientUnitById(ingredientUnitId);

    if (!existingIngredientUnit) {
      throw new Error("IngredientUnit not found.");
    }

    // Perform the partial update by merging ingredientUnitData with existingIngredientUnit
    const updatedIngredientUnitData: IngredientUnitModel = {
      ...existingIngredientUnit,
      ...ingredientUnitData,
    };

    // Save the updatedIngredientUnitData to the repository
    await this.ingredientUnitRepository.updateIngredientUnit(ingredientUnitId, updatedIngredientUnitData);

    // Fetch the updated ingredientUnit entity from the repository
    const updatedIngredientUnitEntity: IngredientUnitEntity | null =
      await this.ingredientUnitRepository.getIngredientUnitById(ingredientUnitId);

    if (!updatedIngredientUnitEntity) {
      throw new Error("IngredientUnit not found after update.");
    }

    return updatedIngredientUnitEntity;
  }
}
