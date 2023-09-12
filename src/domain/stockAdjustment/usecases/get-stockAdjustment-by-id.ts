import { StockAdjustmentEntity } from "@domain/stockAdjustment/entities/stockAdjustment";
import { StockAdjustmentRepository } from "@domain/stockAdjustment/repositories/stockAdjustment-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetStockAdjustmentByIdUsecase {
  execute: (stockAdjustmentId: string) => Promise<Either<ErrorClass, StockAdjustmentEntity | null>>;
}

export class GetStockAdjustmentById implements GetStockAdjustmentByIdUsecase {
  private readonly stockAdjustmentRepository:StockAdjustmentRepository;

  constructor(stockAdjustmentRepository: StockAdjustmentRepository) {
    this.stockAdjustmentRepository = stockAdjustmentRepository;
  }

  async execute(stockAdjustmentId: string): Promise<Either<ErrorClass, StockAdjustmentEntity | null>> {
    return await this.stockAdjustmentRepository.getStockAdjustmentById(stockAdjustmentId);
  }
}