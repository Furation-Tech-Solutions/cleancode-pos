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
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

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
      // Extract ingredientUnit data from the request body and convert it to IngredientUnitModel
      const ingredientUnitData: IngredientUnitModel = IngredientUnitMapper.toModel(req.body);

      // Call the CreateIngredientUnitUsecase to create the ingredientUnit
      const newIngredientUnit: Either<ErrorClass, IngredientUnitEntity> = await this.createIngredientUnitUsecase.execute(
        ingredientUnitData
      );

      newIngredientUnit.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientUnitEntity) =>{
          const responseData = IngredientUnitMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteIngredientUnit(req: Request, res: Response): Promise<void> {
      const ingredientUnitId: string = req.params.ingredientUnitId;

      const updatedIngredientUnitEntity: IngredientUnitEntity = IngredientUnitMapper.toEntity(
        { del_status: false },
        true,
      );

      // Call the UpdateIngredientUnitUsecase to update the ingredientUnit
      const updatedIngredientUnit: Either<ErrorClass, IngredientUnitEntity> = await this.updateIngredientUnitUsecase.execute(
        ingredientUnitId,
        updatedIngredientUnitEntity
      );

      updatedIngredientUnit.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientUnitEntity) =>{
          const responseData = IngredientUnitMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getIngredientUnitById(req: Request, res: Response): Promise<void> {
      const ingredientUnitId: string = req.params.ingredientUnitId;

      // Call the GetIngredientUnitByIdUsecase to get the ingredientUnit by ID
      const ingredientUnit: Either<ErrorClass, IngredientUnitEntity | null> = await this.getIngredientUnitByIdUsecase.execute(
        ingredientUnitId
      );

      ingredientUnit.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientUnitEntity | null) =>{
          const responseData = IngredientUnitMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateIngredientUnit(req: Request, res: Response): Promise<void> {
      const ingredientUnitId: string = req.params.ingredientUnitId;
      const ingredientUnitData: IngredientUnitModel = req.body;

      // Get the existing ingredientUnit by ID
      const existingIngredientUnit: Either<ErrorClass, IngredientUnitEntity | null> =
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
        // existingIngredientUnit
      );

      // Call the UpdateIngredientUnitUsecase to update the ingredientUnit
      const updatedIngredientUnit: Either<ErrorClass, IngredientUnitEntity> = await this.updateIngredientUnitUsecase.execute(
        ingredientUnitId,
        updatedIngredientUnitEntity
      );

      updatedIngredientUnit.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientUnitEntity) =>{
          const responseData = IngredientUnitMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllIngredientUnits(req: Request, res: Response, next:NextFunction): Promise<void> {
      // Call the GetAllIngredientUnitsUsecase to get all ingredientUnits
      const ingredientUnits: Either<ErrorClass, IngredientUnitEntity[]> = await this.getAllIngredientUnitsUsecase.execute();

      ingredientUnits.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: IngredientUnitEntity[]) => {
          // Filter out tables with del_status set to "Deleted"
          const nonDeletedIngredientUnit = result.filter((ingredientUnit) => ingredientUnit.del_status !== false);
          // Convert tables from an array of TableEntity to an array of plain JSON objects using TableMapper
          const responseData = nonDeletedIngredientUnit.map((ingredientUnit) => IngredientUnitMapper.toEntity(ingredientUnit));
          return res.json(responseData);
        }
      );    ApiError.internalError()
  }
}