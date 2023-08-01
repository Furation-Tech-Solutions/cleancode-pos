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
import { GetAllOutletsUsecase } from "@domain/outlet/usecases/get -all-outlet";
import ApiError from "@presentation/error-handling/api-error";

export class OutletService {
  private readonly CreateOutletUsecase: CreateOutletUsecase;
  private readonly DeleteOutletUsecase: DeleteOutletUsecase;
  private readonly GetOutletByIdUsecase: GetOutletByIdUsecase;
  private readonly UpdateOutletUsecase: UpdateOutletUsecase;
  private readonly GetAllOutletsUsecase: GetAllOutletsUsecase;

  constructor(
    CreateOutletUsecase: CreateOutletUsecase,
    DeleteOutletUsecase: DeleteOutletUsecase,
    GetOutletByIdUsecase: GetOutletByIdUsecase,
    UpdateOutletUsecase: UpdateOutletUsecase,
    GetAllOutletsUsecase: GetAllOutletsUsecase
  ) {
    this.CreateOutletUsecase = CreateOutletUsecase;
    this.DeleteOutletUsecase = DeleteOutletUsecase;
    this.GetOutletByIdUsecase = GetOutletByIdUsecase;
    this.UpdateOutletUsecase = UpdateOutletUsecase;
    this.GetAllOutletsUsecase = GetAllOutletsUsecase;
  }

  async createOutlet(req: Request, res: Response): Promise<void> {
    try {
      
      // Extract outlet data from the request body and convert it to OutletModel
      const outletData: OutletModel = OutletMapper.toModel(req.body);

      // Call the CreateOutletUsecase to create the outlet
      const newOutlet: OutletEntity = await this.CreateOutletUsecase.execute(
        outletData
      );

      // Convert newOutlet from OutletEntity to the desired format using OutletMapper
      const responseData = OutletMapper.toEntity(newOutlet, true);

      // Send the created outlet as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

         ApiError.internalError()
    }
  }

  async deleteOutlet(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;

      // Call the DeleteOutletUsecase to delete the outlet
      await this.DeleteOutletUsecase.execute(outletId);

      // Send a success message as a JSON response
      res.json({ message: "Outlet deleted successfully." });
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getOutletById(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;

      // Call the GetOutletByIdUsecase to get the outlet by ID
      const outlet: OutletEntity | null = await this.GetOutletByIdUsecase.execute(
        outletId
      );

      if (outlet) {
        // Convert outlet from OutletEntity to plain JSON object using OutletMapper
        const responseData = OutletMapper.toModel(outlet);

        // Send the outlet as a JSON response
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

  async updateOutlet(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;
      const outletData: OutletModel = req.body;

      // Get the existing outlet by ID
      const existingOutlet: OutletEntity | null =
        await this.GetOutletByIdUsecase.execute(outletId);

      if (!existingOutlet) {
        // If outlet is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert outletData from OutletModel to OutletEntity using OutletMapper
      const updatedOutletEntity: OutletEntity = OutletMapper.toEntity(
        outletData,
        true,
        existingOutlet
      );

      // Call the UpdateOutletUsecase to update the outlet
      const updatedOutlet: OutletEntity = await this.UpdateOutletUsecase.execute(
        outletId,
        updatedOutletEntity
      );

      // Convert updatedOutlet from OutletEntity to plain JSON object using OutletMapper
      const responseData = OutletMapper.toModel(updatedOutlet);

      // Send the updated outlet as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAllOutlets(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllOutletsUsecase to get all outlets
      const outlets: OutletEntity[] = await this.GetAllOutletsUsecase.execute();

      // Convert outlets from an array of OutletEntity to an array of plain JSON objects using OutletMapper
      const responseData = outlets.map((outlet) => OutletMapper.toModel(outlet));

      // Send the outlets as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }
}
