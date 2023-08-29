import { InventoryItemRepository } from "@domain/inventoryItem/repositories/inventoryItem-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInventoryItemUsecase {
  execute: (inventoryItemId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInventoryItem implements DeleteInventoryItemUsecase {
  private readonly inventoryItemRepository: InventoryItemRepository;

  constructor(inventoryItemRepository: InventoryItemRepository) {
    this.inventoryItemRepository = inventoryItemRepository;
  }

  async execute(inventoryItemId: string): Promise<Either<ErrorClass, void>> {
    return await this.inventoryItemRepository.deleteInventoryItem(inventoryItemId);
  }
}
