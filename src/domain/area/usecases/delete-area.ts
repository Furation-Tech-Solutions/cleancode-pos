import { type AreaRepository } from "@domain/area/repositories/area-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteAreaUsecase {
  execute: (areaId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteArea implements DeleteAreaUsecase {
  private readonly areaRepository: AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(areaId: string): Promise<Either<ErrorClass, void>> {
    return await this.areaRepository.deleteArea(areaId);
  }
}
