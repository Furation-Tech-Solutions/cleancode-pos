import { InventoryStockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteInventoryStockUsecase {
  execute: (inventoryStockId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteInventoryStock implements DeleteInventoryStockUsecase {
  private readonly inventoryStockRepository: InventoryStockRepository;

  constructor(inventoryStockRepository: InventoryStockRepository) {
    this.inventoryStockRepository = inventoryStockRepository;
  }

  async execute(
    inventoryStockId: string
  ): Promise<Either<ErrorClass, void>> {
    return await this.inventoryStockRepository.deleteInventoryStock(
      inventoryStockId
    );
  }
}
