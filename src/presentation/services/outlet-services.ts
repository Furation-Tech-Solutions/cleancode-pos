import { NextFunction, Request, Response } from "express";
import {
  OutletModel,
  OutletEntity,
  OutletMapper,
} from "@domain/outlet/entities/outlet";
import { CreateOutletUsecase } from "@domain/outlet/usecases/create-outlet";
import { DeleteOutletUsecase } from "@domain/outlet/usecases/delete-outlet";
import { GetOutletByIdUsecase } from "@domain/outlet/usecases/get-outlet-by-id";
import { UpdateOutletUsecase } from "@domain/outlet/usecases/update-outlet";
import { GetAllOutletsUsecase } from "@domain/outlet/usecases/get-all-outlet";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class OutletService {
  private readonly createOutletUsecase: CreateOutletUsecase;
  private readonly deleteOutletUsecase: DeleteOutletUsecase;
  private readonly getOutletByIdUsecase: GetOutletByIdUsecase;
  private readonly updateOutletUsecase: UpdateOutletUsecase;
  private readonly getAllOutletsUsecase: GetAllOutletsUsecase;

  constructor(
    createOutletUsecase: CreateOutletUsecase,
    deleteOutletUsecase: DeleteOutletUsecase,
    getOutletByIdUsecase: GetOutletByIdUsecase,
    updateOutletUsecase: UpdateOutletUsecase,
    getAllOutletsUsecase: GetAllOutletsUsecase
  ) {
    this.createOutletUsecase = createOutletUsecase;
    this.deleteOutletUsecase = deleteOutletUsecase;
    this.getOutletByIdUsecase = getOutletByIdUsecase;
    this.updateOutletUsecase = updateOutletUsecase;
    this.getAllOutletsUsecase = getAllOutletsUsecase;
  }

  async createOutlet(req: Request, res: Response): Promise<void> {
      
      // Extract outlet data from the request body and convert it to outletModel
      const outletData: OutletModel = OutletMapper.toModel(req.body);

      // Call the createOutletUsecase to create the outlet
      const newOutlet: Either<ErrorClass, OutletEntity> = await this.createOutletUsecase.execute(
        outletData
      );

      newOutlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletEntity) =>{
          const responseData = OutletMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteOutlet(req: Request, res: Response): Promise<void> {
    
      const outletId: string = req.params.outletId;
    

      const updatedFoodCategoryEntity: OutletEntity = OutletMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateFoodCategoryUsecase to update the FoodCategory
      const updatedFoodCategory: Either<ErrorClass, OutletEntity> = await this.updateOutletUsecase.execute(
        outletId,
        updatedFoodCategoryEntity
      );

      updatedFoodCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletEntity) =>{
          const responseData = OutletMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getOutletById(req: Request, res: Response): Promise<void> {
      const outletId: string = req.params.outletId;

      // Call the GetoutletByIdUsecase to get the outlet by ID
      const outlet: Either<ErrorClass, OutletEntity | null> = await this.getOutletByIdUsecase.execute(
        outletId
      );

      outlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletEntity | null) =>{
          const responseData = OutletMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateOutlet(req: Request, res: Response): Promise<void> {
    
      const outletId: string = req.params.outletId;
      const outletData: OutletModel = req.body;

      // Get the existing outlet by ID
      const existingOutlet: Either<ErrorClass, OutletEntity | null> =
        await this.getOutletByIdUsecase.execute(outletId);

      if (!existingOutlet) {
        // If outlet is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert outletData from OutletModel to OutletEntity using OutletMapper
      const updatedOutletEntity: OutletEntity = OutletMapper.toEntity(
        outletData,
        true,
      );

      // Call the UpdateOutletUsecase to update the outlet
      const updatedOutlet: Either<ErrorClass, OutletEntity> = await this.updateOutletUsecase.execute(
        outletId,
        updatedOutletEntity
      );

      updatedOutlet.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletEntity) =>{
          const responseData = OutletMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllOutlets(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllOutletsUsecase to get all outlets
      const outlets: Either<ErrorClass, OutletEntity[]> = await this.getAllOutletsUsecase.execute();

      outlets.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: OutletEntity[]) => {
            // Filter out outlets with del_status set to "Deleted"
            const nonDeletedOutlets = result.filter((outlet) => outlet.del_status !== false);

            // Convert non-deleted outlets from an array of OutletEntity to an array of plain JSON objects using OutletMapper
            const responseData = nonDeletedOutlets.map((outlet: any) => OutletMapper.toEntity(outlet));
            return res.json(responseData);
        }
    );
  }
}
