import { NextFunction, Request, Response } from "express";
import {
  SupplierModel,
  SupplierEntity,
  SupplierMapper,
} from "@domain/supplier/entities/supplier";
import { CreateSupplierUsecase } from "@domain/supplier/usecases/create-supplier";
import { DeleteSupplierUsecase } from "@domain/supplier/usecases/delete-supplier";
import { GetSupplierByIdUsecase } from "@domain/supplier/usecases/get-supplier-by-id";
import { UpdateSupplierUsecase } from "@domain/supplier/usecases/update-supplier";
import { GetAllSuppliersUsecase } from "@domain/supplier/usecases/get-all-suppliers";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class SupplierService {
  private readonly createSupplierUsecase: CreateSupplierUsecase;
  private readonly deleteSupplierUsecase: DeleteSupplierUsecase;
  private readonly getSupplierByIdUsecase: GetSupplierByIdUsecase;
  private readonly updateSupplierUsecase: UpdateSupplierUsecase;
  private readonly getAllSuppliersUsecase: GetAllSuppliersUsecase;

  constructor(
    createSupplierUsecase: CreateSupplierUsecase,
    deleteSupplierUsecase: DeleteSupplierUsecase,
    getSupplierByIdUsecase: GetSupplierByIdUsecase,
    updateSupplierUsecase: UpdateSupplierUsecase,
    getAllSuppliersUsecase: GetAllSuppliersUsecase
  ) {
    this.createSupplierUsecase = createSupplierUsecase;
    this.deleteSupplierUsecase = deleteSupplierUsecase;
    this.getSupplierByIdUsecase = getSupplierByIdUsecase;
    this.updateSupplierUsecase = updateSupplierUsecase;
    this.getAllSuppliersUsecase = getAllSuppliersUsecase;
  }

  async createSupplier(req: Request, res: Response): Promise<void> {
    // Extract supplier data from the request body and convert it to SupplierModel
    const supplierData: SupplierModel = SupplierMapper.toModel(req.body);

    // Call the createSupplierUsecase to create the supplier
    const newSupplier: Either<ErrorClass, SupplierEntity> =
      await this.createSupplierUsecase.execute(supplierData);

    newSupplier.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: SupplierEntity) => {
        const responseData = SupplierMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async deleteSupplier(req: Request, res: Response): Promise<void> {
    const supplierId: string = req.params.supplierId;

    const updatedSupplierEntity: SupplierEntity = SupplierMapper.toEntity(
      { del_status: false },
      true
    );

    // Call the UpdateSupplierUsecase to update the Supplier
    const updatedSupplier: Either<ErrorClass, SupplierEntity> =
      await this.updateSupplierUsecase.execute(
        supplierId,
        updatedSupplierEntity
      );

    updatedSupplier.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: SupplierEntity) => {
        const responseData = SupplierMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getSupplierById(req: Request, res: Response): Promise<void> {
    const supplierId: string = req.params.supplierId;

    // Call the GetSupplierByIdUsecase to get the supplier by ID
    const supplier: Either<ErrorClass, SupplierEntity | null> =
      await this.getSupplierByIdUsecase.execute(supplierId);

    supplier.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: SupplierEntity | null) => {
        const responseData = SupplierMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async updateSupplier(req: Request, res: Response): Promise<void> {
    const supplierId: string = req.params.supplierId;
    const supplierData: SupplierModel = req.body;

    // Get the existing Supplier by ID
    const existingSupplier: Either<ErrorClass, SupplierEntity | null> =
      await this.getSupplierByIdUsecase.execute(supplierId);

    if (!existingSupplier) {
      // If supplier is not found, send a not found message as a JSON response
      ApiError.notFound();
      return;
    }

    // Convert supplierfData from SupplierModel to SupplierEntity using SupplierMapper
    const updatedSupplierEntity: SupplierEntity = SupplierMapper.toEntity(
      supplierData,
      true
    );

    // Call the UpdateSupplierUsecase to update the Supplier
    const updatedSupplier: Either<ErrorClass, SupplierEntity> =
      await this.updateSupplierUsecase.execute(
        supplierId,
        updatedSupplierEntity
      );

    updatedSupplier.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: SupplierEntity) => {
        const responseData = SupplierMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getAllSuppliers(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllSuppliersUsecase to get all Suppliers
      const suppliers: Either<ErrorClass, SupplierEntity[]> = await this.getAllSuppliersUsecase.execute();

      suppliers.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: SupplierEntity[]) => {
            // Filter out suppliers with del_status set to "Deleted"
            const nonDeletedSuppliers = result.filter((supplier) => supplier.del_status !== false);

            // Convert non-deleted suppliers from an array of SupplierEntity to an array of plain JSON objects using SupplierMapper
            const responseData = nonDeletedSuppliers.map((supplier) => SupplierMapper.toEntity(supplier));
            return res.json(responseData);
        }
    );
  }
}
