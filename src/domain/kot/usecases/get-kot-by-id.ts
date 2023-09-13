import { KotEntity } from "@domain/kot/entities/kot";
import { KotRepository } from "@domain/kot/repositories/kot-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetKotByIdUsecase {
  execute: (
    kotId: string
  ) => Promise<Either<ErrorClass, KotEntity>>;
}

export class GetKotById implements GetKotByIdUsecase {
  private readonly kotRepository: KotRepository;

  constructor(kotRepository: KotRepository) {
    this.kotRepository = kotRepository;
  }

  async execute(
    kotId: string
  ): Promise<Either<ErrorClass, KotEntity>> {
    return await this.kotRepository.getKotById(kotId);
  }
}
