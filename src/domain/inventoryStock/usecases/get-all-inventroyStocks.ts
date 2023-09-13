import { InventoryStockEntity } from "@domain/inventoryStock/entities/inventoryStock";
import { InventoryStockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllInventoryStocksUsecase {
  execute: () => Promise<Either<ErrorClass, InventoryStockEntity[]>>;
}

export class GetAllInventoryStocks implements GetAllInventoryStocksUsecase {
  private readonly inventoryStockRepository: InventoryStockRepository;

  constructor(inventoryStockRepository: InventoryStockRepository) {
    this.inventoryStockRepository = inventoryStockRepository;
  }

  async execute(): Promise<Either<ErrorClass, InventoryStockEntity[]>> {
    return await this.inventoryStockRepository.getInventoryStocks();
  }
}
