import { PreMadeFoodModel, PreMadeFoodEntity } from "@domain/preMadeFood/entities/preMadeFood";
import { PreMadeFoodRepository } from "@domain/preMadeFood/repositories/preMadeFood-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetPreMadeFoodByIdUsecase {
  execute: (preMadeFoodId: string) => Promise<Either<ErrorClass, PreMadeFoodEntity | null>>;
}

export class GetPreMadeFoodById implements GetPreMadeFoodByIdUsecase {
  private readonly preMadeFoodRepository: PreMadeFoodRepository;

  constructor(preMadeFoodRepository: PreMadeFoodRepository) {
    this.preMadeFoodRepository = preMadeFoodRepository;
  }

  async execute(preMadeFoodId: string): Promise<Either<ErrorClass, PreMadeFoodEntity | null>> {
    return await this.preMadeFoodRepository.getPreMadeFoodById(preMadeFoodId);
  }
}
