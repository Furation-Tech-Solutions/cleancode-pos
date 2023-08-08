import { IngredientUnitModel, IngredientUnitEntity } from "@domain/ingredientUnit/entities/ingredientUnit";
import { IngredientUnitRepository } from "@domain/ingredientUnit/repositories/ingredientUnit-repository";
import { IngredientUnitDataSource } from "@data/ingredientUnit/datasources/ingredientUnit-data-source";

export class IngredientUnitRepositoryImpl implements IngredientUnitRepository {
  private readonly dataSource: IngredientUnitDataSource;

  constructor(dataSource: IngredientUnitDataSource) {
    this.dataSource = dataSource;
  }

  async createIngredientUnit(ingredientUnit: IngredientUnitModel): Promise<IngredientUnitEntity> {
    return await this.dataSource.create(ingredientUnit);
  }

  async deleteIngredientUnit(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateIngredientUnit(id: string, data: IngredientUnitModel): Promise<IngredientUnitEntity> {
    return await this.dataSource.update(id, data);
  }

  async getIngredientUnits(): Promise<IngredientUnitEntity[]> {
    return await this.dataSource.getAllIngredientUnits();
  }

  async getIngredientUnitById(id: string): Promise<IngredientUnitEntity | null> {
    return await this.dataSource.read(id);
  }
}
