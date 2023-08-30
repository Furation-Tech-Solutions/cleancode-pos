import { PurchaseRepository } from "@domain/purchase/repositories/purchase-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeletePurchaseUsecase {
  execute: (purchaseId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeletePurchase implements DeletePurchaseUsecase {
  private readonly purchaseRepository: PurchaseRepository;

  constructor(purchaseRepository: PurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(purchaseId: string): Promise<Either<ErrorClass, void>> {
    return await this.purchaseRepository.deletePurchase(purchaseId);
  }
}
