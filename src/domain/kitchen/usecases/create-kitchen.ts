import { KitchenEntity, KitchenModel } from "@domain/kitchen/entities/kitchen";
import { KitchenRepository } from "@domain/kitchen/repositories/kitchen-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateKitchenUsecase {
  execute: (kitchenData: KitchenModel) => Promise<Either<ErrorClass,KitchenEntity>>;
}

export class CreateKitchen implements CreateKitchenUsecase {
  private readonly kitchenRepository: KitchenRepository;

  constructor(KitchenRepository: KitchenRepository) {
    this.kitchenRepository = KitchenRepository;
  }

  async execute(kitchenData: KitchenModel): Promise<Either<ErrorClass,KitchenEntity>> {
    return await this.kitchenRepository.createKitchen(kitchenData);
  }
}