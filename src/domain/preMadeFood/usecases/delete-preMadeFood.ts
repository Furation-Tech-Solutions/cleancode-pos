import {type PreMadeFoodRepository } from "@domain/preMadeFood/repositories/preMadeFood-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeletePreMadeFoodUsecase {
  execute: (preMadeFoodId: string) => Promise<Either<ErrorClass, void>>
}

export class DeletePreMadeFood implements DeletePreMadeFoodUsecase {
  private readonly preMadeFoodRepository: PreMadeFoodRepository;

  constructor(preMadeFoodRepository: PreMadeFoodRepository) {
    this.preMadeFoodRepository = preMadeFoodRepository;
  }

  async execute(preMadeFoodId: string): Promise<Either<ErrorClass, void>> {
    return await this.preMadeFoodRepository.deletePreMadeFood(preMadeFoodId);
  }
}
