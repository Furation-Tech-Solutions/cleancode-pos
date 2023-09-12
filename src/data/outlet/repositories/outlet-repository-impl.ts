import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository"; 
import { OutletDataSource } from "@data/outlet/datasources/outlet-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class OutletRepositoryImpl implements OutletRepository {
  private readonly dataSource: OutletDataSource;

  constructor(dataSource: OutletDataSource) {
    this.dataSource = dataSource;
  }

  async createOutlet(outlet: OutletModel): Promise<Either<ErrorClass, OutletEntity>> {
    // return await this.dataSource.create(Outlet);
    try {
      let i = await this.dataSource.create(outlet);
      return Right<ErrorClass, OutletEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "foodCategory_conflict"){
        return Left<ErrorClass, OutletEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, OutletEntity>(ApiError.badRequest());
    }
  }

  async deleteOutlet(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateOutlet(id: string, data: OutletModel): Promise<Either<ErrorClass, OutletEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, OutletEntity>(i);
    } catch {
      return Left<ErrorClass, OutletEntity>(ApiError.badRequest());
    }
  }

  async getOutlets(): Promise<Either<ErrorClass, OutletEntity[]>> {
    // return await this.dataSource.getAllOutlets();
    try {
      let i = await this.dataSource.getAllOutlets();
      return Right<ErrorClass, OutletEntity[]>(i);
    } catch {
      return Left<ErrorClass, OutletEntity[]>(ApiError.badRequest());
    }
  }

  async getOutletById(id: string): Promise<Either<ErrorClass, OutletEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, OutletEntity | null>(i);
    } catch {
      return Left<ErrorClass, OutletEntity | null>(ApiError.badRequest());
    }
  }
}
