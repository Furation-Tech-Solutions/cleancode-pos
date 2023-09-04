import { PreMadeFoodModel, PreMadeFoodEntity } from "@domain/preMadeFood/entities/preMadeFood";
import { PreMadeFoodRepository } from "@domain/preMadeFood/repositories/preMadeFood-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdatePreMadeFoodUsecase {
  execute: (
    preMadeFoodId: string,
    preMadeFoodData: PreMadeFoodModel
  ) => Promise<Either<ErrorClass, PreMadeFoodEntity>>;
}

export class UpdatePreMadeFood implements UpdatePreMadeFoodUsecase {
  private readonly preMadeFoodRepository: PreMadeFoodRepository;

  constructor(preMadeFoodRepository: PreMadeFoodRepository) {
    this.preMadeFoodRepository = preMadeFoodRepository;
  }
  async execute(preMadeFoodId: string, preMadeFoodData: PreMadeFoodModel): Promise<Either<ErrorClass, PreMadeFoodEntity>> {
   return await this.preMadeFoodRepository.updatePreMadeFood(preMadeFoodId, preMadeFoodData);
 }
}
