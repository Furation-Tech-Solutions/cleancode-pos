import { KotEntity, KotMapper, KotModel } from "@domain/kot/entities/kot";
import { CreateKotUsecase } from "@domain/kot/usecases/create-kot";
import { DeleteKotUsecase } from "@domain/kot/usecases/delete-kot";
import { GetAllKotUsecase } from "@domain/kot/usecases/get-all-kot";
import { GetKotByIdUsecase } from "@domain/kot/usecases/get-kot-by-id";
import { UpdateKotUsecase } from "@domain/kot/usecases/update-kot";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Request, Response } from "express";
import { Either } from "monet";


export class KotService {
  private readonly createKotUsecase: CreateKotUsecase;
  private readonly getAllKotUsecase: GetAllKotUsecase;
  private readonly getKotByIdUsecase: GetKotByIdUsecase;
  private readonly updateKotUsecase: UpdateKotUsecase;
  private readonly deleteKotUsecase: DeleteKotUsecase;

  constructor(
    createKotUsecase: CreateKotUsecase,
    getAllKotUsecase: GetAllKotUsecase,
    getKotByIdUsecase: GetKotByIdUsecase,
    updateKotUsecase: UpdateKotUsecase,
    deleteKotUsecase: DeleteKotUsecase
  ) {
    this.createKotUsecase = createKotUsecase;
    this.getAllKotUsecase = getAllKotUsecase;
    this.getKotByIdUsecase = getKotByIdUsecase;
    this.updateKotUsecase = updateKotUsecase;
    this.deleteKotUsecase = deleteKotUsecase;
  }
  async createKot(req: Request, res: Response): Promise<void> {
    const kotData: KotModel = KotMapper.toModel(req.body);

    // Call the createKotUsecase to create the kot
    const newKot: Either<ErrorClass, KotEntity> =
      await this.createKotUsecase.execute(kotData);

    newKot.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KotEntity) => {
        const responseData = KotMapper.toEntity(result, true);
        return res.json(responseData);
      }
    );
  }
  async getAllKot(req: Request, res: Response): Promise<void> {
    // Call the getAllKotUsecase to get all kots
    const kitchens: Either<ErrorClass, KotEntity[]> =
      await this.getAllKotUsecase.execute();

    kitchens.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KotEntity[]) => {
        // Convert kots from an array of KotEntity to an array of plain JSON objects using KotMapper
        const responseData = result.map((kot) => KotMapper.toModel(kot));
        return res.json(responseData);
      }
    );
  }

  async getKotById(req: Request, res: Response): Promise<void> {
    const kotId: string = req.params.kotId;
    const kot: Either<ErrorClass, KotEntity> =
    await this.getKotByIdUsecase.execute(kotId);
      kot.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: KotEntity) => {
        const resData = KotMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async updateKot(req: Request, res: Response): Promise<void> {
    const kotId: string = req.params.kotId;
    const kotData: KotModel = req.body;

    const existingKot: Either<ErrorClass, KotEntity> =
      await this.getKotByIdUsecase.execute(kotId);

    existingKot.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: KotEntity) => {
        const resData = KotMapper.toEntity(result, true);

        const updatedKotEntity: KotEntity = KotMapper.toEntity(
          kotData,
          true,
          resData
        );

        const updatedKot: Either<ErrorClass, KotEntity> =
          await this.updateKotUsecase.execute(kotId, updatedKotEntity);

        updatedKot.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: KotEntity) => {
            const responseData = KotMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteKot(req: Request, res: Response): Promise<void> {
    const kotId: string = req.params.kotId;

    const response: Either<ErrorClass, void> =
      await this.deleteKotUsecase.execute(kotId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Kot deleted successfully." });
      }
    );
  }
}