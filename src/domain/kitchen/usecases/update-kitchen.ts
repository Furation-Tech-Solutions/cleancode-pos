import { KitchenEntity, KitchenModel } from "@domain/kitchen/entities/kitchen";
import { KitchenRepository } from "@domain/kitchen/repositories/kitchen-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface UpdateKitchenUsecase {
  execute: (kitchenId: string,
    kitchenData: KitchenModel
  ) => Promise<Either<ErrorClass, KitchenEntity>>;
}

export class UpdateKitchen implements UpdateKitchenUsecase {
  private readonly kitchenRepository: KitchenRepository;

  constructor(kitchenRepository: KitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

   async execute(kitchenId: string, kitchenData: KitchenModel): Promise<Either<ErrorClass, KitchenEntity>> {
    return await this.kitchenRepository.updateKitchen(kitchenId, kitchenData);
  }
}
