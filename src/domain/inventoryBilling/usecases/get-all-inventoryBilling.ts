import { InventoryBillingEntity } from "@domain/inventoryBilling/entities/inventoryBilling";
import { InventoryBillingRepository } from "@domain/inventoryBilling/repositories/inventoryBilling-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInventoryBillingsUsecase {
  execute: () => Promise<Either<ErrorClass, InventoryBillingEntity[]>>;
}

export class GetAllInventoryBillings implements GetAllInventoryBillingsUsecase {
  private readonly inventoryBillingRepository: InventoryBillingRepository;

  constructor(inventoryBillingRepository: InventoryBillingRepository) {
    this.inventoryBillingRepository = inventoryBillingRepository;
  }

  async execute(): Promise<Either<ErrorClass, InventoryBillingEntity[]>> {
    return await this.inventoryBillingRepository.getInventoryBillings();
  }
}
