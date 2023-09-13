import { NextFunction, Request, Response } from "express";
import {
  OutletStockModel,
  OutletStockEntity,
  OutletStockMapper,
} from "@domain/outletStock/entities/outletStock";
import { CreateOutletStockUsecase } from "@domain/outletStock/usecases/create-outletStock";
import { DeleteOutletStockUsecase } from "@domain/outletStock/usecases/delete-outletStock";
import { GetOutletStockByIdUsecase } from "@domain/outletStock/usecases/get-outletStock-by-id";
import { UpdateOutletStockUsecase } from "@domain/outletStock/usecases/update-outletStock";
import { GetAllOutletStocksUsecase } from "@domain/outletStock/usecases/get-all-outletStocks";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class OutletStockService {
  private readonly createOutletStockUsecase: CreateOutletStockUsecase;
  private readonly deleteOutletStockUsecase: DeleteOutletStockUsecase;
  private readonly getOutletStockByIdUsecase: GetOutletStockByIdUsecase;
  private readonly updateOutletStockUsecase: UpdateOutletStockUsecase;
  private readonly getAllOutletStocksUsecase: GetAllOutletStocksUsecase;

  constructor(
    createOutletStockUsecase: CreateOutletStockUsecase,
    deleteOutletStockUsecase: DeleteOutletStockUsecase,
    getOutletStockByIdUsecase: GetOutletStockByIdUsecase,
    updateOutletStockUsecase: UpdateOutletStockUsecase,
    getAllOutletStocksUsecase: GetAllOutletStocksUsecase
  ) {
    this.createOutletStockUsecase = createOutletStockUsecase;
    this.deleteOutletStockUsecase = deleteOutletStockUsecase;
    this.getOutletStockByIdUsecase = getOutletStockByIdUsecase;
    this.updateOutletStockUsecase = updateOutletStockUsecase;
    this.getAllOutletStocksUsecase = getAllOutletStocksUsecase;
  }

  async createOutletStock(req: Request, res: Response): Promise<void> {
      
      // Extract outletStock data from the request body and convert it to OutletStockModel
      const outletStockData: OutletStockModel = OutletStockMapper.toModel(req.body);

      // Call the createOutletStockUsecase to create the outletStock
      const newOutletStock: Either<ErrorClass, OutletStockEntity> = await this.createOutletStockUsecase.execute(
        outletStockData
      );

      newOutletStock.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletStockEntity) =>{
          const responseData = OutletStockMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteOutletStock(req: Request, res: Response): Promise<void> {
    
      const outletStockId: string = req.params.outletStockId;
    

      const updatedOutletStockEntity: OutletStockEntity = OutletStockMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateOutletStockUsecase to update the OutletStock
      const updatedOutletStock: Either<ErrorClass, OutletStockEntity> = await this.updateOutletStockUsecase.execute(
        outletStockId,
        updatedOutletStockEntity
      );

      updatedOutletStock.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletStockEntity) =>{
          const responseData = OutletStockMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getOutletStockById(req: Request, res: Response): Promise<void> {
      const outletStockId: string = req.params.outletStockId;

      // Call the GetOutletStockByIdUsecase to get the outletStock by ID
      const outletStock: Either<ErrorClass, OutletStockEntity | null> = await this.getOutletStockByIdUsecase.execute(
        outletStockId
      );

      outletStock.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletStockEntity | null) =>{
          const responseData = OutletStockMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateOutletStock(req: Request, res: Response): Promise<void> {
    
      const outletStockId: string = req.params.outletStockId;
      const outletStockData: OutletStockModel = req.body;

      // Get the existing OutletStock by ID
      const existingOutletStock: Either<ErrorClass, OutletStockEntity | null> =
        await this.getOutletStockByIdUsecase.execute(outletStockId);

      if (!existingOutletStock) {
        // If outletStock is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert outletStockfData from OutletStockModel to OutletStockEntity using OutletStockMapper
      const updatedOutletStockEntity: OutletStockEntity = OutletStockMapper.toEntity(
        outletStockData,
        true,
      );

      // Call the UpdateOutletStockUsecase to update the OutletStock
      const updatedOutletStock: Either<ErrorClass, OutletStockEntity> = await this.updateOutletStockUsecase.execute(
        outletStockId,
        updatedOutletStockEntity
      );

      updatedOutletStock.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: OutletStockEntity) =>{
          const responseData = OutletStockMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllOutletStocks(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllOutletStocksUsecase to get all OutletStocks
      const outletStocks: Either<ErrorClass, OutletStockEntity[]> = await this.getAllOutletStocksUsecase.execute();

      outletStocks.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: OutletStockEntity[]) => {
            // Filter out outletStocks with del_status set to "Deleted"
            const nonDeletedOutletStocks = result.filter((outletStock) => outletStock.del_status !== false);

            // Convert non-deleted outletStocks from an array of OutletStockEntity to an array of plain JSON objects using OutletStockMapper
            const responseData = nonDeletedOutletStocks.map((outletStock) => OutletStockMapper.toEntity(outletStock));
            return res.json(responseData);
        }
    );
  }
}
