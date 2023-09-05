import { OutletStockModel, OutletStockEntity } from "@domain/outletStock/entities/outletStock";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface OutletStockRepository {
  createOutletStock(outletStock: OutletStockModel): Promise<Either<ErrorClass, OutletStockEntity>>;
  deleteOutletStock(id: string): Promise<Either<ErrorClass, void>>;
  updateOutletStock(id: string, data: OutletStockModel): Promise<Either<ErrorClass, OutletStockEntity>>;
  getOutletStocks(): Promise<Either<ErrorClass, OutletStockEntity[]>>;
  getOutletStockById(id: string): Promise<Either<ErrorClass, OutletStockEntity | null>>;
}

