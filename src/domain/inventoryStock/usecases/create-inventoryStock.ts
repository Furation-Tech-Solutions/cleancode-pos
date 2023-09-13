import {
  InventoryStockEntity,
  InventoryStockModel,
} from "@domain/inventoryStock/entities/inventoryStock";
import { InventoryStockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateInventoryStockUsecase {
  execute: (
    inventoryStockData: InventoryStockModel
  ) => Promise<Either<ErrorClass, InventoryStockEntity>>;
}

export class CreateInventoryStock implements CreateInventoryStockUsecase {
  private readonly inventoryStockRepository: InventoryStockRepository;

  constructor(inventoryStockRepository: InventoryStockRepository) {
    this.inventoryStockRepository = inventoryStockRepository;
  }

  async execute(
    inventoryStockData: InventoryStockModel
  ): Promise<Either<ErrorClass, InventoryStockEntity>> {
    return await this.inventoryStockRepository.createInventoryStock(
      inventoryStockData
    );
  }
}
