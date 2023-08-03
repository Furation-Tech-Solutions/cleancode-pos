import { NextFunction, Request, Response } from "express";
import {
  IngredientUnitModel,
  IngredientUnitEntity,
  IngredientUnitMapper,
} from "@domain/ingredientUnit/entities/ingredientUnit";
import { CreateIngredientUnitUsecase } from "@domain/ingredientUnit/usecases/create-ingredientUnit";
import { DeleteIngredientUnitUsecase } from "@domain/ingredientUnit/usecases/delete-ingredientUnit";
import { GetIngredientUnitByIdUsecase } from "@domain/ingredientUnit/usecases/get-ingredientUnit-by-id";
import { UpdateIngredientUnitUsecase } from "@domain/ingredientUnit/usecases/update-ingredientUnit";
import { GetAllIngredientUnitsUsecase } from "@domain/ingredientUnit/usecases/get-all-ingredientUnits";
import ApiError from "@presentation/error-handling/api-error";

export class IngredientUnitService {
  private readonly createIngredientUnitUsecase: CreateIngredientUnitUsecase;
  private readonly deleteIngredientUnitUsecase: DeleteIngredientUnitUsecase;
  private readonly getIngredientUnitByIdUsecase: GetIngredientUnitByIdUsecase;
  private readonly updateIngredientUnitUsecase: UpdateIngredientUnitUsecase;
  private readonly getAllIngredientUnitsUsecase: GetAllIngredientUnitsUsecase;

  constructor(
    createIngredientUnitUsecase: CreateIngredientUnitUsecase,
    deleteIngredientUnitUsecase: DeleteIngredientUnitUsecase,
    getIngredientUnitByIdUsecase: GetIngredientUnitByIdUsecase,
    updateIngredientUnitUsecase: UpdateIngredientUnitUsecase,
    getAllIngredientUnitsUsecase: GetAllIngredientUnitsUsecase
  ) {
    this.createIngredientUnitUsecase = createIngredientUnitUsecase;
    this.deleteIngredientUnitUsecase = deleteIngredientUnitUsecase;
    this.getIngredientUnitByIdUsecase = getIngredientUnitByIdUsecase;
    this.updateIngredientUnitUsecase = updateIngredientUnitUsecase;
    this.getAllIngredientUnitsUsecase = getAllIngredientUnitsUsecase;
  }

  
  async createIngredientUnit(req: Request, res: Response): Promise<void> {
    try {
      
      // Extract ingredientUnit data from the request body and convert it to IngredientUnitModel
      const ingredientUnitData: IngredientUnitModel = IngredientUnitMapper.toModel(req.body);

      // Call the CreateIngredientUnitUsecase to create the ingredientUnit
      const newIngredientUnit: IngredientUnitEntity = await this.createIngredientUnitUsecase.execute(
        ingredientUnitData
      );

      // Convert newIngredientUnit from IngredientUnitEntity to the desired format using IngredientUnitMapper
      const responseData = IngredientUnitMapper.toEntity(newIngredientUnit, true);

      // Send the created ingredientUnit as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

         ApiError.internalError()
    }
  }

  async deleteIngredientUnit(req: Request, res: Response): Promise<void> {
    try {
      const ingredientUnitId: string = req.params.ingredientUnitId;

      const updatedIngredientUnitEntity: IngredientUnitEntity = IngredientUnitMapper.toEntity(
        { del_status: "Deleted" },
        true,
      );

      // Call the UpdateIngredientUnitUsecase to update the ingredientUnit
      const updatedIngredientUnit: IngredientUnitEntity = await this.updateIngredientUnitUsecase.execute(
        ingredientUnitId,
        updatedIngredientUnitEntity
      );

      // Convert updatedIngredientUnit from IngredientUnitEntity to plain JSON object using IngredientUnitMapper
      const responseData = IngredientUnitMapper.toModel(updatedIngredientUnit);

      // Send a success message as a JSON response
      res.json({ message: "IngredientUnit deleted successfully." });
    } catch (error) {

      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError();
    }
  }

  async getIngredientUnitById(req: Request, res: Response): Promise<void> {
    try {
      const ingredientUnitId: string = req.params.ingredientUnitId;

      // Call the GetIngredientUnitByIdUsecase to get the ingredientUnit by ID
      const ingredientUnit: IngredientUnitEntity | null = await this.getIngredientUnitByIdUsecase.execute(
        ingredientUnitId
      );

      if (ingredientUnit) {
        // Convert ingredientUnit from IngredientUnitEntity to plain JSON object using IngredientUnitMapper
        const responseData = IngredientUnitMapper.toModel(ingredientUnit);

        // Send the ingredientUnit as a JSON response
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

  async updateIngredientUnit(req: Request, res: Response): Promise<void> {
    try {
      const ingredientUnitId: string = req.params.ingredientUnitId;
      const ingredientUnitData: IngredientUnitModel = req.body;

      // Get the existing ingredientUnit by ID
      const existingIngredientUnit: IngredientUnitEntity | null =
        await this.getIngredientUnitByIdUsecase.execute(ingredientUnitId);

      if (!existingIngredientUnit) {
        // If ingredientUnit is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert ingredientUnitData from IngredientUnitModel to IngredientUnitEntity using IngredientUnitMapper
      const updatedIngredientUnitEntity: IngredientUnitEntity = IngredientUnitMapper.toEntity(
        ingredientUnitData,
        true,
        existingIngredientUnit
      );

      // Call the UpdateIngredientUnitUsecase to update the ingredientUnit
      const updatedIngredientUnit: IngredientUnitEntity = await this.updateIngredientUnitUsecase.execute(
        ingredientUnitId,
        updatedIngredientUnitEntity
      );

      // Convert updatedIngredientUnit from IngredientUnitEntity to plain JSON object using IngredientUnitMapper
      const responseData = IngredientUnitMapper.toModel(updatedIngredientUnit);

      // Send the updated ingredientUnit as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAllIngredientUnits(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllIngredientUnitsUsecase to get all ingredientUnits
      const ingredientUnits: IngredientUnitEntity[] = await this.getAllIngredientUnitsUsecase.execute();

      // Convert ingredientUnits from an array of IngredientUnitEntity to an array of plain JSON objects using IngredientUnitMapper
      const responseData = ingredientUnits.map((ingredientUnit) => IngredientUnitMapper.toModel(ingredientUnit));

      // Send the ingredientUnits as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }
}