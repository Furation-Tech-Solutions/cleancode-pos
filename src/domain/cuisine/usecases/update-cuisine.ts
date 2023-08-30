import { CuisineModel, CuisineEntity } from "@domain/cuisine/entities/cuisine";
import { CuisineRepository } from "@domain/cuisine/repositories/cuisine-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateCuisineUsecase {
  execute: (
    cuisineId: string,
    cuisineData: CuisineModel
  ) => Promise<Either<ErrorClass, CuisineEntity>>;
}

export class UpdateCuisine implements UpdateCuisineUsecase {
  private readonly cuisineRepository: CuisineRepository;

  constructor(cuisineRepository: CuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }
  async execute(cuisineId: string, cuisineData: CuisineModel): Promise<Either<ErrorClass, CuisineEntity>> {
   return await this.cuisineRepository.updateCuisine(cuisineId, cuisineData);
 }
}
