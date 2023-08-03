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
    try {
      
      // Extract Area data from the request body and convert it to AreaModel
      const areaData: AreaModel = AreaMapper.toModel(req.body);

      // Call the CreateAreaUsecase to create the area
      const newArea: AreaEntity = await this.CreateAreaUsecase.execute(
        areaData
      );

      // Convert newArea from AreaEntity to the desired format using AreaMapper
      const responseData = AreaMapper.toEntity(newArea, true);

      // Send the created area as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

         ApiError.internalError()
    }
  }

  async deleteArea(req: Request, res: Response): Promise<void> {
    try {
      const areaId: string = req.params.areaId;

      // Call the DeleteAreaUsecase to delete the area
      await this.DeleteAreaUsecase.execute(areaId);

      // Send a success message as a JSON response
      res.json({ message: "Area deleted successfully." });
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAreaById(req: Request, res: Response): Promise<void> {
    try {
      const areaId: string = req.params.areaId;

      // Call the GetAreaByIdUsecase to get the area by ID
      const area: AreaEntity | null = await this.GetAreaByIdUsecase.execute(
        areaId
      );

      if (area) {
        // Convert Area from AreaEntity to plain JSON object using AreaMapper
        const responseData = AreaMapper.toModel(area);

        // Send the area as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        ApiError.notFound()
      }
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
       
    }
  }

  async updateArea(req: Request, res: Response): Promise<void> {
    try {
      const areaId: string = req.params.areaId;
      const areaData: AreaModel = req.body;

      // Get the existing area by ID
      const existingArea: AreaEntity | null =
        await this.GetAreaByIdUsecase.execute(areaId);

      if (!existingArea) {
        // If area is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert areaData from AreaModel to AreaEntity using AreaMapper
      const updatedAreaEntity: AreaEntity = AreaMapper.toEntity(
        areaData,
        true,
        existingArea
      );

      // Call the UpdateAreaUsecase to update the Area
      const updatedArea: AreaEntity = await this.UpdateAreaUsecase.execute(
        areaId,
        updatedAreaEntity
      );

      // Convert updatedArea from AreaEntity to plain JSON object using AreaMapper
      const responseData = AreaMapper.toModel(updatedArea);

      // Send the updated area as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAllAreas(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllAreasUsecase to get all Areas
      const areas: AreaEntity[] = await this.GetAllAreasUsecase.execute();

      // Convert Areas from an array of AreaEntity to an array of plain JSON objects using AreaMapper
      const responseData = areas.map((area) => AreaMapper.toModel(area));

      // Send the areas as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }
}
