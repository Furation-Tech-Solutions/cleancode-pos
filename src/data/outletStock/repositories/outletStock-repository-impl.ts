import { OutletStockModel, OutletStockEntity } from "@domain/outletStock/entities/outletStock";
import { OutletStockRepository } from "@domain/outletStock/repositories/outletStock-repository"; 
import { OutletStockDataSource } from "@data/outletStock/datasource/outletStock-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class OutletStockRepositoryImpl implements OutletStockRepository {
  private readonly dataSource: OutletStockDataSource;

  constructor(dataSource: OutletStockDataSource) {
    this.dataSource = dataSource;
  }

  async createOutletStock(outletStock: OutletStockModel): Promise<Either<ErrorClass, OutletStockEntity>> {
    // return await this.dataSource.create(outletStock);
    try {
      let i = await this.dataSource.create(outletStock);
      return Right<ErrorClass, OutletStockEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, OutletStockEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, OutletStockEntity>(ApiError.badRequest());
    }
  }

  async deleteOutletStock(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateOutletStock(id: string, data: OutletStockModel): Promise<Either<ErrorClass, OutletStockEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, OutletStockEntity>(i);
    } catch {
      return Left<ErrorClass, OutletStockEntity>(ApiError.badRequest());
    }
  }

  async getOutletStocks(): Promise<Either<ErrorClass, OutletStockEntity[]>> {
    // return await this.dataSource.getAllOutletStocks();
    try {
      let i = await this.dataSource.getAllOutletStocks();
      return Right<ErrorClass, OutletStockEntity[]>(i);
    } catch {
      return Left<ErrorClass, OutletStockEntity[]>(ApiError.badRequest());
    }
  }

  async getOutletStockById(id: string): Promise<Either<ErrorClass, OutletStockEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, OutletStockEntity | null>(i);
    } catch {
      return Left<ErrorClass, OutletStockEntity | null>(ApiError.badRequest());
    }
  }
}
