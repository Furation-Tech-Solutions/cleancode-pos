import { AreaEntity } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";

export interface GetAllAreasUsecase {
  execute: () => Promise<AreaEntity[]>;
}

export class GetAllAreas implements GetAllAreasUsecase {
  private readonly areaRepository: AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(): Promise<AreaEntity[]> {
    return await this.areaRepository.getAreas();
  }
}
