import { CuisineModel, CuisineEntity } from "@domain/cuisine/entities/cuisine";
import { CuisineRepository } from "@domain/cuisine/repositories/cuisine-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateCuisineUsecase {
  execute: (cuisineData: CuisineModel) => Promise<Either<ErrorClass, CuisineEntity>>;
}

export class CreateCuisine implements CreateCuisineUsecase {
  private readonly cuisineRepository: CuisineRepository;

  constructor(cuisineRepository: CuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }

  async execute(cuisineData: CuisineModel): Promise<Either<ErrorClass, CuisineEntity>> {
    return await this.cuisineRepository.createCuisine(cuisineData);
  }
}
