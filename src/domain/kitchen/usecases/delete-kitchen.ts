import { type KitchenRepository } from "@domain/kitchen/repositories/kitchen-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteKitchenUsecase {
  execute: (kitchenId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteKitchen implements DeleteKitchenUsecase {
  private readonly kitchenRepository: KitchenRepository;

  constructor(kitchenRepository: KitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId: string): Promise<Either<ErrorClass, void>> {
   return await this.kitchenRepository.deleteKitchen(kitchenId);
  }
}
