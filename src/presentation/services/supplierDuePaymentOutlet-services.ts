import { NextFunction, Request, Response } from "express";
import {
  SupplierDuePaymentOutletModel,
  SupplierDuePaymentOutletEntity,
  SupplierDuePaymentOutletMapper,
} from "@domain/supplierDuePaymentOutlet/entities/supplierDuePaymentOutlet";
import { CreateSupplierDuePaymentOutletUsecase } from "@domain/supplierDuePaymentOutlet/usecases/create-supplierDuePaymentOutlet";
import { DeleteSupplierDuePaymentOutletUsecase } from "@domain/supplierDuePaymentOutlet/usecases/delete-supplierDuePaymentOutlet";
import { GetSupplierDuePaymentOutletByIdUsecase } from "@domain/supplierDuePaymentOutlet/usecases/get-supplierDuePaymentOutlet-by-id";
import { UpdateSupplierDuePaymentOutletUsecase } from "@domain/supplierDuePaymentOutlet/usecases/update-supplierDuePaymentOutlet";
import { GetAllSupplierDuePaymentOutletsUsecase } from "@domain/supplierDuePaymentOutlet/usecases/get-all-supplierDuePaymentOutlets";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class SupplierDuePaymentOutletService {
  private readonly createSupplierDuePaymentOutletUsecase: CreateSupplierDuePaymentOutletUsecase;
  private readonly deleteSupplierDuePaymentOutletUsecase: DeleteSupplierDuePaymentOutletUsecase;
  private readonly getSupplierDuePaymentOutletByIdUsecase: GetSupplierDuePaymentOutletByIdUsecase;
  private readonly updateSupplierDuePaymentOutletUsecase: UpdateSupplierDuePaymentOutletUsecase;
  private readonly getAllSupplierDuePaymentOutletsUsecase: GetAllSupplierDuePaymentOutletsUsecase;

  constructor(
    createSupplierDuePaymentOutletUsecase: CreateSupplierDuePaymentOutletUsecase,
    deleteSupplierDuePaymentOutletUsecase: DeleteSupplierDuePaymentOutletUsecase,
    getSupplierDuePaymentOutletByIdUsecase: GetSupplierDuePaymentOutletByIdUsecase,
    updateSupplierDuePaymentOutletUsecase: UpdateSupplierDuePaymentOutletUsecase,
    getAllSupplierDuePaymentOutletsUsecase: GetAllSupplierDuePaymentOutletsUsecase
  ) {
    this.createSupplierDuePaymentOutletUsecase = createSupplierDuePaymentOutletUsecase;
    this.deleteSupplierDuePaymentOutletUsecase = deleteSupplierDuePaymentOutletUsecase;
    this.getSupplierDuePaymentOutletByIdUsecase = getSupplierDuePaymentOutletByIdUsecase;
    this.updateSupplierDuePaymentOutletUsecase = updateSupplierDuePaymentOutletUsecase;
    this.getAllSupplierDuePaymentOutletsUsecase = getAllSupplierDuePaymentOutletsUsecase;
  }

  async createSupplierDuePaymentOutlet(req: Request, res: Response): Promise<void> {
      
      // Extract supplierDuePaymentOutlet data from the request body and convert it to SupplierDuePaymentOutletModel
      const supplierDuePaymentOutletData: SupplierDuePaymentOutletModel = SupplierDuePaymentOutletMapper.toModel(req.body);

      // Call the createSupplierDuePaymentOutletUsecase to create the supplierDuePaymentOutlet
      const newSupplierDuePaymentOutlet: Either<ErrorClass, SupplierDuePaymentOutletEntity> = await this.createSupplierDuePaymentOutletUsecase.execute(
        supplierDuePaymentOutletData
      );

      newSupplierDuePaymentOutlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: SupplierDuePaymentOutletEntity) =>{
          const responseData = SupplierDuePaymentOutletMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteSupplierDuePaymentOutlet(req: Request, res: Response): Promise<void> {
    
      const supplierDuePaymentOutletId: string = req.params.supplierDuePaymentOutletId;
    

      const updatedSupplierDuePaymentOutletEntity: SupplierDuePaymentOutletEntity = SupplierDuePaymentOutletMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateSupplierDuePaymentOutletUsecase to update the SupplierDuePaymentOutlet
      const updatedSupplierDuePaymentOutlet: Either<ErrorClass, SupplierDuePaymentOutletEntity> = await this.updateSupplierDuePaymentOutletUsecase.execute(
        supplierDuePaymentOutletId,
        updatedSupplierDuePaymentOutletEntity
      );

      updatedSupplierDuePaymentOutlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: SupplierDuePaymentOutletEntity) =>{
          const responseData = SupplierDuePaymentOutletMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getSupplierDuePaymentOutletById(req: Request, res: Response): Promise<void> {
      const supplierDuePaymentOutletId: string = req.params.supplierDuePaymentOutletId;

      // Call the GetSupplierDuePaymentOutletByIdUsecase to get the supplierDuePaymentOutlet by ID
      const supplierDuePaymentOutlet: Either<ErrorClass, SupplierDuePaymentOutletEntity | null> = await this.getSupplierDuePaymentOutletByIdUsecase.execute(
        supplierDuePaymentOutletId
      );

      supplierDuePaymentOutlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: SupplierDuePaymentOutletEntity | null) =>{
          const responseData = SupplierDuePaymentOutletMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateSupplierDuePaymentOutlet(req: Request, res: Response): Promise<void> {
    
      const supplierDuePaymentOutletId: string = req.params.supplierDuePaymentOutletId;
      const supplierDuePaymentOutletData: SupplierDuePaymentOutletModel = req.body;

      // Get the existing SupplierDuePaymentOutlet by ID
      const existingSupplierDuePaymentOutlet: Either<ErrorClass, SupplierDuePaymentOutletEntity | null> =
        await this.getSupplierDuePaymentOutletByIdUsecase.execute(supplierDuePaymentOutletId);

      if (!existingSupplierDuePaymentOutlet) {
        // If supplierDuePaymentOutlet is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert supplierDuePaymentOutletfData from SupplierDuePaymentOutletModel to SupplierDuePaymentOutletEntity using SupplierDuePaymentOutletMapper
      const updatedSupplierDuePaymentOutletEntity: SupplierDuePaymentOutletEntity = SupplierDuePaymentOutletMapper.toEntity(
        supplierDuePaymentOutletData,
        true,
      );

      // Call the UpdateSupplierDuePaymentOutletUsecase to update the SupplierDuePaymentOutlet
      const updatedSupplierDuePaymentOutlet: Either<ErrorClass, SupplierDuePaymentOutletEntity> = await this.updateSupplierDuePaymentOutletUsecase.execute(
        supplierDuePaymentOutletId,
        updatedSupplierDuePaymentOutletEntity
      );

      updatedSupplierDuePaymentOutlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: SupplierDuePaymentOutletEntity) =>{
          const responseData = SupplierDuePaymentOutletMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllSupplierDuePaymentOutlets(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllSupplierDuePaymentOutletsUsecase to get all SupplierDuePaymentOutlets
      const supplierDuePaymentOutlets: Either<ErrorClass, SupplierDuePaymentOutletEntity[]> = await this.getAllSupplierDuePaymentOutletsUsecase.execute();

      supplierDuePaymentOutlets.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: SupplierDuePaymentOutletEntity[]) => {
            // Filter out supplierDuePaymentOutlets with del_status set to "Deleted"
            const nonDeletedSupplierDuePaymentOutlets = result.filter((supplierDuePaymentOutlet) => supplierDuePaymentOutlet.del_status !== false);

            // Convert non-deleted supplierDuePaymentOutlets from an array of SupplierDuePaymentOutletEntity to an array of plain JSON objects using SupplierDuePaymentOutletMapper
            const responseData = nonDeletedSupplierDuePaymentOutlets.map((supplierDuePaymentOutlet) => SupplierDuePaymentOutletMapper.toEntity(supplierDuePaymentOutlet));
            return res.json(responseData);
        }
    );
  }
}
