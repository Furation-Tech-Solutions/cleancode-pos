import { ModifierModel, ModifierEntity } from "@domain/modifier/entities/modifier";
import { ModifierRepository } from "@domain/modifier/repositories/modifier-repository"; 
import { ModifierDataSource } from "@data/modifier/datasource/modifier-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class ModifierRepositoryImpl implements ModifierRepository {
  private readonly dataSource: ModifierDataSource;

  constructor(dataSource: ModifierDataSource) {
    this.dataSource = dataSource;
  }

  async createModifier(modifier: ModifierModel): Promise<Either<ErrorClass, ModifierEntity>> {
    // return await this.dataSource.create(modifier);
    try {
      let i = await this.dataSource.create(modifier);
      return Right<ErrorClass, ModifierEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "modifierName_conflict"){
        return Left<ErrorClass, ModifierEntity>(ApiError.modifierExists());
      }
      return Left<ErrorClass, ModifierEntity>(ApiError.badRequest());
    }
  }

  async deleteModifier(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateModifier(id: string, data: ModifierModel): Promise<Either<ErrorClass, ModifierEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, ModifierEntity>(i);
    } catch {
      return Left<ErrorClass, ModifierEntity>(ApiError.badRequest());
    }
  }

  async getModifiers(): Promise<Either<ErrorClass, ModifierEntity[]>> {
    // return await this.dataSource.getAllModifiers();
    try {
      let i = await this.dataSource.getAllModifiers();
      return Right<ErrorClass, ModifierEntity[]>(i);
    } catch {
      return Left<ErrorClass, ModifierEntity[]>(ApiError.badRequest());
    }
  }

  async getModifierById(id: string): Promise<Either<ErrorClass, ModifierEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, ModifierEntity | null>(i);
    } catch {
      return Left<ErrorClass, ModifierEntity | null>(ApiError.badRequest());
    }
  }
}
