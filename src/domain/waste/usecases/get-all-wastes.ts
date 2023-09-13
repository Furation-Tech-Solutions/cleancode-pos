import { WasteEntity } from "@domain/waste/entities/waste";
import { WasteRepository } from "@domain/waste/repositories/waste-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllWastesUsecase {
  execute: () => Promise<Either<ErrorClass, WasteEntity[]>>;
}

export class GetAllWastes implements GetAllWastesUsecase {
  private readonly wasteRepository: WasteRepository;

  constructor(wasteRepository: WasteRepository) {
    this.wasteRepository = wasteRepository;
  }

  async execute(): Promise<Either<ErrorClass, WasteEntity[]>> {
    return await this.wasteRepository.getWastes();
  }
}
