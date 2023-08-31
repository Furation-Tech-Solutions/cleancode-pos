import { PreMadeFoodModel, PreMadeFoodEntity } from "@domain/preMadeFood/entities/preMadeFood";
import { PreMadeFoodRepository } from "@domain/preMadeFood/repositories/preMadeFood-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreatePreMadeFoodUsecase {
  execute: (preMadeFoodData: PreMadeFoodModel) => Promise<Either<ErrorClass, PreMadeFoodEntity>>;
}

export class CreatePreMadeFood implements CreatePreMadeFoodUsecase {
  private readonly preMadeFoodRepository: PreMadeFoodRepository;

  constructor(preMadeFoodRepository: PreMadeFoodRepository) {
    this.preMadeFoodRepository = preMadeFoodRepository;
  }

  async execute(preMadeFoodData: PreMadeFoodModel): Promise<Either<ErrorClass, PreMadeFoodEntity>> {
    return await this.preMadeFoodRepository.createPreMadeFood(preMadeFoodData);
  }
}
