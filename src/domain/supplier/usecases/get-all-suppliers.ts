import { SupplierModel, SupplierEntity } from "@domain/supplier/entities/supplier";
import { SupplierRepository } from "@domain/supplier/repositories/supplier-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllSuppliersUsecase {
  execute: () => Promise<Either<ErrorClass, SupplierEntity[]>>;
}

export class GetAllSuppliers implements GetAllSuppliersUsecase {
  private readonly supplierRepository: SupplierRepository;

  constructor(supplierRepository: SupplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(): Promise<Either<ErrorClass, SupplierEntity[]>> {
    return await this.supplierRepository.getSuppliers();
  }
}
