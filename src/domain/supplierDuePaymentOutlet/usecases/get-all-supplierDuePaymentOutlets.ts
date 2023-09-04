import { SupplierDuePaymentOutletModel, SupplierDuePaymentOutletEntity } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { SupplierDuePaymentOutletRepository } from "@domain/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllSupplierDuePaymentOutletsUsecase {
  execute: () => Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity[]>>;
}

export class GetAllSupplierDuePaymentOutlets implements GetAllSupplierDuePaymentOutletsUsecase {
  private readonly supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository;

  constructor(supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository) {
    this.supplierDuePaymentOutletRepository = supplierDuePaymentOutletRepository;
  }

  async execute(): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity[]>> {
    return await this.supplierDuePaymentOutletRepository.getSupplierDuePaymentOutlets();
  }
}
