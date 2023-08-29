import { InventoryItemEntity } from "@domain/inventoryItem/entities/inventoryItem";
import { InventoryItemRepository } from "@domain/inventoryItem/repositories/inventoryItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetInventoryItemByIdUsecase {
  execute: (
    inventoryItemId: string
  ) => Promise<Either<ErrorClass, InventoryItemEntity>>;
}

export class GetInventoryItemById implements GetInventoryItemByIdUsecase {
  private readonly inventoryItemRepository: InventoryItemRepository;

  constructor(inventoryItemRepository: InventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  async execute(
    inventoryItemId: string
  ): Promise<Either<ErrorClass, InventoryItemEntity>> {
    return await this.inventoryItemRepository.getInventoryItemById(inventoryItemId);
  }
}
