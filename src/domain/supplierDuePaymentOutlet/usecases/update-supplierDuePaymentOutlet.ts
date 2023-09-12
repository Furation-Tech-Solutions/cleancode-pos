import { SupplierDuePaymentOutletModel, SupplierDuePaymentOutletEntity } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { SupplierDuePaymentOutletRepository } from "@domain/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateSupplierDuePaymentOutletUsecase {
  execute: (
    supplierDuePaymentOutletId: string,
    supplierDuePaymentOutletData: SupplierDuePaymentOutletModel
  ) => Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>>;
}

export class UpdateSupplierDuePaymentOutlet implements UpdateSupplierDuePaymentOutletUsecase {
  private readonly supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository;

  constructor(supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository) {
    this.supplierDuePaymentOutletRepository = supplierDuePaymentOutletRepository;
  }
  async execute(supplierDuePaymentOutletId: string, supplierDuePaymentOutletData: SupplierDuePaymentOutletModel): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>> {
   return await this.supplierDuePaymentOutletRepository.updateSupplierDuePaymentOutlet(supplierDuePaymentOutletId, supplierDuePaymentOutletData);
 }
}
