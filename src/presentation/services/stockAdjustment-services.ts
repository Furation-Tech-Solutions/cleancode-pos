import { NextFunction, Request, Response } from "express";
import {
  StockAdjustmentModel,
  StockAdjustmentEntity,
  StockAdjustmentMapper,
} from "@domain/stockAdjustment/entities/stockAdjustment";
import { CreateStockAdjustmentUsecase } from "@domain/stockAdjustment/usecases/create-stockAdjustment";
import { DeleteStockAdjustmentUsecase } from "@domain/stockAdjustment/usecases/delete-stockAdjustment";
import { GetStockAdjustmentByIdUsecase } from "@domain/stockAdjustment/usecases/get-stockAdjustment-by-id";
import { UpdateStockAdjustmentUsecase } from "@domain/stockAdjustment/usecases/update-stockAdjustment";
import { GetAllStockAdjustmentsUsecase } from "@domain/stockAdjustment/usecases/get-all-stockAdjustments";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class StockAdjustmentService {
  private readonly CreateStockAdjustmentUsecase: CreateStockAdjustmentUsecase;
  private readonly DeleteStockAdjustmentUsecase: DeleteStockAdjustmentUsecase;
  private readonly GetStockAdjustmentByIdUsecase: GetStockAdjustmentByIdUsecase;
  private readonly UpdateStockAdjustmentUsecase: UpdateStockAdjustmentUsecase;
  private readonly GetAllStockAdjustmentsUsecase: GetAllStockAdjustmentsUsecase;

  constructor(
    CreateStockAdjustmentUsecase: CreateStockAdjustmentUsecase,
    DeleteStockAdjustmentUsecase: DeleteStockAdjustmentUsecase,
    GetStockAdjustmentByIdUsecase: GetStockAdjustmentByIdUsecase,
    UpdateStockAdjustmentUsecase: UpdateStockAdjustmentUsecase,
    GetAllStockAdjustmentsUsecase: GetAllStockAdjustmentsUsecase
  ) {
    this.CreateStockAdjustmentUsecase = CreateStockAdjustmentUsecase;
    this.DeleteStockAdjustmentUsecase = DeleteStockAdjustmentUsecase;
    this.GetStockAdjustmentByIdUsecase = GetStockAdjustmentByIdUsecase;
    this.UpdateStockAdjustmentUsecase = UpdateStockAdjustmentUsecase;
    this.GetAllStockAdjustmentsUsecase = GetAllStockAdjustmentsUsecase;
  }

  async createStockAdjustment(req: Request, res: Response): Promise<void> {
      // Extract StockAdjustment data from the request body and convert it to StockAdjustmentModel
      const stockAdjustmentData: StockAdjustmentModel = StockAdjustmentMapper.toModel(req.body);

      // Call the CreateStockAdjustmentUsecase to create the stockAdjustment
      const newStockAdjustment: Either<ErrorClass, StockAdjustmentEntity> = await this.CreateStockAdjustmentUsecase.execute(
        stockAdjustmentData
      );

      newStockAdjustment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StockAdjustmentEntity) =>{
          const responseData = StockAdjustmentMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteStockAdjustment(req: Request, res: Response): Promise<void> {
      const stockAdjustmentId: string = req.params.stockAdjustmentId;
    

      const updatedStockAdjustmentEntity: StockAdjustmentEntity = StockAdjustmentMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateTableUsecase to update the table
      const updatedAre: Either<ErrorClass, StockAdjustmentEntity> = await this.UpdateStockAdjustmentUsecase.execute(
        stockAdjustmentId,
        updatedStockAdjustmentEntity
      );

      updatedAre.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StockAdjustmentEntity) =>{
          const responseData = StockAdjustmentMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getStockAdjustmentById(req: Request, res: Response): Promise<void> {
      const stockAdjustmentId: string = req.params.stockAdjustmentId;

      // Call the GetStockAdjustmentByIdUsecase to get the stockAdjustment by ID
      const stockAdjustment: Either<ErrorClass, StockAdjustmentEntity | null> = await this.GetStockAdjustmentByIdUsecase.execute(
        stockAdjustmentId
      );

      stockAdjustment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StockAdjustmentEntity | null) =>{
          const responseData = StockAdjustmentMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateStockAdjustment(req: Request, res: Response): Promise<void> {
      const stockAdjustmentId: string = req.params.stockAdjustmentId;
      const stockAdjustmentData: StockAdjustmentModel = req.body;

      // Get the existing stockAdjustment by ID
      const existingStockAdjustment: Either<ErrorClass, StockAdjustmentEntity | null> =
        await this.GetStockAdjustmentByIdUsecase.execute(stockAdjustmentId);

      if (!existingStockAdjustment) {
        // If stockAdjustment is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert stockAdjustmentData from StockAdjustmentModel to StockAdjustmentEntity using StockAdjustmentMapper
      const updatedStockAdjustmentEntity: StockAdjustmentEntity = StockAdjustmentMapper.toEntity(
        stockAdjustmentData,
        true
      );

      // Call the UpdateStockAdjustmentUsecase to update the StockAdjustment
      const updatedStockAdjustment: Either<ErrorClass, StockAdjustmentEntity> = await this.UpdateStockAdjustmentUsecase.execute(
        stockAdjustmentId,
        updatedStockAdjustmentEntity
      );

      updatedStockAdjustment.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: StockAdjustmentEntity) =>{
          const responseData = StockAdjustmentMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllStockAdjustments(req: Request, res: Response, next: NextFunction): Promise<void> {
      // Call the GetAllStockAdjustmentsUsecase to get all StockAdjustments
      const stockAdjustments: Either<ErrorClass, StockAdjustmentEntity[]> = await this.GetAllStockAdjustmentsUsecase.execute();
      
      stockAdjustments.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: StockAdjustmentEntity[]) => {
            // Filter out stockAdjustments with del_status set to "Deleted"
            const nonDeletedStockAdjustments = result.filter((stockAdjustment) => stockAdjustment.del_status !== false);

            // Convert non-deleted stockAdjustments from an array of StockAdjustmentEntity to an array of plain JSON objects using FoodCategoryMapper
            const responseData = nonDeletedStockAdjustments.map((stockAdjustment) => StockAdjustmentMapper.toEntity(stockAdjustment));
            return res.json(responseData);
        }
    );
  }
}
