import { WasteRepository } from "@domain/waste/repositories/waste-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteWasteUsecase {
  execute: (wasteId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteWaste implements DeleteWasteUsecase {
  private readonly wasteRepository: WasteRepository;

  constructor(wasteRepository: WasteRepository) {
    this.wasteRepository = wasteRepository;
  }

  async execute(wasteId: string): Promise<Either<ErrorClass, void>> {
    return await this.wasteRepository.deleteWaste(wasteId);
  }
}
