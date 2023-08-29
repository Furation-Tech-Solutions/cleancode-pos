import {
  InventoryItemEntity,
  InventoryItemModel,
} from "@domain/inventoryItem/entities/inventoryItem";
import { InventoryItemRepository } from "@domain/inventoryItem/repositories/inventoryItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateInventoryItemUsecase {
  execute: (
    inventoryItemData: InventoryItemModel
  ) => Promise<Either<ErrorClass, InventoryItemEntity>>;
}

export class CreateInventoryItem implements CreateInventoryItemUsecase {
  private readonly inventoryItemRepository: InventoryItemRepository;

  constructor(inventoryItemRepository: InventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  async execute(
    inventoryItemData: InventoryItemModel
  ): Promise<Either<ErrorClass, InventoryItemEntity>> {
    return await this.inventoryItemRepository.createInventoryItem(
      inventoryItemData
    );
  }
}
