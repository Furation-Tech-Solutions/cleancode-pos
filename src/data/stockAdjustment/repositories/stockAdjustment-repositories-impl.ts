import { StockAdjustmentModel, StockAdjustmentEntity } from "@domain/stockAdjustment/entities/stockAdjustment";
import { StockAdjustmentRepository } from "@domain/stockAdjustment/repositories/stockAdjustment-repository";
import { StockAdjustmentDataSource } from "@data/stockAdjustment/datasources/stockAdjustment-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class StockAdjustmentRepositoryImpl implements StockAdjustmentRepository {
  private readonly dataSource: StockAdjustmentDataSource;

  constructor(dataSource: StockAdjustmentDataSource) {
    this.dataSource = dataSource;
  }

  async createStockAdjustment(stockAdjustment: StockAdjustmentModel): Promise<Either<ErrorClass, StockAdjustmentEntity>> {
    // return await this.dataSource.create(stockAdjustment);
    try {
      let i = await this.dataSource.create(stockAdjustment);
      return Right<ErrorClass, StockAdjustmentEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, StockAdjustmentEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, StockAdjustmentEntity>(ApiError.badRequest());
    }
  }

  async deleteStockAdjustment(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateStockAdjustment(id: string, data: StockAdjustmentModel): Promise<Either<ErrorClass, StockAdjustmentEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, StockAdjustmentEntity>(i);
    } catch {
      return Left<ErrorClass, StockAdjustmentEntity>(ApiError.badRequest());
    }
  }

  async getStockAdjustments(): Promise<Either<ErrorClass, StockAdjustmentEntity[]>> {
    // return await this.dataSource.getAllStockAdjustments();
    try {
      let i = await this.dataSource.getAllStockAdjustments();
      return Right<ErrorClass, StockAdjustmentEntity[]>(i);
    } catch {
      return Left<ErrorClass, StockAdjustmentEntity[]>(ApiError.badRequest());
    }
  }

  async getStockAdjustmentById(id: string): Promise<Either<ErrorClass, StockAdjustmentEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, StockAdjustmentEntity | null>(i);
    } catch {
      return Left<ErrorClass, StockAdjustmentEntity | null>(ApiError.badRequest());
    }
  }
}