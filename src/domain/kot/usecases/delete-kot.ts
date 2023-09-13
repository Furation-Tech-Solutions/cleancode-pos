import { KotRepository } from "@domain/kot/repositories/kot-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteKotUsecase {
  execute: (kotId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteKot implements DeleteKotUsecase {
  private readonly kotRepository: KotRepository;

  constructor(kotRepository: KotRepository) {
    this.kotRepository = kotRepository;
  }

  async execute(kotId: string): Promise<Either<ErrorClass, void>> {
    return await this.kotRepository.deleteKot(kotId);
  }
}
