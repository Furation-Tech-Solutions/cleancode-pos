import { NextFunction, Request, Response } from "express";
import {
  PreMadeFoodModel,
  PreMadeFoodEntity,
  PreMadeFoodMapper,
} from "@domain/preMadeFood/entities/preMadeFood";
import { CreatePreMadeFoodUsecase } from "@domain/preMadeFood/usecases/create-preMadeFood";
import { DeletePreMadeFoodUsecase } from "@domain/preMadeFood/usecases/delete-preMadeFood";
import { GetPreMadeFoodByIdUsecase } from "@domain/preMadeFood/usecases/get-preMadeFood-by-id";
import { UpdatePreMadeFoodUsecase } from "@domain/preMadeFood/usecases/update-preMadeFood";
import { GetAllPreMadeFoodsUsecase } from "@domain/preMadeFood/usecases/get-all-preMadeFoods";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class PreMadeFoodService {
  private readonly createPreMadeFoodUsecase: CreatePreMadeFoodUsecase;
  private readonly deletePreMadeFoodUsecase: DeletePreMadeFoodUsecase;
  private readonly getPreMadeFoodByIdUsecase: GetPreMadeFoodByIdUsecase;
  private readonly updatePreMadeFoodUsecase: UpdatePreMadeFoodUsecase;
  private readonly getAllPreMadeFoodsUsecase: GetAllPreMadeFoodsUsecase;

  constructor(
    createPreMadeFoodUsecase: CreatePreMadeFoodUsecase,
    deletePreMadeFoodUsecase: DeletePreMadeFoodUsecase,
    getPreMadeFoodByIdUsecase: GetPreMadeFoodByIdUsecase,
    updatePreMadeFoodUsecase: UpdatePreMadeFoodUsecase,
    getAllPreMadeFoodsUsecase: GetAllPreMadeFoodsUsecase
  ) {
    this.createPreMadeFoodUsecase = createPreMadeFoodUsecase;
    this.deletePreMadeFoodUsecase = deletePreMadeFoodUsecase;
    this.getPreMadeFoodByIdUsecase = getPreMadeFoodByIdUsecase;
    this.updatePreMadeFoodUsecase = updatePreMadeFoodUsecase;
    this.getAllPreMadeFoodsUsecase = getAllPreMadeFoodsUsecase;
  }

  async createPreMadeFood(req: Request, res: Response): Promise<void> {
      
      // Extract preMadeFood data from the request body and convert it to PreMadeFoodModel
      const preMadeFoodData: PreMadeFoodModel = PreMadeFoodMapper.toModel(req.body);

      // Call the createPreMadeFoodUsecase to create the preMadeFood
      const newPreMadeFood: Either<ErrorClass, PreMadeFoodEntity> = await this.createPreMadeFoodUsecase.execute(
        preMadeFoodData
      );

      newPreMadeFood.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PreMadeFoodEntity) =>{
          const responseData = PreMadeFoodMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deletePreMadeFood(req: Request, res: Response): Promise<void> {
    
      const preMadeFoodId: string = req.params.preMadeFoodId;
    

      const updatedPreMadeFoodEntity: PreMadeFoodEntity = PreMadeFoodMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdatePreMadeFoodUsecase to update the preMadeFood
      const updatedPreMadeFood: Either<ErrorClass, PreMadeFoodEntity> = await this.updatePreMadeFoodUsecase.execute(
        preMadeFoodId,
        updatedPreMadeFoodEntity
      );

      updatedPreMadeFood.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PreMadeFoodEntity) =>{
          const responseData = PreMadeFoodMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getPreMadeFoodById(req: Request, res: Response): Promise<void> {
      const preMadeFoodId: string = req.params.preMadeFoodId;

      // Call the GetPreMadeFoodByIdUsecase to get the preMadeFood by ID
      const preMadeFood: Either<ErrorClass, PreMadeFoodEntity | null> = await this.getPreMadeFoodByIdUsecase.execute(
        preMadeFoodId
      );

      preMadeFood.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PreMadeFoodEntity | null) =>{
          const responseData = PreMadeFoodMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updatePreMadeFood(req: Request, res: Response): Promise<void> {
    
      const preMadeFoodId: string = req.params.preMadeFoodId;
      const preMadeFoodData: PreMadeFoodModel = req.body;

      // Get the existing preMadeFood by ID
      const existingPreMadeFood: Either<ErrorClass, PreMadeFoodEntity | null> =
        await this.getPreMadeFoodByIdUsecase.execute(preMadeFoodId);

      if (!existingPreMadeFood) {
        // If preMadeFood is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert preMadeFoodData from PreMadeFoodModel to PreMadeFoodEntity using PreMadeFoodMapper
      const updatedPreMadeFoodEntity: PreMadeFoodEntity = PreMadeFoodMapper.toEntity(
        preMadeFoodData,
        true,
      );

      // Call the UpdatePreMadeFoodUsecase to update the preMadeFood
      const updatedPreMadeFood: Either<ErrorClass, PreMadeFoodEntity> = await this.updatePreMadeFoodUsecase.execute(
        preMadeFoodId,
        updatedPreMadeFoodEntity
      );

      updatedPreMadeFood.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: PreMadeFoodEntity) =>{
          const responseData = PreMadeFoodMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllPreMadeFoods(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllPreMadeFoodsUsecase to get all preMadeFoods
      const preMadeFoods: Either<ErrorClass, PreMadeFoodEntity[]> = await this.getAllPreMadeFoodsUsecase.execute();

      preMadeFoods.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: PreMadeFoodEntity[]) => {
            // Filter out preMadeFoods with del_status set to "Deleted"
            const nonDeletedPreMadeFoods = result.filter((preMadeFood) => preMadeFood.del_status !== false);

            // Convert non-deleted preMadeFoods from an array of PreMadeFoodEntity to an array of plain JSON objects using PreMadeFoodMapper
            const responseData = nonDeletedPreMadeFoods.map((preMadeFood) => PreMadeFoodMapper.toEntity(preMadeFood));
            return res.json(responseData);
        }
    );
  }
}
