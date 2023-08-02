import { IngredientCategoryModel, IngredientCategoryEntity } from "@domain/ingredientCategory/entities/ingredientCategory";
import { IngredientCategoryRepository } from "@domain/ingredientCategory/repositories/ingredientCategory-repository";
import { IngredientCategoryDataSource } from "@data/ingredientCategory/datasources/ingredientCategory-data-source";

export class IngredientCategoryRepositoryImpl implements IngredientCategoryRepository {
  private readonly dataSource: IngredientCategoryDataSource;

  constructor(dataSource: IngredientCategoryDataSource) {
    this.dataSource = dataSource;
  }

  async createIngredientCategory(ingredientCategory: IngredientCategoryModel): Promise<IngredientCategoryEntity> {
    return await this.dataSource.create(ingredientCategory);
  }

  async deleteIngredientCategory(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateIngredientCategory(id: string, data: IngredientCategoryModel): Promise<IngredientCategoryEntity> {
    return await this.dataSource.update(id, data);
  }

  async getIngredientCategorys(): Promise<IngredientCategoryEntity[]> {
    return await this.dataSource.getAllIngredientCategorys();
  }

  async getIngredientCategoryById(id: string): Promise<IngredientCategoryEntity | null> {
    return await this.dataSource.read(id);
  }
}
