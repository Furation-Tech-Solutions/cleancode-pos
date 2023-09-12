import { StockAdjustmentEntity, StockAdjustmentModel } from "@domain/stockAdjustment/entities/stockAdjustment";
import { StockAdjustmentRepository } from "@domain/stockAdjustment/repositories/stockAdjustment-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UpdateStockAdjustmentUsecase {
  execute: (
    stockAdjustmentId: string,
    stockAdjustmentData: StockAdjustmentModel
  ) => Promise<Either<ErrorClass, StockAdjustmentEntity>>;
}

export class UpdateStockAdjustment implements UpdateStockAdjustmentUsecase {
  private readonly stockAdjustmentRepository: StockAdjustmentRepository;

  constructor(stockAdjustmentRepository: StockAdjustmentRepository) {
    this.stockAdjustmentRepository = stockAdjustmentRepository;
  }

  async execute(stockAdjustmentId: string, stockAdjustmentData: StockAdjustmentModel): Promise<Either<ErrorClass, StockAdjustmentEntity>> {
    return await this.stockAdjustmentRepository.updateStockAdjustment(stockAdjustmentId, stockAdjustmentData);
  }
}
