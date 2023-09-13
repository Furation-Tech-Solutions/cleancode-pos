import { KitchenEntity } from "@domain/kitchen/entities/kitchen";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { KotRepository } from "../repositories/kot-repository";
import { KotEntity, KotModel } from "../entities/kot";



export interface CreateKotUsecase {
    execute: (kotData: KotModel) => Promise<Either<ErrorClass,KotEntity>>;
  }
  
  export class CreateKot implements CreateKotUsecase {
    private readonly kotRepository: KotRepository;
  
    constructor(KotRepository: KotRepository) {
      this.kotRepository = KotRepository;
    }
  
    async execute(kotData: KotModel): Promise<Either<ErrorClass,KotEntity>> {
      return await this.kotRepository.createKot(kotData);
    }
  }
