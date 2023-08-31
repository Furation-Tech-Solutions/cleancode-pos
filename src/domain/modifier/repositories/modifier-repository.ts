import { ModifierModel, ModifierEntity } from "@domain/modifier/entities/modifier";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface ModifierRepository {
  createModifier(modifier: ModifierModel): Promise<Either<ErrorClass, ModifierEntity>>;
  deleteModifier(id: string): Promise<Either<ErrorClass, void>>;
  updateModifier(id: string, data: ModifierModel): Promise<Either<ErrorClass, ModifierEntity>>;
  getModifiers(): Promise<Either<ErrorClass, ModifierEntity[]>>;
  getModifierById(id: string): Promise<Either<ErrorClass, ModifierEntity | null>>;
}

