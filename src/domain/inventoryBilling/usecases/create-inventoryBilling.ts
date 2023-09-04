import {
  InventoryBillingEntity,
  InventoryBillingModel,
} from "@domain/inventoryBilling/entities/inventoryBilling";
import { InventoryBillingRepository } from "@domain/inventoryBilling/repositories/inventoryBilling-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateInventoryBillingUsecase {
  execute: (
    inventoryBillingData: InventoryBillingModel
  ) => Promise<Either<ErrorClass, InventoryBillingEntity>>;
}

export class CreateInventoryBilling implements CreateInventoryBillingUsecase {
  private readonly inventoryBillingRepository: InventoryBillingRepository;

  constructor(inventoryBillingRepository: InventoryBillingRepository) {
    this.inventoryBillingRepository = inventoryBillingRepository;
  }

  async execute(
    inventoryBillingData: InventoryBillingModel
  ): Promise<Either<ErrorClass, InventoryBillingEntity>> {
    return await this.inventoryBillingRepository.createInventoryBilling(
      inventoryBillingData
    );
  }
}
