import {
  PurchaseEntity,
  PurchaseModel,
} from "@domain/purchase/entities/purchase";
import { PurchaseRepository } from "@domain/purchase/repositories/purchase-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdatePurchaseUsecase {
  execute: (
    purchaseId: string,
    purchaseData: PurchaseModel
  ) => Promise<Either<ErrorClass, PurchaseEntity>>;
}

export class UpdatePurchase implements UpdatePurchaseUsecase {
  private readonly purchaseRepository: PurchaseRepository;

  constructor(purchaseRepository: PurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(
    purchaseId: string,
    purchaseData: PurchaseModel
  ): Promise<Either<ErrorClass, PurchaseEntity>> {
    return await this.purchaseRepository.updatePurchase(
      purchaseId,
      purchaseData
    );
  }
}
