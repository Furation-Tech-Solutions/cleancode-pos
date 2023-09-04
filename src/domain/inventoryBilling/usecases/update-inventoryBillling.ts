import {
  InventoryBillingEntity,
  InventoryBillingModel,
} from "@domain/inventoryBilling/entities/inventoryBilling";
import { InventoryBillingRepository } from "@domain/inventoryBilling/repositories/inventoryBilling-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateInventoryBillingUsecase {
  execute: (
    inventoryBillingId: string,
    inventoryBillingData: InventoryBillingModel
  ) => Promise<Either<ErrorClass, InventoryBillingEntity>>;
}

export class UpdateInventoryBilling implements UpdateInventoryBillingUsecase {
  private readonly inventoryBillingRepository: InventoryBillingRepository;

  constructor(inventoryBillingRepository: InventoryBillingRepository) {
    this.inventoryBillingRepository = inventoryBillingRepository;
  }

  async execute(
    inventoryBillingId: string,
    inventoryBillingData: InventoryBillingModel
  ): Promise<Either<ErrorClass, InventoryBillingEntity>> {
    return await this.inventoryBillingRepository.updateInventoryBilling(
      inventoryBillingId,
      inventoryBillingData
    );
  }
}
