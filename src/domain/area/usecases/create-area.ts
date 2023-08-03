import { AreaEntity, AreaModel } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";

export interface CreateAreaUsecase {
  execute: (areaData: AreaModel) => Promise<AreaEntity>;
}

export class CreateArea implements CreateAreaUsecase {
  private readonly AreaRepository: AreaRepository;

  constructor(AreaRepository: AreaRepository) {
    this.AreaRepository = AreaRepository;
  }

  async execute(areaData: AreaModel): Promise<AreaEntity> {
    return await this.AreaRepository.createArea(areaData);
  }
}