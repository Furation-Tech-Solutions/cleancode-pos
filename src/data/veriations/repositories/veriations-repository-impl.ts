import { VeriationsModel, VeriationsEntity } from "@domain/veriations/entities/veriations";
import { VeriationsRepository } from "@domain/veriations/repositories/veriations-repository"; 
import { VeriationsDataSource } from "@data/veriations/datasource/veriations-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class VeriationsRepositoryImpl implements VeriationsRepository {
  private readonly dataSource: VeriationsDataSource;

  constructor(dataSource: VeriationsDataSource) {
    this.dataSource = dataSource;
  }

  async createVeriations(veriations: VeriationsModel): Promise<Either<ErrorClass, VeriationsEntity>> {
    // return await this.dataSource.create(veriations);
    try {
      let i = await this.dataSource.create(veriations);
      return Right<ErrorClass, VeriationsEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "veriationsName_conflict"){
        return Left<ErrorClass, VeriationsEntity>(ApiError.veriationsExists());
      }
      return Left<ErrorClass, VeriationsEntity>(ApiError.badRequest());
    }
  }

  async deleteVeriations(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateVeriations(id: string, data: VeriationsModel): Promise<Either<ErrorClass, VeriationsEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, VeriationsEntity>(i);
    } catch {
      return Left<ErrorClass, VeriationsEntity>(ApiError.badRequest());
    }
  }

  async getVeriationss(): Promise<Either<ErrorClass, VeriationsEntity[]>> {
    // return await this.dataSource.getAllVeriationss();
    try {
      let i = await this.dataSource.getAllVeriationss();
      return Right<ErrorClass, VeriationsEntity[]>(i);
    } catch {
      return Left<ErrorClass, VeriationsEntity[]>(ApiError.badRequest());
    }
  }

  async getVeriationsById(id: string): Promise<Either<ErrorClass, VeriationsEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, VeriationsEntity | null>(i);
    } catch {
      return Left<ErrorClass, VeriationsEntity | null>(ApiError.badRequest());
    }
  }
}
