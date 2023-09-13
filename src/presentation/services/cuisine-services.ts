import { NextFunction, Request, Response } from "express";
import {
  CuisineModel,
  CuisineEntity,
  CuisineMapper,
} from "@domain/cuisine/entities/cuisine";
import { CreateCuisineUsecase } from "@domain/cuisine/usecases/create-cuisine";
import { DeleteCuisineUsecase } from "@domain/cuisine/usecases/delete-cuisine";
import { GetCuisineByIdUsecase } from "@domain/cuisine/usecases/get-cuisine-by-id";
import { UpdateCuisineUsecase } from "@domain/cuisine/usecases/update-cuisine";
import { GetAllCuisinesUsecase } from "@domain/cuisine/usecases/get-all-cuisine";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class CuisineService {
  private readonly createCuisineUsecase: CreateCuisineUsecase;
  private readonly deleteCuisineUsecase: DeleteCuisineUsecase;
  private readonly getCuisineByIdUsecase: GetCuisineByIdUsecase;
  private readonly updateCuisineUsecase: UpdateCuisineUsecase;
  private readonly getAllCuisinesUsecase: GetAllCuisinesUsecase;

  constructor(
    createCuisineUsecase: CreateCuisineUsecase,
    deleteCuisineUsecase: DeleteCuisineUsecase,
    getCuisineByIdUsecase: GetCuisineByIdUsecase,
    updateCuisineUsecase: UpdateCuisineUsecase,
    getAllCuisinesUsecase: GetAllCuisinesUsecase
  ) {
    this.createCuisineUsecase = createCuisineUsecase;
    this.deleteCuisineUsecase = deleteCuisineUsecase;
    this.getCuisineByIdUsecase = getCuisineByIdUsecase;
    this.updateCuisineUsecase = updateCuisineUsecase;
    this.getAllCuisinesUsecase = getAllCuisinesUsecase;
  }

  async createCuisine(req: Request, res: Response): Promise<void> {
      
      // Extract cuisine data from the request body and convert it to CuisineModel
      const cuisineData: CuisineModel = CuisineMapper.toModel(req.body);

      // Call the createCuisineUsecase to create the cuisine
      const newCuisine: Either<ErrorClass, CuisineEntity> = await this.createCuisineUsecase.execute(
        cuisineData
      );

      newCuisine.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: CuisineEntity) =>{
          const responseData = CuisineMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteCuisine(req: Request, res: Response): Promise<void> {
    
      const cuisineId: string = req.params.cuisineId;
    

      const updatedCuisineEntity: CuisineEntity = CuisineMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateCuisineUsecase to update the Cuisine
      const updatedCuisine: Either<ErrorClass, CuisineEntity> = await this.updateCuisineUsecase.execute(
        cuisineId,
        updatedCuisineEntity
      );

      updatedCuisine.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: CuisineEntity) =>{
          const responseData = CuisineMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getCuisineById(req: Request, res: Response): Promise<void> {
      const cuisineId: string = req.params.cuisineId;

      // Call the GetCuisineByIdUsecase to get the cuisine by ID
      const cuisine: Either<ErrorClass, CuisineEntity | null> = await this.getCuisineByIdUsecase.execute(
        cuisineId
      );

      cuisine.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: CuisineEntity | null) =>{
          const responseData = CuisineMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateCuisine(req: Request, res: Response): Promise<void> {
    
      const cuisineId: string = req.params.cuisineId;
      const cuisineData: CuisineModel = req.body;

      // Get the existing Cuisine by ID
      const existingCuisine: Either<ErrorClass, CuisineEntity | null> =
        await this.getCuisineByIdUsecase.execute(cuisineId);

      if (!existingCuisine) {
        // If cuisine is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert cuisinefData from CuisineModel to CuisineEntity using CuisineMapper
      const updatedCuisineEntity: CuisineEntity = CuisineMapper.toEntity(
        cuisineData,
        true,
      );

      // Call the UpdateCuisineUsecase to update the Cuisine
      const updatedCuisine: Either<ErrorClass, CuisineEntity> = await this.updateCuisineUsecase.execute(
        cuisineId,
        updatedCuisineEntity
      );

      updatedCuisine.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: CuisineEntity) =>{
          const responseData = CuisineMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllCuisines(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllCuisinesUsecase to get all Cuisines
      const cuisines: Either<ErrorClass, CuisineEntity[]> = await this.getAllCuisinesUsecase.execute();

      cuisines.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: CuisineEntity[]) => {
            // Filter out cuisines with del_status set to "Deleted"
            const nonDeletedCuisines = result.filter((cuisine) => cuisine.del_status !== false);

            // Convert non-deleted cuisines from an array of CuisineEntity to an array of plain JSON objects using CuisineMapper
            const responseData = nonDeletedCuisines.map((cuisine) => CuisineMapper.toEntity(cuisine));
            return res.json(responseData);
        }
    );
  }
}
