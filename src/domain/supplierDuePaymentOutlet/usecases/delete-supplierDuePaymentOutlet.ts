import {type SupplierDuePaymentOutletRepository } from "@domain/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteSupplierDuePaymentOutletUsecase {
  execute: (supplierDuePaymentOutletId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteSupplierDuePaymentOutlet implements DeleteSupplierDuePaymentOutletUsecase {
  private readonly supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository;

  constructor(supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository) {
    this.supplierDuePaymentOutletRepository = supplierDuePaymentOutletRepository;
  }

  async execute(supplierDuePaymentOutletId: string): Promise<Either<ErrorClass, void>> {
    return await this.supplierDuePaymentOutletRepository.deleteSupplierDuePaymentOutlet(supplierDuePaymentOutletId);
  }
}
