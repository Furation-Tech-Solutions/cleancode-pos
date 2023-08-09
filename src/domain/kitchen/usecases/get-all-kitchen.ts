import { KitchenEntity } from "@domain/kitchen/entities/kitchen";
import { KitchenRepository } from "@domain/kitchen/repositories/kitchen-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllKitchensUsecase {
  execute: () => Promise<Either<ErrorClass,KitchenEntity[]>>;
}

export class GetAllKitchens implements GetAllKitchensUsecase {
  private readonly kitchenRepository: KitchenRepository;

  constructor(kitchenRepository: KitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(): Promise<Either<ErrorClass, KitchenEntity[]>> {
    return await this.kitchenRepository.getKitchens();
  }
}
