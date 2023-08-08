import { AreaEntity, AreaModel } from "@domain/area/entities/area";
import { AreaRepository } from "@domain/area/repositories/area-repository";

export interface UpdateAreaUsecase {
  execute: (
    areaId: string,
    areaData: Partial<AreaModel>
  ) => Promise<AreaEntity>;
}

export class UpdateArea implements UpdateAreaUsecase {
  private readonly areaRepository: AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  // async execute(areaId: string, areaData: AreaModel): Promise<AreaEntity> {
  //   return await this.areaRepository.updateArea(areaId, areaData);
  // }
  // UpdateAreaUsecase
  async execute(
    areaId: string,
    areaData: Partial<AreaModel>
  ): Promise<AreaEntity> {
    const existingArea: AreaEntity | null =
      await this.areaRepository.getAreaById(areaId);

    if (!existingArea) {
      throw new Error("Area not found.");
    }

    // Perform the partial update by merging areaData with existingArea
    const updatedAreaData: AreaModel = {
      ...existingArea,
      ...areaData,
    };

    // Save the updatedAreaData to the repository
    await this.areaRepository.updateArea(areaId, updatedAreaData);

    // Fetch the updated area entity from the repository
    const updatedAreaEntity: AreaEntity | null =
      await this.areaRepository.getAreaById(areaId);

    if (!updatedAreaEntity) {
      throw new Error("Area not found after update.");
    }

    return updatedAreaEntity;
  }
}
