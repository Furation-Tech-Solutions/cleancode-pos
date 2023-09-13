import { NextFunction, Request, Response } from "express";
import {
  KitchenModel,
  KitchenEntity,
  KitchenMapper,
} from "@domain/kitchen/entities/kitchen";
import { CreateKitchenUsecase } from "@domain/kitchen/usecases/create-kitchen";
import { DeleteKitchenUsecase } from "@domain/kitchen/usecases/delete-kitchen";
import { GetKitchenByIdUsecase } from "@domain/kitchen/usecases/get-kitchen-by-id";
import { UpdateKitchenUsecase } from "@domain/kitchen/usecases/update-kitchen";
import { GetAllKitchensUsecase } from "@domain/kitchen/usecases/get-all-kitchen";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class KitchenService {
  private readonly CreateKitchenUsecase: CreateKitchenUsecase;
  private readonly DeleteKitchenUsecase: DeleteKitchenUsecase;
  private readonly GetKitchenByIdUsecase: GetKitchenByIdUsecase;
  private readonly UpdateKitchenUsecase: UpdateKitchenUsecase;
  private readonly GetAllKitchensUsecase: GetAllKitchensUsecase;

  constructor(
    CreateKitchenUsecase: CreateKitchenUsecase,
    DeleteKitchenUsecase: DeleteKitchenUsecase,
    GetKitchenByIdUsecase: GetKitchenByIdUsecase,
    UpdateKitchenUsecase: UpdateKitchenUsecase,
    GetAllKitchensUsecase: GetAllKitchensUsecase
  ) {
    this.CreateKitchenUsecase = CreateKitchenUsecase;
    this.DeleteKitchenUsecase = DeleteKitchenUsecase;
    this.GetKitchenByIdUsecase = GetKitchenByIdUsecase;
    this.UpdateKitchenUsecase = UpdateKitchenUsecase;
    this.GetAllKitchensUsecase = GetAllKitchensUsecase;
  }

  async createKitchen(req: Request, res: Response): Promise<void> {
    // Extract Kitchen data from the request body and convert it to KitchenModel
    const kitchenData: KitchenModel = KitchenMapper.toModel(req.body);

    // Call the CreateKitchenUsecase to create the kitchen
    const newKitchen: Either<ErrorClass, KitchenEntity> =
      await this.CreateKitchenUsecase.execute(kitchenData);

    newKitchen.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KitchenEntity) => {
        const responseData = KitchenMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async deleteKitchen(req: Request, res: Response): Promise<void> {
    const kitchenId: string = req.params.kitchenId;

    const updatedKitchenEntity: KitchenEntity = KitchenMapper.toEntity(
      { del_status: false },
      true
    );
    // Call the UpdateKitchenUsecase to delete the kitchen
    const updatedKitchen: Either<ErrorClass, KitchenEntity> =
      await this.UpdateKitchenUsecase.execute(kitchenId,updatedKitchenEntity);

      updatedKitchen.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KitchenEntity) => {
        const responseData = KitchenMapper.toModel(result);
        return res.json(responseData);
      }
    );
  }

  async getTableById(req: Request, res: Response): Promise<void> {
    const kitchenId: string = req.params.kitchenId;

    // Call the GetKitchenByIdUsecase to get the table by ID
    const kitchen: Either<ErrorClass, KitchenEntity | null> =
      await this.GetKitchenByIdUsecase.execute(kitchenId);
    kitchen.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KitchenEntity | null) => {
        const responseData = KitchenMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }

  async updateKitchen(req: Request, res: Response): Promise<void> {
    const kitchenId: string = req.params.kitchenId;
    const kitchenData: KitchenModel = req.body;

    // Get the existing Kitchen by ID
    const existingKitchen: Either<ErrorClass, KitchenEntity | null > =
      await this.GetKitchenByIdUsecase.execute(kitchenId);
     
      if (!existingKitchen) {
        // If Kitchen is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert kitchenData from KitchenModel to KitchenEntity using KitchenMapper
      const updatedKitchenEntity: KitchenEntity = KitchenMapper.toEntity(
        kitchenData,
        true,
        // existingKitchen
      );

      // Call the UpdateKitchenUsecase to update the table
      const updatedKitchen: Either<ErrorClass, KitchenEntity> = await this.UpdateKitchenUsecase.execute(
        kitchenId,
        updatedKitchenEntity
      );

      updatedKitchen.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: KitchenEntity) =>{
          const responseData = KitchenMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }
   

  async getAllKitchens(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Call the GetAllKitchensUsecase to get all kitchens
    const kitchens: Either<ErrorClass, KitchenEntity[]> =
      await this.GetAllKitchensUsecase.execute();

    kitchens.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KitchenEntity[]) => {
        // Filter out kitchens with del_status set to "Deleted"
        const nonDeletedKitchens = result.filter((kitchen) => kitchen.del_status !== false);

        // Convert kitchens from an array of KitchenEntity to an array of plain JSON objects using KitchenMapper
        const responseData = nonDeletedKitchens.map((kitchen) =>
          KitchenMapper.toEntity(kitchen)
        );
        return res.json(responseData);
      }
    );
  }
}
