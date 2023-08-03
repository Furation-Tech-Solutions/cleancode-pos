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
    try {
      
      // Extract Ingredient data from the request body and convert it to IngredientModel
      const ingredientData: IngredientModel = IngredientMapper.toModel(req.body);

      // Call the CreateIngredientUsecase to create the Ingredient
      const newIngredient: IngredientEntity = await this.createIngredientUsecase.execute(
        ingredientData
      );

      // Convert newIngredient from IngredientEntity to the desired format using IngredientMapper
      const responseData = IngredientMapper.toEntity(newIngredient, true);

      // Send the created ingredient as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

         ApiError.internalError()
    }
  }

  async deleteIngredient(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId: string = req.params.ingredientId;

      // Call the DeleteIngredientUsecase to delete the ingredient
      await this.deleteIngredientUsecase.execute(ingredientId);

      // Send a success message as a JSON response
      res.json({ message: "Ingredient deleted successfully." });
    } catch (error) {

      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError();
    }
  }

  async getIngredientById(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId: string = req.params.ingredientId;

      // Call the GetIngredientByIdUsecase to get the Ingredient by ID
      const ingredient: IngredientEntity | null = await this.getIngredientByIdUsecase.execute(
        ingredientId
      );

      if (ingredient) {
        // Convert Ingredient from IngredientEntity to plain JSON object using IngredientMapper
        const responseData = IngredientMapper.toModel(ingredient);

        // Send the Ingredient as a JSON response
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

  async updateIngredient(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId: string = req.params.ingredientId;
      const ingredientData: IngredientModel = req.body;

      // Get the existing Ingredient by ID
      const existingIngredient: IngredientEntity | null =
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
        existingIngredient
      );

      // Call the UpdateIngredientUsecase to update the ingredient
      const updatedIngredient: IngredientEntity = await this.updateIngredientUsecase.execute(
        ingredientId,
        updatedIngredientEntity
      );

      // Convert updatedIngredient from IngredientEntity to plain JSON object using IngredientMapper
      const responseData = IngredientMapper.toModel(updatedIngredient);

      // Send the updated ingredient as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAllIngredients(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllIngredientsUsecase to get all ingredients
      const ingredients: IngredientEntity[] = await this.getAllIngredientsUsecase.execute();

      // Convert ingredients from an array of IngredientEntity to an array of plain JSON objects using IngredientMapper
      const responseData = ingredients.map((ingredient) => IngredientMapper.toModel(ingredient));

      // Send the ingredients as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }
}