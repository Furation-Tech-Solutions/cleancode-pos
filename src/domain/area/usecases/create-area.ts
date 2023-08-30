import { AreaEntity, AreaModel } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateAreaUsecase {
  execute: (areaData: AreaModel) => Promise<Either<ErrorClass, AreaEntity>>;
}

export class CreateArea implements CreateAreaUsecase {
  private readonly AreaRepository: AreaRepository;

  constructor(AreaRepository: AreaRepository) {
    this.AreaRepository = AreaRepository;
  }

  async execute(areaData: AreaModel): Promise<Either<ErrorClass, AreaEntity>> {
    return await this.AreaRepository.createArea(areaData);
  }
}