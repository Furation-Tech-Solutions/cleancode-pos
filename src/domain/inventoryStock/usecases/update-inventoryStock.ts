import {
  InventoryStockEntity,
  InventoryStockModel,
} from "@domain/inventoryStock/entities/inventoryStock";
import { InventoryStockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateInventoryStockUsecase {
  execute: (
    inventoryStockId: string,
    inventoryStockData: InventoryStockModel
  ) => Promise<Either<ErrorClass, InventoryStockEntity>>;
}

export class UpdateInventoryStock implements UpdateInventoryStockUsecase {
  private readonly inventoryStockRepository: InventoryStockRepository;

  constructor(inventoryStockRepository: InventoryStockRepository) {
    this.inventoryStockRepository = inventoryStockRepository;
  }

  async execute(
    inventoryStockId: string,
    inventoryStockData: InventoryStockModel
  ): Promise<Either<ErrorClass, InventoryStockEntity>> {
    return await this.inventoryStockRepository.updateInventoryStock(
      inventoryStockId,
      inventoryStockData
    );
  }
}
