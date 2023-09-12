import { SupplierDuePaymentOutletModel, SupplierDuePaymentOutletEntity } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { SupplierDuePaymentOutletRepository } from "@domain/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository"; 
import { SupplierDuePaymentOutletDataSource } from "@data/supplierDuePaymentOutlet/datasource/supplierDuePaymentOutlet-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class SupplierDuePaymentOutletRepositoryImpl implements SupplierDuePaymentOutletRepository {
  private readonly dataSource: SupplierDuePaymentOutletDataSource;

  constructor(dataSource: SupplierDuePaymentOutletDataSource) {
    this.dataSource = dataSource;
  }

  async createSupplierDuePaymentOutlet(supplierDuePaymentOutlet: SupplierDuePaymentOutletModel): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>> {
    // return await this.dataSource.create(supplierDuePaymentOutlet);
    try {
      let i = await this.dataSource.create(supplierDuePaymentOutlet);
      return Right<ErrorClass, SupplierDuePaymentOutletEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, SupplierDuePaymentOutletEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, SupplierDuePaymentOutletEntity>(ApiError.badRequest());
    }
  }

  async deleteSupplierDuePaymentOutlet(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateSupplierDuePaymentOutlet(id: string, data: SupplierDuePaymentOutletModel): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, SupplierDuePaymentOutletEntity>(i);
    } catch {
      return Left<ErrorClass, SupplierDuePaymentOutletEntity>(ApiError.badRequest());
    }
  }

  async getSupplierDuePaymentOutlets(): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity[]>> {
    // return await this.dataSource.getAllSupplierDuePaymentOutlets();
    try {
      let i = await this.dataSource.getAllSupplierDuePaymentOutlets();
      return Right<ErrorClass, SupplierDuePaymentOutletEntity[]>(i);
    } catch {
      return Left<ErrorClass, SupplierDuePaymentOutletEntity[]>(ApiError.badRequest());
    }
  }

  async getSupplierDuePaymentOutletById(id: string): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, SupplierDuePaymentOutletEntity | null>(i);
    } catch {
      return Left<ErrorClass, SupplierDuePaymentOutletEntity | null>(ApiError.badRequest());
    }
  }
}
