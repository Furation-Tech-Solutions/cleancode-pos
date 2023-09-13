import { NextFunction, Request, Response } from "express";
import {
  WasteEntity,
  WasteModel,
  WasteMapper,
} from "@domain/waste/entities/waste";
import { CreateWasteUsecase } from "@domain/waste/usecases/create-waste";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { GetWasteByIdUsecase } from "@domain/waste/usecases/get-waste-by-id";
import { GetAllWastesUsecase } from "@domain/waste/usecases/get-all-wastes";
import { UpdateWasteUsecase } from "@domain/waste/usecases/update-waste";
import { DeleteWasteUsecase } from "@domain/waste/usecases/delete-waste";

export class WasteService {
  private readonly createWasteUsecase: CreateWasteUsecase;
  private readonly getWasteByIdUsecase: GetWasteByIdUsecase;
  private readonly getAllWastesUsecase: GetAllWastesUsecase;
  private readonly updateWasteUsecase: UpdateWasteUsecase;
  private readonly deleteWasteUsecase: DeleteWasteUsecase;

  constructor(
    createWasteUsecase: CreateWasteUsecase,
    getWasteByIdUsecase: GetWasteByIdUsecase,
    getAllWastesUsecase: GetAllWastesUsecase,
    updateWasteUsecase: UpdateWasteUsecase,
    deleteWasteUsecase: DeleteWasteUsecase
  ) {
    this.createWasteUsecase = createWasteUsecase;
    this.getWasteByIdUsecase = getWasteByIdUsecase;
    this.getAllWastesUsecase = getAllWastesUsecase;
    this.updateWasteUsecase = updateWasteUsecase;
    this.deleteWasteUsecase = deleteWasteUsecase;
  }

  async createWaste(req: Request, res: Response): Promise<void> {
    const wasteData: WasteModel = WasteMapper.toModel(req.body);

    const newWaste: Either<ErrorClass, WasteEntity> =
      await this.createWasteUsecase.execute(wasteData);

    newWaste.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: WasteEntity) => {
        const resData = WasteMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getWasteById(req: Request, res: Response): Promise<void> {
    const wasteId: string = req.params.wasteId;

    const waste: Either<ErrorClass, WasteEntity> =
      await this.getWasteByIdUsecase.execute(wasteId);

    waste.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: WasteEntity) => {
        const resData = WasteMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllWastes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const wastes: Either<ErrorClass, WasteEntity[]> =
      await this.getAllWastesUsecase.execute();

    wastes.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (wastes: WasteEntity[]) => {
        const resData = wastes.map((purchase: any) =>
          WasteMapper.toEntity(purchase)
        );
        return res.json(resData);
      }
    );
  }

  async updateWaste(req: Request, res: Response): Promise<void> {
    const wasteId: string = req.params.wasteId;
    const wasteData: WasteModel = req.body;

    const existingWaste: Either<ErrorClass, WasteEntity> =
      await this.getWasteByIdUsecase.execute(wasteId);

    existingWaste.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: WasteEntity) => {
        const resData = WasteMapper.toEntity(result, true);

        const updatedWasteEntity: WasteEntity = WasteMapper.toEntity(
          wasteData,
          true,
          resData
        );

        const updatedWaste: Either<ErrorClass, WasteEntity> =
          await this.updateWasteUsecase.execute(wasteId, updatedWasteEntity);

        updatedWaste.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: WasteEntity) => {
            const responseData = WasteMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteWaste(req: Request, res: Response): Promise<void> {
    const wasteId: string = req.params.wasteId;

    const response: Either<ErrorClass, void> =
      await this.deleteWasteUsecase.execute(wasteId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Waste deleted successfully." });
      }
    );
  }
}
