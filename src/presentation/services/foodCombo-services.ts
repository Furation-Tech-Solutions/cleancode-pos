import { NextFunction, Request, Response } from "express";
import {
  FoodComboModel,
  FoodComboEntity,
  FoodComboMapper,
} from "@domain/foodCombo/entities/foodCombo";
import { CreateFoodComboUsecase } from "@domain/foodCombo/usecases/create-foodCombo";
import { DeleteFoodComboUsecase } from "@domain/foodCombo/usecases/delete-foodCombo";
import { GetFoodComboByIdUsecase } from "@domain/foodCombo/usecases/get-foodCombo-by-id";
import { UpdateFoodComboUsecase } from "@domain/foodCombo/usecases/update-foodCombo";
import { GetAllFoodCombosUsecase } from "@domain/foodCombo/usecases/get-all-foodCombos";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class FoodComboService {
  private readonly createFoodComboUsecase: CreateFoodComboUsecase;
  private readonly deleteFoodComboUsecase: DeleteFoodComboUsecase;
  private readonly getFoodComboByIdUsecase: GetFoodComboByIdUsecase;
  private readonly updateFoodComboUsecase: UpdateFoodComboUsecase;
  private readonly getAllFoodCombosUsecase: GetAllFoodCombosUsecase;

  constructor(
    createFoodComboUsecase: CreateFoodComboUsecase,
    deleteFoodComboUsecase: DeleteFoodComboUsecase,
    getFoodComboByIdUsecase: GetFoodComboByIdUsecase,
    updateFoodComboUsecase: UpdateFoodComboUsecase,
    getAllFoodCombosUsecase: GetAllFoodCombosUsecase
  ) {
    this.createFoodComboUsecase = createFoodComboUsecase;
    this.deleteFoodComboUsecase = deleteFoodComboUsecase;
    this.getFoodComboByIdUsecase = getFoodComboByIdUsecase;
    this.updateFoodComboUsecase = updateFoodComboUsecase;
    this.getAllFoodCombosUsecase = getAllFoodCombosUsecase;
  }

  async createFoodCombo(req: Request, res: Response): Promise<void> {
      
      // Extract foodCombo data from the request body and convert it to FoodComboModel
      const foodComboData: FoodComboModel = FoodComboMapper.toModel(req.body);

      // Call the createFoodComboUsecase to create the foodCombo
      const newFoodCombo: Either<ErrorClass, FoodComboEntity> = await this.createFoodComboUsecase.execute(
        foodComboData
      );

      newFoodCombo.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodComboEntity) =>{
          const responseData = FoodComboMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteFoodCombo(req: Request, res: Response): Promise<void> {
    
      const foodComboId: string = req.params.foodComboId;
    

      const updatedFoodComboEntity: FoodComboEntity = FoodComboMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateFoodComboUsecase to update the foodCombo
      const updatedFoodCombo: Either<ErrorClass, FoodComboEntity> = await this.updateFoodComboUsecase.execute(
        foodComboId,
        updatedFoodComboEntity
      );

      updatedFoodCombo.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodComboEntity) =>{
          const responseData = FoodComboMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getFoodComboById(req: Request, res: Response): Promise<void> {
      const foodComboId: string = req.params.foodComboId;

      // Call the GetFoodComboByIdUsecase to get the foodCombo by ID
      const foodCombo: Either<ErrorClass, FoodComboEntity | null> = await this.getFoodComboByIdUsecase.execute(
        foodComboId
      );

      foodCombo.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodComboEntity | null) =>{
          const responseData = FoodComboMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateFoodCombo(req: Request, res: Response): Promise<void> {
    
      const foodComboId: string = req.params.foodComboId;
      const foodComboData: FoodComboModel = req.body;

      // Get the existing foodCombo by ID
      const existingFoodCombo: Either<ErrorClass, FoodComboEntity | null> =
        await this.getFoodComboByIdUsecase.execute(foodComboId);

      if (!existingFoodCombo) {
        // If foodCombo is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert foodComboData from FoodComboModel to FoodComboEntity using FoodComboMapper
      const updatedFoodComboEntity: FoodComboEntity = FoodComboMapper.toEntity(
        foodComboData,
        true,
      );

      // Call the UpdateFoodComboUsecase to update the foodCombo
      const updatedFoodCombo: Either<ErrorClass, FoodComboEntity> = await this.updateFoodComboUsecase.execute(
        foodComboId,
        updatedFoodComboEntity
      );

      updatedFoodCombo.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodComboEntity) =>{
          const responseData = FoodComboMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllFoodCombos(req: Request, res: Response): Promise<void> {
    
      // Call the GetAllFoodCombosUsecase to get all foodCombos
      const foodCombos: Either<ErrorClass, FoodComboEntity[]> = await this.getAllFoodCombosUsecase.execute();

      foodCombos.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: FoodComboEntity[]) => {
            // Filter out foodCombos with del_status set to "Deleted"
            const nonDeletedFoodCombos = result.filter((foodCombo) => foodCombo.del_status !== false);

            // Convert non-deleted foodCombos from an array of FoodComboEntity to an array of plain JSON objects using FoodComboMapper
            const responseData = nonDeletedFoodCombos.map((foodCombo) => FoodComboMapper.toModel(foodCombo));
            return res.json(responseData);
        }
    );
  }
}
