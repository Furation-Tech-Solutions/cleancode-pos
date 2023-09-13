import { InventoryEntity } from "@domain/inventory/entities/inventory";
import { InventoryRepository } from "@domain/inventory/repositories/inventory-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInventorysUsecase {
  execute: () => Promise<Either<ErrorClass, InventoryEntity[]>>;
}

export class GetAllInventories implements GetAllInventorysUsecase {
  private readonly inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(): Promise<Either<ErrorClass, InventoryEntity[]>> {
    return await this.inventoryRepository.getInventorys();
  }
}
