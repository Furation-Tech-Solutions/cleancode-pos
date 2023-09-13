import { WasteEntity } from "@domain/waste/entities/waste";
import { WasteRepository } from "@domain/waste/repositories/waste-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetWasteByIdUsecase {
  execute: (wasteId: string) => Promise<Either<ErrorClass, WasteEntity>>;
}

export class GetWasteById implements GetWasteByIdUsecase {
  private readonly wasteRepository: WasteRepository;

  constructor(wasteRepository: WasteRepository) {
    this.wasteRepository = wasteRepository;
  }

  async execute(wasteId: string): Promise<Either<ErrorClass, WasteEntity>> {
    return await this.wasteRepository.getWasteById(wasteId);
  }
}
