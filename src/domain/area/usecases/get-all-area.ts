import { AreaEntity } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllAreasUsecase {
  execute: () => Promise<Either<ErrorClass, AreaEntity[]>>;
}

export class GetAllAreas implements GetAllAreasUsecase {
  private readonly areaRepository: AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(): Promise<Either<ErrorClass, AreaEntity[]>> {
    return await this.areaRepository.getAreas();
  }
}
