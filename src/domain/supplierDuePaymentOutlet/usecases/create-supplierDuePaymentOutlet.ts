import { SupplierDuePaymentOutletModel, SupplierDuePaymentOutletEntity } from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { SupplierDuePaymentOutletRepository } from "@domain/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateSupplierDuePaymentOutletUsecase {
  execute: (supplierDuePaymentOutletData: SupplierDuePaymentOutletModel) => Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>>;
}

export class CreateSupplierDuePaymentOutlet implements CreateSupplierDuePaymentOutletUsecase {
  private readonly supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository;

  constructor(supplierDuePaymentOutletRepository: SupplierDuePaymentOutletRepository) {
    this.supplierDuePaymentOutletRepository = supplierDuePaymentOutletRepository;
  }

  async execute(supplierDuePaymentOutletData: SupplierDuePaymentOutletModel): Promise<Either<ErrorClass, SupplierDuePaymentOutletEntity>> {
    return await this.supplierDuePaymentOutletRepository.createSupplierDuePaymentOutlet(supplierDuePaymentOutletData);
  }
}
