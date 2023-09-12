import { SupplierModel, SupplierEntity } from "@domain/supplier/entities/supplier";
import { SupplierRepository } from "@domain/supplier/repositories/supplier-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateSupplierUsecase {
  execute: (supplierData: SupplierModel) => Promise<Either<ErrorClass, SupplierEntity>>;
}

export class CreateSupplier implements CreateSupplierUsecase {
  private readonly supplierRepository: SupplierRepository;

  constructor(supplierRepository: SupplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(supplierData: SupplierModel): Promise<Either<ErrorClass, SupplierEntity>> {
    return await this.supplierRepository.createSupplier(supplierData);
  }
}
