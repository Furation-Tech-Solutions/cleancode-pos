import { SupplierDuePaymentOutletModel, SupplierDuePaymentOutletEntity } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { SupplierDuePaymentOutletRepository } from "@domain/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetSupplierDuePaymentOutletByIdUsecase {
  execute: (supplierDuePaymentOutletId: string) => Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity | null>>;
}

export class GetSupplierDuePaymentOutletById implements GetSupplierDuePaymentOutletByIdUsecase {
  private readonly supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository;

  constructor(supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository) {
    this.supplierDuePaymentOutletRepository = supplierDuePaymentOutletRepository;
  }

  async execute(supplierDuePaymentOutletId: string): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity | null>> {
    return await this.supplierDuePaymentOutletRepository.getSupplierDuePaymentOutletById(supplierDuePaymentOutletId);
  }
}
