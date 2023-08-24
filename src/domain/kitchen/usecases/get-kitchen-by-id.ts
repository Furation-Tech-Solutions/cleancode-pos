import { KitchenEntity } from "@domain/kitchen/entities/kitchen";
import { KitchenRepository } from "@domain/kitchen/repositories/kitchen-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetKitchenByIdUsecase {
  execute: (kitchenId: string) => Promise<Either<ErrorClass, KitchenEntity | null>>;
}

export class GetKitchenById implements GetKitchenByIdUsecase {
  private readonly kitchenRepository:KitchenRepository;

  constructor(kitchenRepository: KitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId: string): Promise<Either<ErrorClass, KitchenEntity | null>> {
    return await this.kitchenRepository.getKitchenById(kitchenId);
  }
}