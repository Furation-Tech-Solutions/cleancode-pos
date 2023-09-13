import { WasteEntity, WasteModel } from "@domain/waste/entities/waste";
import { WasteRepository } from "@domain/waste/repositories/waste-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateWasteUsecase {
  execute: (
    wasteId: string,
    wasteData: WasteModel
  ) => Promise<Either<ErrorClass, WasteEntity>>;
}

export class UpdateWaste implements UpdateWasteUsecase {
  private readonly wasteRepository: WasteRepository;

  constructor(wasteRepository: WasteRepository) {
    this.wasteRepository = wasteRepository;
  }

  async execute(
    wasteId: string,
    wasteData: WasteModel
  ): Promise<Either<ErrorClass, WasteEntity>> {
    return await this.wasteRepository.updateWaste(wasteId, wasteData);
  }
}
