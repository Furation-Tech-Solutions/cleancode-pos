import { IngredientCategoryEntity, IngredientCategoryModel } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";

export interface UpdateIngredientCategoryUsecase {
  execute: (
    IngredientCategoryId: string,
    IngredientCategoryData: Partial<IngredientCategoryModel>
  ) => Promise<IngredientCategoryEntity>;
}

export class UpdateIngredientCategory implements UpdateIngredientCategoryUsecase {
  private readonly ingredientCategoryRepository: IngredientCategoryRepository;

  constructor(ingredientCategoryRepository: IngredientCategoryRepository) {
    this.ingredientCategoryRepository = ingredientCategoryRepository;
  }

  // async execute(ingredientCategoryId: string, ingredientCategoryData: IngredientCategoryModel): Promise<IngredientCategoryEntity> {
  //   return await this.ingredientCategoryRepository.updateIngredientCategory(ingredientCategoryId, ingredientCategoryData);
  // }
  // UpdateIngredientCategoryUsecase
  async execute(
    ingredientCategoryId: string,
    ingredientCategoryData: Partial<IngredientCategoryModel>
  ): Promise<IngredientCategoryEntity> {
    const existingIngredientCategory: IngredientCategoryEntity | null =
      await this.ingredientCategoryRepository.getIngredientCategoryById(ingredientCategoryId);

    if (!existingIngredientCategory) {
      throw new Error("IngredientCategory not found.");
    }

    // Perform the partial update by merging IngredientCategoryData with existingIngredientCategory
    const updatedIngredientCategoryData: IngredientCategoryModel = {
      ...existingIngredientCategory,
      ...ingredientCategoryData,
    };

    // Save the updatedIngredientCategoryData to the repository
    await this.ingredientCategoryRepository.updateIngredientCategory(ingredientCategoryId, updatedIngredientCategoryData);

    // Fetch the updated IngredientCategory entity from the repository
    const updatedIngredientCategoryEntity: IngredientCategoryEntity | null =
      await this.ingredientCategoryRepository.getIngredientCategoryById(ingredientCategoryId);

    if (!updatedIngredientCategoryEntity) {
      throw new Error("IngredientCategory not found after update.");
    }

    return updatedIngredientCategoryEntity;
  }
}
