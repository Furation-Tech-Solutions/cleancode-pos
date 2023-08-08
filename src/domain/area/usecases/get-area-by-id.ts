import { AreaEntity } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";

export interface GetAreaByIdUsecase {
  execute: (areaId: string) => Promise<AreaEntity | null>;
}

export class GetAreaById implements GetAreaByIdUsecase {
  private readonly areaRepository:AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(areaId: string): Promise<AreaEntity | null> {
    return await this.areaRepository.getAreaById(areaId);
  }
}