import { OutletStockModel, OutletStockEntity } from "@domain/outletStock/entities/outletStock";
import { OutletStockRepository } from "@domain/outletStock/repositories/outletStock-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateOutletStockUsecase {
  execute: (outletStockData: OutletStockModel) => Promise<Either<ErrorClass, OutletStockEntity>>;
}

export class CreateOutletStock implements CreateOutletStockUsecase {
  private readonly outletStockRepository: OutletStockRepository;

  constructor(outletStockRepository: OutletStockRepository) {
    this.outletStockRepository = outletStockRepository;
  }

  async execute(outletStockData: OutletStockModel): Promise<Either<ErrorClass, OutletStockEntity>> {
    return await this.outletStockRepository.createOutletStock(outletStockData);
  }
}
