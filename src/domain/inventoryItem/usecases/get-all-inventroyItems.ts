import { InventoryItemEntity } from "@domain/inventoryItem/entities/inventoryItem";
import { InventoryItemRepository } from "@domain/inventoryItem/repositories/inventoryItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInventoryItemsUsecase {
  execute: () => Promise<Either<ErrorClass, InventoryItemEntity[]>>;
}

export class GetAllInventoryItems implements GetAllInventoryItemsUsecase {
  private readonly inventoryItemRepository: InventoryItemRepository;

  constructor(inventoryItemRepository: InventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  async execute(): Promise<Either<ErrorClass, InventoryItemEntity[]>> {
    return await this.inventoryItemRepository.getInventoryItems();
  }
}
