import { NextFunction, Request, Response } from "express";
import {
  FoodMenuModel,
  FoodMenuEntity,
  FoodMenuMapper,
} from "@domain/foodMenu/entities/foodMenu";
import { CreateFoodMenuUsecase } from "@domain/foodMenu/usecases/create-foodMenu";
import { DeleteFoodMenuUsecase } from "@domain/foodMenu/usecases/delete-foodMenu";
import { GetFoodMenuByIdUsecase } from "@domain/foodMenu/usecases/get-foodMenu-by-id";
import { UpdateFoodMenuUsecase } from "@domain/foodMenu/usecases/update-foodMenu";
import { GetAllFoodMenusUsecase } from "@domain/foodMenu/usecases/get-all-foodMenus";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class FoodMenuService {
  private readonly createFoodMenuUsecase: CreateFoodMenuUsecase;
  private readonly deleteFoodMenuUsecase: DeleteFoodMenuUsecase;
  private readonly getFoodMenuByIdUsecase: GetFoodMenuByIdUsecase;
  private readonly updateFoodMenuUsecase: UpdateFoodMenuUsecase;
  private readonly getAllFoodMenusUsecase: GetAllFoodMenusUsecase;

  constructor(
    createFoodMenuUsecase: CreateFoodMenuUsecase,
    deleteFoodMenuUsecase: DeleteFoodMenuUsecase,
    getFoodMenuByIdUsecase: GetFoodMenuByIdUsecase,
    updateFoodMenuUsecase: UpdateFoodMenuUsecase,
    getAllFoodMenusUsecase: GetAllFoodMenusUsecase
  ) {
    this.createFoodMenuUsecase = createFoodMenuUsecase;
    this.deleteFoodMenuUsecase = deleteFoodMenuUsecase;
    this.getFoodMenuByIdUsecase = getFoodMenuByIdUsecase;
    this.updateFoodMenuUsecase = updateFoodMenuUsecase;
    this.getAllFoodMenusUsecase = getAllFoodMenusUsecase;
  }

  async createFoodMenu(req: Request, res: Response): Promise<void> {
      
      // Extract foodMenu data from the request body and convert it to FoodMenuModel
      const foodMenuData: FoodMenuModel = FoodMenuMapper.toModel(req.body);

      // Call the createFoodMenuUsecase to create the foodMenu
      const newFoodMenu: Either<ErrorClass, FoodMenuEntity> = await this.createFoodMenuUsecase.execute(
        foodMenuData
      );

      newFoodMenu.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodMenuEntity) =>{
          const responseData = FoodMenuMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteFoodMenu(req: Request, res: Response): Promise<void> {
    
      const foodMenuId: string = req.params.foodMenuId;
    

      const updatedFoodMenuEntity: FoodMenuEntity = FoodMenuMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateFoodMenuUsecase to update the foodMenu
      const updatedFoodMenu: Either<ErrorClass, FoodMenuEntity> = await this.updateFoodMenuUsecase.execute(
        foodMenuId,
        updatedFoodMenuEntity
      );

      updatedFoodMenu.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodMenuEntity) =>{
          const responseData = FoodMenuMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getFoodMenuById(req: Request, res: Response): Promise<void> {
      const foodMenuId: string = req.params.foodMenuId;

      // Call the GetFoodMenuByIdUsecase to get the foodMenu by ID
      const foodMenu: Either<ErrorClass, FoodMenuEntity | null> = await this.getFoodMenuByIdUsecase.execute(
        foodMenuId
      );

      foodMenu.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodMenuEntity | null) =>{
          const responseData = FoodMenuMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateFoodMenu(req: Request, res: Response): Promise<void> {
    
      const foodMenuId: string = req.params.foodMenuId;
      const foodMenuData: FoodMenuModel = req.body;

      // Get the existing foodMenu by ID
      const existingFoodMenu: Either<ErrorClass, FoodMenuEntity | null> =
        await this.getFoodMenuByIdUsecase.execute(foodMenuId);

      if (!existingFoodMenu) {
        // If foodMenu is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert foodMenuData from FoodMenuModel to FoodMenuEntity using FoodMenuMapper
      const updatedFoodMenuEntity: FoodMenuEntity = FoodMenuMapper.toEntity(
        foodMenuData,
        true,
      );

      // Call the UpdateFoodMenuUsecase to update the foodMenu
      const updatedFoodMenu: Either<ErrorClass, FoodMenuEntity> = await this.updateFoodMenuUsecase.execute(
        foodMenuId,
        updatedFoodMenuEntity
      );

      updatedFoodMenu.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodMenuEntity) =>{
          const responseData = FoodMenuMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllFoodMenus(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllFoodMenusUsecase to get all foodMenus
      const foodMenus: Either<ErrorClass, FoodMenuEntity[]> = await this.getAllFoodMenusUsecase.execute();

      foodMenus.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: FoodMenuEntity[]) => {
            // Filter out foodMenus with del_status set to "Deleted"
            const nonDeletedFoodMenus = result.filter((foodMenu) => foodMenu.del_status !== false);

            // Convert non-deleted foodMenus from an array of FoodMenuEntity to an array of plain JSON objects using FoodMenuMapper
            const responseData = nonDeletedFoodMenus.map((foodMenu) => FoodMenuMapper.toEntity(foodMenu));
            return res.json(responseData);
        }
    );
  }
}
