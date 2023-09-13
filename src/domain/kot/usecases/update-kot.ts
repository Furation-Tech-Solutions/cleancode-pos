import {
  KotEntity,
  KotModel,
} from "@domain/kot/entities/kot";
import { KotRepository } from "@domain/kot/repositories/kot-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateKotUsecase {
  execute: (
    kotId: string,
    kotData: KotModel
  ) => Promise<Either<ErrorClass, KotEntity>>;
}

export class UpdateKot implements UpdateKotUsecase {
  private readonly kotRepository: KotRepository;

  constructor(kotRepository: KotRepository) {
    this.kotRepository = kotRepository;
  }

  async execute(
    kotId: string,
    kotData: KotModel
  ): Promise<Either<ErrorClass, KotEntity>> {
    return await this.kotRepository.updateKot(
      kotId,
      kotData
    );
  }
}
