import {type OutletStockRepository } from "@domain/outletStock/repositories/outletStock-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteOutletStockUsecase {
  execute: (outletStockId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteOutletStock implements DeleteOutletStockUsecase {
  private readonly outletStockRepository: OutletStockRepository;

  constructor(outletStockRepository: OutletStockRepository) {
    this.outletStockRepository = outletStockRepository;
  }

  async execute(outletStockId: string): Promise<Either<ErrorClass, void>> {
    return await this.outletStockRepository.deleteOutletStock(outletStockId);
  }
}
