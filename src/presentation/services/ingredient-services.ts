import { NextFunction, Request, Response } from "express";
import {
  IngredientModel,
  IngredientEntity,
  IngredientMapper,
} from "@domain/ingredient/entities/ingredient";
import { CreateIngredientUsecase } from "@domain/ingredient/usecases/create-ingredient";
import { DeleteIngredientUsecase } from "@domain/ingredient/usecases/delete-ingredient";
import { GetIngredientByIdUsecase } from "@domain/ingredient/usecases/get-ingredient-by-id";
import { UpdateIngredientUsecase } from "@domain/ingredient/usecases/update-ingredient";
import { GetAllIngredientsUsecase } from "@domain/ingredient/usecases/get-all-ingredients";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class IngredientService {
  private readonly createIngredientUsecase: CreateIngredientUsecase;
  private readonly deleteIngredientUsecase: DeleteIngredientUsecase;
  private readonly getIngredientByIdUsecase: GetIngredientByIdUsecase;
  private readonly updateIngredientUsecase: UpdateIngredientUsecase;
  private readonly getAllIngredientsUsecase: GetAllIngredientsUsecase;

  constructor(
    createIngredientUsecase: CreateIngredientUsecase,
    deleteIngredientUsecase: DeleteIngredientUsecase,
    getIngredientByIdUsecase: GetIngredientByIdUsecase,
    updateIngredientUsecase: UpdateIngredientUsecase,
    getAllIngredientsUsecase: GetAllIngredientsUsecase
  ) {
    this.createIngredientUsecase = createIngredientUsecase;
    this.deleteIngredientUsecase = deleteIngredientUsecase;
    this.getIngredientByIdUsecase = getIngredientByIdUsecase;
    this.updateIngredientUsecase = updateIngredientUsecase;
    this.getAllIngredientsUsecase = getAllIngredientsUsecase;
  }

  
  async createIngredient(req: Request, res: Response): Promise<void> {
      
      // Extract Ingredient data from the request body and convert it to IngredientModel
      const ingredientData: IngredientModel = IngredientMapper.toModel(req.body);

      // Call the CreateIngredientUsecase to create the Ingredient
      const newIngredient: Either<ErrorClass, IngredientEntity> = await this.createIngredientUsecase.execute(
        ingredientData
      );

      newIngredient.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientEntity) =>{
          const responseData = IngredientMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteIngredient(req: Request, res: Response): Promise<void> {
      const ingredientId: string = req.params.ingredientId;

      // Call the DeleteIngredientUsecase to delete the ingredient
      const updatedIngredientEntity: IngredientEntity = IngredientMapper.toEntity(
        { del_status: false },
        true
      );

      // Call the UpdateIngredientUsecase to update the ingredient
      const updatedIngredient: Either<ErrorClass, IngredientEntity> = await this.updateIngredientUsecase.execute(
        ingredientId,
        updatedIngredientEntity
      );

      updatedIngredient.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientEntity) =>{
          const responseData = IngredientMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getIngredientById(req: Request, res: Response): Promise<void> {
      const ingredientId: string = req.params.ingredientId;

      // Call the GetIngredientByIdUsecase to get the Ingredient by ID
      const ingredient: Either<ErrorClass, IngredientEntity | null> = await this.getIngredientByIdUsecase.execute(
        ingredientId
      );

      ingredient.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientEntity | null) =>{
          const responseData = IngredientMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
        
  }

  async updateIngredient(req: Request, res: Response): Promise<void> {
      const ingredientId: string = req.params.ingredientId;
      const ingredientData: IngredientModel = req.body;

      // Get the existing Ingredient by ID
      const existingIngredient: Either<ErrorClass, IngredientEntity | null> =
        await this.getIngredientByIdUsecase.execute(ingredientId);

      if (!existingIngredient) {
        // If ingredient is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert IngredientData from IngredientModel to IngredientEntity using IngredientMapper
      const updatedIngredientEntity: IngredientEntity = IngredientMapper.toEntity(
        ingredientData,
        true,
        // existingIngredient
      );

      // Call the UpdateIngredientUsecase to update the ingredient
      const updatedIngredient:  Either<ErrorClass, IngredientEntity> = await this.updateIngredientUsecase.execute(
        ingredientId,
        updatedIngredientEntity
      );

      updatedIngredient.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientEntity) =>{
          const responseData = IngredientMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllIngredients(req: Request, res: Response, next:NextFunction): Promise<void> {
      // Call the GetAllIngredientsUsecase to get all ingredients
      const ingredients: Either<ErrorClass, IngredientEntity[]> = await this.getAllIngredientsUsecase.execute();

      ingredients.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: IngredientEntity[]) => {
          // Filter out tables with del_status set to "Deleted"
          const nonDeletedIngredient = result.filter((ingredient) => ingredient.del_status !== false);

          // Convert tables from an array of TableEntity to an array of plain JSON objects using TableMapper
          const responseData = nonDeletedIngredient.map((Ingredient) => IngredientMapper.toEntity(Ingredient));
          return res.json(responseData);
        }
      )
  }
}