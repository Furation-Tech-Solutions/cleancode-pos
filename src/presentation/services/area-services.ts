import { NextFunction, Request, Response } from "express";
import {
  AreaModel,
  AreaEntity,
  AreaMapper,
} from "@domain/area/entities/area";
import { CreateAreaUsecase } from "@domain/area/usecases/create-area";
import { DeleteAreaUsecase } from "@domain/area/usecases/delete-area";
import { GetAreaByIdUsecase } from "@domain/area/usecases/get-area-by-id";
import { UpdateAreaUsecase } from "@domain/area/usecases/update-area";
import { GetAllAreasUsecase } from "@domain/area/usecases/get-all-area";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class AreaService {
  private readonly CreateAreaUsecase: CreateAreaUsecase;
  private readonly DeleteAreaUsecase: DeleteAreaUsecase;
  private readonly GetAreaByIdUsecase: GetAreaByIdUsecase;
  private readonly UpdateAreaUsecase: UpdateAreaUsecase;
  private readonly GetAllAreasUsecase: GetAllAreasUsecase;

  constructor(
    CreateAreaUsecase: CreateAreaUsecase,
    DeleteAreaUsecase: DeleteAreaUsecase,
    GetAreaByIdUsecase: GetAreaByIdUsecase,
    UpdateAreaUsecase: UpdateAreaUsecase,
    GetAllAreasUsecase: GetAllAreasUsecase
  ) {
    this.CreateAreaUsecase = CreateAreaUsecase;
    this.DeleteAreaUsecase = DeleteAreaUsecase;
    this.GetAreaByIdUsecase = GetAreaByIdUsecase;
    this.UpdateAreaUsecase = UpdateAreaUsecase;
    this.GetAllAreasUsecase = GetAllAreasUsecase;
  }

  async createArea(req: Request, res: Response): Promise<void> {
      // Extract Area data from the request body and convert it to AreaModel
      const areaData: AreaModel = AreaMapper.toModel(req.body);

      // Call the CreateAreaUsecase to create the area
      const newArea: Either<ErrorClass, AreaEntity> = await this.CreateAreaUsecase.execute(
        areaData
      );

      newArea.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: AreaEntity) =>{
          const responseData = AreaMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteArea(req: Request, res: Response): Promise<void> {
      const areaId: string = req.params.areaId;
    

      const updatedAreaEntity: AreaEntity = AreaMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateTableUsecase to update the table
      const updatedAre: Either<ErrorClass, AreaEntity> = await this.UpdateAreaUsecase.execute(
        areaId,
        updatedAreaEntity
      );

      updatedAre.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: AreaEntity) =>{
          const responseData = AreaMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAreaById(req: Request, res: Response): Promise<void> {
      const areaId: string = req.params.areaId;

      // Call the GetAreaByIdUsecase to get the area by ID
      const area: Either<ErrorClass, AreaEntity | null> = await this.GetAreaByIdUsecase.execute(
        areaId
      );

      area.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: AreaEntity | null) =>{
          const responseData = AreaMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateArea(req: Request, res: Response): Promise<void> {
      const areaId: string = req.params.areaId;
      const areaData: AreaModel = req.body;

      // Get the existing area by ID
      const existingArea: Either<ErrorClass, AreaEntity | null> =
        await this.GetAreaByIdUsecase.execute(areaId);

      if (!existingArea) {
        // If area is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert areaData from AreaModel to AreaEntity using AreaMapper
      const updatedAreaEntity: AreaEntity = AreaMapper.toEntity(
        areaData,
        true
      );

      // Call the UpdateAreaUsecase to update the Area
      const updatedArea: Either<ErrorClass, AreaEntity> = await this.UpdateAreaUsecase.execute(
        areaId,
        updatedAreaEntity
      );

      updatedArea.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: AreaEntity) =>{
          const responseData = AreaMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllAreas(req: Request, res: Response, next: NextFunction): Promise<void> {
      // Call the GetAllAreasUsecase to get all Areas
      const areas: Either<ErrorClass, AreaEntity[]> = await this.GetAllAreasUsecase.execute();
      
      areas.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: AreaEntity[]) => {
            // Filter out areas with del_status set to "Deleted"
            const nonDeletedAreas = result.filter((area) => area.del_status !== false);

            // Convert non-deleted areas from an array of AreaEntity to an array of plain JSON objects using FoodCategoryMapper
            const responseData = nonDeletedAreas.map((area) => AreaMapper.toEntity(area));
            return res.json(responseData);
        }
    );
  }
}
