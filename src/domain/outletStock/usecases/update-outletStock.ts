import { OutletStockModel, OutletStockEntity } from "@domain/outletStock/entities/outletStock";
import { OutletStockRepository } from "@domain/outletStock/repositories/outletStock-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateOutletStockUsecase {
  execute: (
    outletStockId: string,
    outletStockData: OutletStockModel
  ) => Promise<Either<ErrorClass, OutletStockEntity>>;
}

export class UpdateOutletStock implements UpdateOutletStockUsecase {
  private readonly outletStockRepository: OutletStockRepository;

  constructor(outletStockRepository: OutletStockRepository) {
    this.outletStockRepository = outletStockRepository;
  }
  async execute(outletStockId: string, outletStockData: OutletStockModel): Promise<Either<ErrorClass, OutletStockEntity>> {
   return await this.outletStockRepository.updateOutletStock(outletStockId, outletStockData);
 }
}
