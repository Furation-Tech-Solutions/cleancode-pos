import { InventoryBillingEntity } from "@domain/inventoryBilling/entities/inventoryBilling";
import { InventoryBillingRepository } from "@domain/inventoryBilling/repositories/inventoryBilling-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetInventoryBillingByIdUsecase {
  execute: (
    inventoryBillingId: string
  ) => Promise<Either<ErrorClass, InventoryBillingEntity>>;
}

export class GetInventoryBillingById implements GetInventoryBillingByIdUsecase {
  private readonly inventoryBillingRepository: InventoryBillingRepository;

  constructor(inventoryBillingRepository: InventoryBillingRepository) {
    this.inventoryBillingRepository = inventoryBillingRepository;
  }

  async execute(
    inventoryBillingId: string
  ): Promise<Either<ErrorClass, InventoryBillingEntity>> {
    return await this.inventoryBillingRepository.getInventoryBillingById(
      inventoryBillingId
    );
  }
}
