import { type AreaRepository } from "@domain/area/repositories/area-repository";
export interface DeleteAreaUsecase {
  execute: (areaId: string) => Promise<void>
}

export class DeleteArea implements DeleteAreaUsecase {
  private readonly areaRepository: AreaRepository;

  constructor(areaRepository: AreaRepository) {
    this.areaRepository = areaRepository;
  }

  async execute(areaId: string): Promise<void> {
    await this.areaRepository.deleteArea(areaId);
  }
}
