import { CuisineModel, CuisineEntity } from "@domain/cuisine/entities/cuisine";
import { CuisineRepository } from "@domain/cuisine/repositories/cuisine-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetCuisineByIdUsecase {
  execute: (cuisineId: string) => Promise<Either<ErrorClass, CuisineEntity | null>>;
}

export class GetCuisineById implements GetCuisineByIdUsecase {
  private readonly cuisineRepository: CuisineRepository;

  constructor(cuisineRepository: CuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }

  async execute(cuisineId: string): Promise<Either<ErrorClass, CuisineEntity | null>> {
    return await this.cuisineRepository.getCuisineById(cuisineId);
  }
}
