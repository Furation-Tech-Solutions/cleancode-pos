import {StockAdjustmentModel,StockAdjustmentEntity } from "@domain/stockAdjustment/entities/stockAdjustment";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error"
export interface StockAdjustmentRepository {
  createStockAdjustment(stockAdjustment: StockAdjustmentModel): Promise<Either<ErrorClass, StockAdjustmentEntity>>;
  deleteStockAdjustment(id: string): Promise<Either<ErrorClass, void>>;
  updateStockAdjustment(id: string, data: StockAdjustmentModel): Promise<Either<ErrorClass, StockAdjustmentEntity>>;
  getStockAdjustments(): Promise<Either<ErrorClass, StockAdjustmentEntity[]>>;
  getStockAdjustmentById(id: string): Promise<Either<ErrorClass, StockAdjustmentEntity | null>>;
}