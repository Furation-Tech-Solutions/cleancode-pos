import { SupplierModel, SupplierEntity } from "@domain/supplier/entities/supplier";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface SupplierRepository {
  createSupplier(supplier: SupplierModel): Promise<Either<ErrorClass, SupplierEntity>>;
  deleteSupplier(id: string): Promise<Either<ErrorClass, void>>;
  updateSupplier(id: string, data: SupplierModel): Promise<Either<ErrorClass, SupplierEntity>>;
  getSuppliers(): Promise<Either<ErrorClass, SupplierEntity[]>>;
  getSupplierById(id: string): Promise<Either<ErrorClass, SupplierEntity | null>>;
}

