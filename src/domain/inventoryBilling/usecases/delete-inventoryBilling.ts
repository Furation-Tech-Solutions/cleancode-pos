import { InventoryBillingRepository } from "@domain/inventoryBilling/repositories/inventoryBilling-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInventoryBillingUsecase {
  execute: (inventoryBillingId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInventoryBilling implements DeleteInventoryBillingUsecase {
  private readonly inventoryBillingRepository: InventoryBillingRepository;

  constructor(inventoryBillingRepository: InventoryBillingRepository) {
    this.inventoryBillingRepository = inventoryBillingRepository;
  }

  async execute(inventoryBillingId: string): Promise<Either<ErrorClass, void>> {
    return await this.inventoryBillingRepository.deleteInventoryBilling(
      inventoryBillingId
    );
  }
}
