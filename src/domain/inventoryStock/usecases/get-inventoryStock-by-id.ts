import { InventoryStockEntity } from "@domain/inventoryStock/entities/inventoryStock";
import { InventoryStockRepository } from "@domain/inventoryStock/repositories/inventoryStock-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetInventoryStockByIdUsecase {
  execute: (
    inventoryStockId: string
  ) => Promise<Either<ErrorClass, InventoryStockEntity>>;
}

export class GetInventoryStockById implements GetInventoryStockByIdUsecase {
  private readonly inventoryStockRepository: InventoryStockRepository;

  constructor(inventoryStockRepository: InventoryStockRepository) {
    this.inventoryStockRepository = inventoryStockRepository;
  }

  async execute(
    inventoryStockId: string
  ): Promise<Either<ErrorClass, InventoryStockEntity>> {
    return await this.inventoryStockRepository.getInventoryStockById(
      inventoryStockId
    );
  }
}
