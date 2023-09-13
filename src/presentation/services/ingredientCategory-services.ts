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
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

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
      // Extract IngredientCategory data from the request body and convert it to IngredientCategoryModel
      const ingredientCategoryData: IngredientCategoryModel = IngredientCategoryMapper.toModel(req.body);

      // Call the CreateIngredientCategoryUsecase to create the ingredientCategory
      const newIngredientCategory: Either<ErrorClass, IngredientCategoryEntity> = await this.createIngredientCategoryUsecase.execute(
        ingredientCategoryData
      );

      newIngredientCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientCategoryEntity) =>{
          const responseData = IngredientCategoryMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteIngredientCategory(req: Request, res: Response): Promise<void> {
      const ingredientCategoryId: string = req.params.ingredientCategoryId;

      // Call the DeleteIngredientCategoryUsecase to delete the ingredientCategory
      const updatedIngredientCategoryEntity: IngredientCategoryEntity = IngredientCategoryMapper.toEntity(
        { del_status: false },
        true
      );

      // Call the UpdateIngredientCategoryUsecase to update the ingredientCategory
      const updatedIngredientCategory: Either<ErrorClass, IngredientCategoryEntity> = await this.updateIngredientCategoryUsecase.execute(
        ingredientCategoryId,
        updatedIngredientCategoryEntity
      );

      updatedIngredientCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientCategoryEntity) =>{
          const responseData = IngredientCategoryMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getIngredientCategoryById(req: Request, res: Response): Promise<void> {
      const ingredientCategoryId: string = req.params.ingredientCategoryId;

      // Call the GetIngredientCategoryByIdUsecase to get the ingredientCategory by ID
      const ingredientCategory: Either<ErrorClass, IngredientCategoryEntity | null> = await this.getIngredientCategoryByIdUsecase.execute(
        ingredientCategoryId
      );

      ingredientCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientCategoryEntity | null) =>{
          const responseData = IngredientCategoryMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateIngredientCategory(req: Request, res: Response): Promise<void> {
      const ingredientCategoryId: string = req.params.ingredientCategoryId;
      const ingredientCategoryData: IngredientCategoryModel = req.body;

      // Get the existing IngredientCategory by ID
      const existingIngredientCategory: Either<ErrorClass, IngredientCategoryEntity | null> =
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
        // existingIngredientCategory
      );

      // Call the UpdateIngredientCategoryUsecase to update the ingredientCategory
      const updatedIngredientCategory: Either<ErrorClass, IngredientCategoryEntity> = await this.updateIngredientCategoryUsecase.execute(
        ingredientCategoryId,
        updatedIngredientCategoryEntity
      );

      updatedIngredientCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: IngredientCategoryEntity) =>{
          const responseData = IngredientCategoryMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllIngredientCategorys(req: Request, res: Response, next:NextFunction): Promise<void> {
      // Call the GetAllIngredientCategorysUsecase to get all ingredientCategorys
      const ingredientCategorys: Either<ErrorClass, IngredientCategoryEntity[]> = await this.getAllIngredientCategorysUsecase.execute();

      ingredientCategorys.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: IngredientCategoryEntity[]) => {
          // Filter out tables with del_status set to "Deleted"
          const nonDeletedIngredientCategory = result.filter((ingredientCategory) => ingredientCategory.del_status !== false);

          // Convert tables from an array of TableEntity to an array of plain JSON objects using TableMapper
          const responseData = nonDeletedIngredientCategory.map((IngredientCategory) => IngredientCategoryMapper.toEntity(IngredientCategory));
          return res.json(responseData);
        }
      );
  }
}