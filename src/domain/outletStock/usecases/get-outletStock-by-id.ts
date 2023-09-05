import { OutletStockModel, OutletStockEntity } from "@domain/outletStock/entities/outletStock";
import { OutletStockRepository } from "@domain/outletStock/repositories/outletStock-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetOutletStockByIdUsecase {
  execute: (outletStockId: string) => Promise<Either<ErrorClass, OutletStockEntity | null>>;
}

export class GetOutletStockById implements GetOutletStockByIdUsecase {
  private readonly outletStockRepository: OutletStockRepository;

  constructor(outletStockRepository: OutletStockRepository) {
    this.outletStockRepository = outletStockRepository;
  }

  async execute(outletStockId: string): Promise<Either<ErrorClass, OutletStockEntity | null>> {
    return await this.outletStockRepository.getOutletStockById(outletStockId);
  }
}
