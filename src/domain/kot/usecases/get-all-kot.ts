import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { KotRepository } from "../repositories/kot-repository";
import { KotEntity } from "../entities/kot";

export interface GetAllKotUsecase {
    execute: () => Promise<Either<ErrorClass,KotEntity[]>>;
  }
  
  export class GetAllKot implements GetAllKotUsecase {
    private readonly kotRepository: KotRepository;
  
    constructor(kotRepository: KotRepository) {
      this.kotRepository = kotRepository;
    }
  
    async execute(): Promise<Either<ErrorClass, KotEntity[]>> {
      return await this.kotRepository.getKot();
    }
  }