import { SupplierModel, SupplierEntity } from "@domain/supplier/entities/supplier";
import { SupplierRepository } from "@domain/supplier/repositories/supplier-repository"; 
import { SupplierDataSource } from "@data/supplier/datasource/supplier-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class SupplierRepositoryImpl implements SupplierRepository {
  private readonly dataSource: SupplierDataSource;

  constructor(dataSource: SupplierDataSource) {
    this.dataSource = dataSource;
  }

  async createSupplier(
    supplier: SupplierModel
  ): Promise<Either<ErrorClass, SupplierEntity>> {
    // return await this.dataSource.create(supplier);
    try {
      let i = await this.dataSource.create(supplier);
      return Right<ErrorClass, SupplierEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, SupplierEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, SupplierEntity>(ApiError.badRequest());
    }
  }

  async deleteSupplier(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);

    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateSupplier(
    id: string,
    data: SupplierModel
  ): Promise<Either<ErrorClass, SupplierEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, SupplierEntity>(i);
    } catch {
      return Left<ErrorClass, SupplierEntity>(ApiError.badRequest());
    }
  }

  async getSuppliers(): Promise<Either<ErrorClass, SupplierEntity[]>> {
    try {
      const response = await this.dataSource.getAllSuppliers();
      return Right<ErrorClass, SupplierEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, SupplierEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, SupplierEntity[]>(ApiError.badRequest());
    }
  }

  async getSupplierById(
    id: string
  ): Promise<Either<ErrorClass, SupplierEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, SupplierEntity | null>(i);
    } catch {
      return Left<ErrorClass, SupplierEntity | null>(ApiError.badRequest());
    }
  }
}
