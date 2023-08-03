import { NextFunction, Request, Response } from "express";
import {
  IngredientCategoryModel,
  IngredientCategoryEntity,
  IngredientCategoryMapper,
} from "@domain/ingredientCategory/entities/ingredientCategory";
import { CreateIngredientCategoryUsecase } from "@domain/ingredientCategory/usecases/create-ingredientCategory";
import { DeleteIngredientCategoryUsecase } from "@domain/ingredientCategory/usecases/delete-ingredientCategory";
import { GetIngredientCategoryByIdUsecase } from "@domain/ingredientCategory/usecases/get-ingredientCategory-by-id";
import { UpdateIngredientCategoryUsecase } from "@domain/ingredientCategory/usecases/update-ingredientCategory";
import { GetAllIngredientCategorysUsecase } from "@domain/ingredientCategory/usecases/get-all-ingredientCategorys";
import ApiError from "@presentation/error-handling/api-error";

export class IngredientCategoryService {
  private readonly createIngredientCategoryUsecase: CreateIngredientCategoryUsecase;
  private readonly deleteIngredientCategoryUsecase: DeleteIngredientCategoryUsecase;
  private readonly getIngredientCategoryByIdUsecase: GetIngredientCategoryByIdUsecase;
  private readonly updateIngredientCategoryUsecase: UpdateIngredientCategoryUsecase;
  private readonly getAllIngredientCategorysUsecase: GetAllIngredientCategorysUsecase;

  constructor(
    createIngredientCategoryUsecase: CreateIngredientCategoryUsecase,
    deleteIngredientCategoryUsecase: DeleteIngredientCategoryUsecase,
    getIngredientCategoryByIdUsecase: GetIngredientCategoryByIdUsecase,
    updateIngredientCategoryUsecase: UpdateIngredientCategoryUsecase,
    getAllIngredientCategorysUsecase: GetAllIngredientCategorysUsecase
  ) {
    this.createIngredientCategoryUsecase = createIngredientCategoryUsecase;
    this.deleteIngredientCategoryUsecase = deleteIngredientCategoryUsecase;
    this.getIngredientCategoryByIdUsecase = getIngredientCategoryByIdUsecase;
    this.updateIngredientCategoryUsecase = updateIngredientCategoryUsecase;
    this.getAllIngredientCategorysUsecase = getAllIngredientCategorysUsecase;
  }

  
  async createIngredientCategory(req: Request, res: Response): Promise<void> {
    try {
      
      // Extract IngredientCategory data from the request body and convert it to IngredientCategoryModel
      const ingredientCategoryData: IngredientCategoryModel = IngredientCategoryMapper.toModel(req.body);

      // Call the CreateIngredientCategoryUsecase to create the ingredientCategory
      const newIngredientCategory: IngredientCategoryEntity = await this.createIngredientCategoryUsecase.execute(
        ingredientCategoryData
      );

      // Convert newIngredientCategory from IngredientCategoryEntity to the desired format using IngredientCategoryMapper
      const responseData = IngredientCategoryMapper.toEntity(newIngredientCategory, true);

      // Send the created ingredientCategory as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

         ApiError.internalError()
    }
  }

  async deleteIngredientCategory(req: Request, res: Response): Promise<void> {
    try {
      const ingredientCategoryId: string = req.params.ingredientCategoryId;

      // Call the DeleteIngredientCategoryUsecase to delete the ingredientCategory
      await this.deleteIngredientCategoryUsecase.execute(ingredientCategoryId);

      // Send a success message as a JSON response
      res.json({ message: "IngredientCategory deleted successfully." });
    } catch (error) {

      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError();
    }
  }

  async getIngredientCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const ingredientCategoryId: string = req.params.ingredientCategoryId;

      // Call the GetIngredientCategoryByIdUsecase to get the ingredientCategory by ID
      const ingredientCategory: IngredientCategoryEntity | null = await this.getIngredientCategoryByIdUsecase.execute(
        ingredientCategoryId
      );

      if (ingredientCategory) {
        // Convert ingredientCategory from IngredientCategoryEntity to plain JSON object using IngredientCategoryMapper
        const responseData = IngredientCategoryMapper.toModel(ingredientCategory);

        // Send the ingredientCategory as a JSON response
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

  async updateIngredientCategory(req: Request, res: Response): Promise<void> {
    try {
      const ingredientCategoryId: string = req.params.ingredientCategoryId;
      const ingredientCategoryData: IngredientCategoryModel = req.body;

      // Get the existing IngredientCategory by ID
      const existingIngredientCategory: IngredientCategoryEntity | null =
        await this.getIngredientCategoryByIdUsecase.execute(ingredientCategoryId);

      if (!existingIngredientCategory) {
        // If ingredientCategory is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert ingredientCategoryData from IngredientCategoryModel to IngredientCategoryEntity using IngredientCategoryMapper
      const updatedIngredientCategoryEntity: IngredientCategoryEntity = IngredientCategoryMapper.toEntity(
        ingredientCategoryData,
        true,
        existingIngredientCategory
      );

      // Call the UpdateIngredientCategoryUsecase to update the ingredientCategory
      const updatedIngredientCategory: IngredientCategoryEntity = await this.updateIngredientCategoryUsecase.execute(
        ingredientCategoryId,
        updatedIngredientCategoryEntity
      );

      // Convert updatedIngredientCategory from IngredientCategoryEntity to plain JSON object using IngredientCategoryMapper
      const responseData = IngredientCategoryMapper.toModel(updatedIngredientCategory);

      // Send the updated ingredientCategory as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAllIngredientCategorys(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllIngredientCategorysUsecase to get all ingredientCategorys
      const ingredientCategorys: IngredientCategoryEntity[] = await this.getAllIngredientCategorysUsecase.execute();

      // Convert ingredientCategorys from an array of IngredientCategoryEntity to an array of plain JSON objects using IngredientCategoryMapper
      const responseData = ingredientCategorys.map((ingredientCategory) => IngredientCategoryMapper.toModel(ingredientCategory));

      // Send the ingredientCategorys as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }
}