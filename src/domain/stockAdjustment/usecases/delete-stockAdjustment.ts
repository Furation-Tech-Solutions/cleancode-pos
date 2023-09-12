import { type StockAdjustmentRepository } from "@domain/stockAdjustment/repositories/stockAdjustment-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteStockAdjustmentUsecase {
  execute: (stockAdjustmentId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteStockAdjustment implements DeleteStockAdjustmentUsecase {
  private readonly stockAdjustmentRepository: StockAdjustmentRepository;

  constructor(stockAdjustmentRepository: StockAdjustmentRepository) {
    this.stockAdjustmentRepository = stockAdjustmentRepository;
  }

  async execute(stockAdjustmentId: string): Promise<Either<ErrorClass, void>> {
    return await this.stockAdjustmentRepository.deleteStockAdjustment(stockAdjustmentId);
  }
}
