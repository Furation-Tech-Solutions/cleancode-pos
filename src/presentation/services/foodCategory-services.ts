import { NextFunction, Request, Response } from "express";
import { FoodCategoryModel, FoodCategoryEntity, FoodCategoryMapper } from "@domain/foodCategory/entities/foodCategory";
import { CreateFoodCategoryUsecase } from "@domain/foodCategory/usecases/create-foodCategory";
import { DeleteFoodCategoryUsecase } from "@domain/foodCategory/usecases/delete-foodCategory";
import { GetFoodCategoryByIdUsecase } from "@domain/foodCategory/usecases/get-foodCategory-by-id";
import { UpdateFoodCategoryUsecase } from "@domain/foodCategory/usecases/update-foodCategory";
import { GetAllFoodCategorysUsecase } from "@domain/foodCategory/usecases/get-all-foodCategorys";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export class FoodCategoryService {
  private readonly createFoodCategoryUsecase: CreateFoodCategoryUsecase;
  private readonly deleteFoodCategoryUsecase: DeleteFoodCategoryUsecase;
  private readonly getFoodCategoryByIdUsecase: GetFoodCategoryByIdUsecase;
  private readonly updateFoodCategoryUsecase: UpdateFoodCategoryUsecase;
  private readonly getAllFoodCategorysUsecase: GetAllFoodCategorysUsecase;

  constructor(
    createFoodCategoryUsecase: CreateFoodCategoryUsecase,
    deleteFoodCategoryUsecase: DeleteFoodCategoryUsecase,
    getFoodCategoryByIdUsecase: GetFoodCategoryByIdUsecase,
    updateFoodCategoryUsecase: UpdateFoodCategoryUsecase,
    getAllFoodCategorysUsecase: GetAllFoodCategorysUsecase
  ) {
    this.createFoodCategoryUsecase = createFoodCategoryUsecase;
    this.deleteFoodCategoryUsecase = deleteFoodCategoryUsecase;
    this.getFoodCategoryByIdUsecase = getFoodCategoryByIdUsecase;
    this.updateFoodCategoryUsecase = updateFoodCategoryUsecase;
    this.getAllFoodCategorysUsecase = getAllFoodCategorysUsecase;
  }

  async createFoodCategory(req: Request, res: Response): Promise<void> {
    // Extract FoodCategory data from the request body and convert it to FoodCategoryModel    
    const foodCategoryData: FoodCategoryModel = FoodCategoryMapper.toModel(req.body);

    // Call the createFoodCategoryUsecase to create the FoodCategory
    const newFoodCategory: Either<ErrorClass, FoodCategoryEntity> = await this.createFoodCategoryUsecase.execute(
      foodCategoryData
    );

    newFoodCategory.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: FoodCategoryEntity) =>{
        const responseData = FoodCategoryMapper.toEntity(result, true);
        return res.json(responseData)
      }
    )
  }

  async deleteFoodCategory(req: Request, res: Response): Promise<void> {
      const foodCategoryId: string = req.params.foodCategoryId;
      // const foodCategoryData: FoodCategoryModel = req.body;
    

      const updatedFoodCategoryEntity: FoodCategoryEntity = FoodCategoryMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateFoodCategoryUsecase to update the FoodCategory
      const updatedFoodCategory: Either<ErrorClass, FoodCategoryEntity> = await this.updateFoodCategoryUsecase.execute(
        foodCategoryId,
        updatedFoodCategoryEntity
      );

      updatedFoodCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodCategoryEntity) =>{
          const responseData = FoodCategoryMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getFoodCategoryById(req: Request, res: Response): Promise<void> {
      const foodCategoryId: string = req.params.foodCategoryId;

      // Call the GetFoodCategoryByIdUsecase to get the foodCategory by ID
      const foodCategory: Either<ErrorClass, FoodCategoryEntity | null> = await this.getFoodCategoryByIdUsecase.execute(
        foodCategoryId
      );

      foodCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodCategoryEntity | null) =>{
          const responseData = FoodCategoryMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateFoodCategory(req: Request, res: Response): Promise<void> {
      const foodCategoryId: string = req.params.foodCategoryId;
      const foodCategoryData: FoodCategoryModel = req.body;

      // Get the existing FoodCategory by ID
      const existingFoodCategory: Either<ErrorClass, FoodCategoryEntity | null> =
        await this.getFoodCategoryByIdUsecase.execute(foodCategoryId);

      if (!existingFoodCategory) {
        // If foodCategory is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert foodCategoryData from FoodCategoryModel to FoodCategoryEntity using FoodCategoryMapper
      const updatedFoodCategoryEntity: FoodCategoryEntity = FoodCategoryMapper.toEntity(
        foodCategoryData,
        true,
        // existingFoodCategory
      );

      // Call the UpdateFoodCategoryUsecase to update the FoodCategory
      const updatedFoodCategory: Either<ErrorClass, FoodCategoryEntity> = await this.updateFoodCategoryUsecase.execute(
        foodCategoryId,
        updatedFoodCategoryEntity
      );

      updatedFoodCategory.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: FoodCategoryEntity) =>{
          const responseData = FoodCategoryMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }


  async getAllFoodCategorys(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Call the GetAllFoodCategorysUsecase to get all foodCategorys
    const foodCategorys: Either<ErrorClass, FoodCategoryEntity[]> = await this.getAllFoodCategorysUsecase.execute();

    foodCategorys.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: FoodCategoryEntity[]) => {
            // Filter out foodCategorys with del_status set to "Deleted"
            const nonDeletedFoodCategorys = result.filter((foodCategory) => foodCategory.del_status !== false);

            // Convert non-deleted foodCategorys from an array of FoodCategoryEntity to an array of plain JSON objects using FoodCategoryMapper
            const responseData = nonDeletedFoodCategorys.map((foodCategory) => FoodCategoryMapper.toEntity(foodCategory));
            return res.json(responseData);
        }
    );
}

}