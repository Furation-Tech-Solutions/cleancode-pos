import {
  WasteEntity,
  WasteModel,
} from "@domain/waste/entities/waste";
import { WasteRepository } from "@domain/waste/repositories/waste-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateWasteUsecase {
  execute: (wasteData: WasteModel) => Promise<Either<ErrorClass, WasteEntity>>;
}

export class CreateWaste implements CreateWasteUsecase {
  private readonly wasteRepository: WasteRepository;

  constructor(wasteRepository: WasteRepository) {
    this.wasteRepository = wasteRepository;
  }

  async execute(
    wasteData: WasteModel
  ): Promise<Either<ErrorClass, WasteEntity>> {
    return await this.wasteRepository.createWaste(wasteData);
  }
}
