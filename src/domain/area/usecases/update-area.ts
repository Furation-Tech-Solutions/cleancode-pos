import { AreaEntity, AreaModel } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateAreaUsecase {
  execute: (
    areaId: string,
    areaData: AreaModel
  ) => Promise<Either<ErrorClass, AreaEntity>>;
}

export class UpdateArea implements UpdateAreaUsecase {
  private readonly areaRepository: AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(areaId: string, areaData: AreaModel): Promise<Either<ErrorClass, AreaEntity>> {
    return await this.areaRepository.updateArea(areaId, areaData);
  }
}
