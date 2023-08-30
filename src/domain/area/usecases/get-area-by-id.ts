import { AreaEntity } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAreaByIdUsecase {
  execute: (areaId: string) => Promise<Either<ErrorClass, AreaEntity | null>>;
}

export class GetAreaById implements GetAreaByIdUsecase {
  private readonly areaRepository:AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(areaId: string): Promise<Either<ErrorClass, AreaEntity | null>> {
    return await this.areaRepository.getAreaById(areaId);
  }
}