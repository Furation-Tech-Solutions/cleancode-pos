import {type CuisineRepository } from "@domain/cuisine/repositories/cuisine-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteCuisineUsecase {
  execute: (cuisineId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteCuisine implements DeleteCuisineUsecase {
  private readonly cuisineRepository: CuisineRepository;

  constructor(cuisineRepository: CuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }

  async execute(cuisineId: string): Promise<Either<ErrorClass, void>> {
    return await this.cuisineRepository.deleteCuisine(cuisineId);
  }
}
