import { IngredientEntity, IngredientModel } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";

export interface UpdateIngredientUsecase {
  execute: (
    IngredientId: string,
    IngredientData: Partial<IngredientModel>
  ) => Promise<IngredientEntity>;
}

export class UpdateIngredient implements UpdateIngredientUsecase {
  private readonly ingredientRepository: IngredientRepository;

  constructor(ingredientRepository: IngredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  // UpdateIngredientUsecase
  async execute(
    ingredientId: string,
    ingredientData: Partial<IngredientModel>
  ): Promise<IngredientEntity> {
    const existingIngredient: IngredientEntity | null =
      await this.ingredientRepository.getIngredientById(ingredientId);

    if (!existingIngredient) {
      throw new Error("Ingredient not found.");
    }

    // Perform the partial update by merging IngredientData with existingIngredient
    const updatedIngredientData: IngredientModel = {
      ...existingIngredient,
      ...ingredientData,
    };

    // Save the updatedIngredientData to the repository
    await this.ingredientRepository.updateIngredient(ingredientId, updatedIngredientData);

    // Fetch the updated Ingredient entity from the repository
    const updatedIngredientEntity: IngredientEntity | null =
      await this.ingredientRepository.getIngredientById(ingredientId);

    if (!updatedIngredientEntity) {
      throw new Error("Ingredient not found after update.");
    }

    return updatedIngredientEntity;
  }
}
