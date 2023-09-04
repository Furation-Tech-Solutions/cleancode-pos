import { SupplierDuePaymentOutletModel, SupplierDuePaymentOutletEntity } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface SupplierDuePaymentOutletRepository {
  createSupplierDuePaymentOutlet(supplierDuePaymentOutlet: SupplierDuePaymentOutletModel): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>>;
  deleteSupplierDuePaymentOutlet(id: string): Promise<Either<ErrorClass, void>>;
  updateSupplierDuePaymentOutlet(id: string, data: SupplierDuePaymentOutletModel): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>>;
  getSupplierDuePaymentOutlets(): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity[]>>;
  getSupplierDuePaymentOutletById(id: string): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity | null>>;
}

