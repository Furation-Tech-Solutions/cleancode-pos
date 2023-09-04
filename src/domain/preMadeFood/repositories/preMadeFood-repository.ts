import { PreMadeFoodModel, PreMadeFoodEntity } from "@domain/preMadeFood/entities/preMadeFood";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface PreMadeFoodRepository {
  createPreMadeFood(PreMadeFood: PreMadeFoodModel): Promise<Either<ErrorClass, PreMadeFoodEntity>>;
  deletePreMadeFood(id: string): Promise<Either<ErrorClass, void>>;
  updatePreMadeFood(id: string, data: PreMadeFoodModel): Promise<Either<ErrorClass, PreMadeFoodEntity>>;
  getPreMadeFoods(): Promise<Either<ErrorClass, PreMadeFoodEntity[]>>;
  getPreMadeFoodById(id: string): Promise<Either<ErrorClass, PreMadeFoodEntity | null>>;
}

