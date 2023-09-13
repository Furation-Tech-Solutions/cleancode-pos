import { StockAdjustmentEntity } from "@domain/stockAdjustment/entities/stockAdjustment";
import { StockAdjustmentRepository } from "@domain/stockAdjustment/repositories/stockAdjustment-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllStockAdjustmentsUsecase {
  execute: () => Promise<Either<ErrorClass, StockAdjustmentEntity[]>>;
}

export class GetAllStockAdjustments implements GetAllStockAdjustmentsUsecase {
  private readonly stockAdjustmentRepository: StockAdjustmentRepository;

  constructor(stockAdjustmentRepository: StockAdjustmentRepository) {
    this.stockAdjustmentRepository = stockAdjustmentRepository;
  }

  async execute(): Promise<Either<ErrorClass, StockAdjustmentEntity[]>> {
    return await this.stockAdjustmentRepository.getStockAdjustments();
  }
}
