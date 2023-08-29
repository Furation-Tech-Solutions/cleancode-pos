import { CuisineModel, CuisineEntity } from "@domain/cuisine/entities/cuisine";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface CuisineRepository {
  createCuisine(cuisine: CuisineModel): Promise<Either<ErrorClass, CuisineEntity>>;
  deleteCuisine(id: string): Promise<Either<ErrorClass, void>>;
  updateCuisine(id: string, data: CuisineModel): Promise<Either<ErrorClass, CuisineEntity>>;
  getCuisines(): Promise<Either<ErrorClass, CuisineEntity[]>>;
  getCuisineById(id: string): Promise<Either<ErrorClass, CuisineEntity | null>>;
}

