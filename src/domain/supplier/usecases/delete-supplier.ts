import {type SupplierRepository } from "@domain/supplier/repositories/supplier-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteSupplierUsecase {
  execute: (supplierId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteSupplier implements DeleteSupplierUsecase {
  private readonly supplierRepository: SupplierRepository;

  constructor(supplierRepository: SupplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(supplierId: string): Promise<Either<ErrorClass, void>> {
    return await this.supplierRepository.deleteSupplier(supplierId);
  }
}
