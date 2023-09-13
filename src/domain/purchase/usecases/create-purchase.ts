import {
  PurchaseEntity,
  PurchaseModel,
} from "@domain/purchase/entities/purchase";
import { PurchaseRepository } from "@domain/purchase/repositories/purchase-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreatePurchaseUsecase {
  execute: (
    purchaseData: PurchaseModel
  ) => Promise<Either<ErrorClass, PurchaseEntity>>;
}

export class CreatePurchase implements CreatePurchaseUsecase {
  private readonly purchaseRepository: PurchaseRepository;

  constructor(purchaseRepository: PurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(
    purchaseData: PurchaseModel
  ): Promise<Either<ErrorClass, PurchaseEntity>> {
    return await this.purchaseRepository.createPurchase(purchaseData);
  }
}
