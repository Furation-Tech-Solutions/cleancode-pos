import { IngredientModel, IngredientEntity } from "@domain/ingredient/entities/ingredient";
import { IngredientRepository } from "@domain/ingredient/repositories/ingredient-repository";
import { IngredientDataSource } from "@data/ingredient/datasources/ingredient-data-source";

export class IngredientRepositoryImpl implements IngredientRepository {
  private readonly dataSource: IngredientDataSource;

  constructor(dataSource: IngredientDataSource) {
    this.dataSource = dataSource;
  }

  async createIngredient(ingredient: IngredientModel): Promise<IngredientEntity> {
    return await this.dataSource.create(ingredient);
  }

  async deleteIngredient(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateIngredient(id: string, data: IngredientModel): Promise<IngredientEntity> {
    return await this.dataSource.update(id, data);
  }

  async getIngredients(): Promise<IngredientEntity[]> {
    return await this.dataSource.getAllIngredients();
  }

  async getIngredientById(id: string): Promise<IngredientEntity | null> {
    return await this.dataSource.read(id);
  }
}
