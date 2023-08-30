import { PurchaseEntity } from "@domain/purchase/entities/purchase";
import { PurchaseRepository } from "@domain/purchase/repositories/purchase-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllPurchasesUsecase {
  execute: () => Promise<Either<ErrorClass, PurchaseEntity[]>>;
}

export class GetAllPurchases implements GetAllPurchasesUsecase {
  private readonly purchaseRepository: PurchaseRepository;

  constructor(purchaseRepository: PurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(): Promise<Either<ErrorClass, PurchaseEntity[]>> {
    return await this.purchaseRepository.getPurchases();
  }
}
