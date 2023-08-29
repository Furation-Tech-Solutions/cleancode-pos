import { CuisineModel, CuisineEntity } from "@domain/cuisine/entities/cuisine";
import { CuisineRepository } from "@domain/cuisine/repositories/cuisine-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllCuisinesUsecase {
  execute: () => Promise<Either<ErrorClass, CuisineEntity[]>>;
}

export class GetAllCuisines implements GetAllCuisinesUsecase {
  private readonly cuisineRepository: CuisineRepository;

  constructor(cuisineRepository: CuisineRepository) {
    this.cuisineRepository = cuisineRepository;
  }

  async execute(): Promise<Either<ErrorClass, CuisineEntity[]>> {
    return await this.cuisineRepository.getCuisines();
  }
}
