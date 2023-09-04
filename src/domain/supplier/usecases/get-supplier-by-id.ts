import { SupplierModel, SupplierEntity } from "@domain/supplier/entities/supplier";
import { SupplierRepository } from "@domain/supplier/repositories/supplier-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetSupplierByIdUsecase {
  execute: (supplierId: string) => Promise<Either<ErrorClass, SupplierEntity | null>>;
}

export class GetSupplierById implements GetSupplierByIdUsecase {
  private readonly supplierRepository: SupplierRepository;

  constructor(supplierRepository: SupplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(supplierId: string): Promise<Either<ErrorClass, SupplierEntity | null>> {
    return await this.supplierRepository.getSupplierById(supplierId);
  }
}
