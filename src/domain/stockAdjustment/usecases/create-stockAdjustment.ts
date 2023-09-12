import { StockAdjustmentEntity, StockAdjustmentModel } from "@domain/stockAdjustment/entities/stockAdjustment";
import { StockAdjustmentRepository } from "@domain/stockAdjustment/repositories/stockAdjustment-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateStockAdjustmentUsecase {
  execute: (stockAdjustmentData: StockAdjustmentModel) => Promise<Either<ErrorClass, StockAdjustmentEntity>>;
}

export class CreateStockAdjustment implements CreateStockAdjustmentUsecase {
  private readonly StockAdjustmentRepository: StockAdjustmentRepository;

  constructor(StockAdjustmentRepository: StockAdjustmentRepository) {
    this.StockAdjustmentRepository = StockAdjustmentRepository;
  }

  async execute(stockAdjustmentData: StockAdjustmentModel): Promise<Either<ErrorClass, StockAdjustmentEntity>> {
    return await this.StockAdjustmentRepository.createStockAdjustment(stockAdjustmentData);
  }
}