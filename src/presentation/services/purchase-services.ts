import { NextFunction, Request, Response } from "express";
import { PurchaseEntity, PurchaseModel, PurchaseMapper } from "@domain/purchase/entities/purchase";
import { CreatePurchaseUsecase } from "@domain/purchase/usecases/create-purchase";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { GetPurchaseByIdUsecase } from "@domain/purchase/usecases/get-puchase-by-id";
import { GetAllPurchasesUsecase } from "@domain/purchase/usecases/get-all-purchases";
import { UpdatePurchaseUsecase } from "@domain/purchase/usecases/update-purchase";
import { DeletePurchaseUsecase } from "@domain/purchase/usecases/delete-purchase";

export class PurchaseService {
  private readonly createPurchaseUsecase: CreatePurchaseUsecase;
  private readonly getPurchaseByIdUsecase: GetPurchaseByIdUsecase;
  private readonly getAllPurchasesUsecase: GetAllPurchasesUsecase;
  private readonly updatePurchaseUsecase: UpdatePurchaseUsecase;
  private readonly deletePurchaseUsecase: DeletePurchaseUsecase;

  constructor(
    createPurchaseUsecase: CreatePurchaseUsecase,
    getPurchaseByIdUsecase: GetPurchaseByIdUsecase,
    getAllPurchasesUsecase: GetAllPurchasesUsecase,
    updatePurchaseUsecase: UpdatePurchaseUsecase,
    deletePurchaseUsecase: DeletePurchaseUsecase
  ) {
    this.createPurchaseUsecase = createPurchaseUsecase;
    this.getPurchaseByIdUsecase = getPurchaseByIdUsecase;
    this.getAllPurchasesUsecase = getAllPurchasesUsecase;
    this.updatePurchaseUsecase = updatePurchaseUsecase;
    this.deletePurchaseUsecase = deletePurchaseUsecase;
  }

  async createPurchase(req: Request, res: Response): Promise<void> {
    const purchaseData: PurchaseModel = PurchaseMapper.toModel(req.body);

    const newPurchase: Either<ErrorClass, PurchaseEntity> =
      await this.createPurchaseUsecase.execute(purchaseData);

    newPurchase.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: PurchaseEntity) => {
        const resData = PurchaseMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getPurchaseById(req: Request, res: Response): Promise<void> {
    const purchaseId: string = req.params.purchaseId;

    const purchase: Either<ErrorClass, PurchaseEntity> =
      await this.getPurchaseByIdUsecase.execute(purchaseId);

    purchase.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: PurchaseEntity) => {
        const resData = PurchaseMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllPurchases(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const purchases: Either<ErrorClass, PurchaseEntity[]> =
      await this.getAllPurchasesUsecase.execute();

    purchases.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (purchases: PurchaseEntity[]) => {
        const resData = purchases.map((purchase: any) =>
          PurchaseMapper.toEntity(purchase)
        );
        return res.json(resData);
      }
    );
  }

  async updatePurchase(req: Request, res: Response): Promise<void> {
    const purchaseId: string = req.params.purchaseId;
    const purchaseData: PurchaseModel = req.body;

    const existingPurchase: Either<ErrorClass, PurchaseEntity> =
      await this.getPurchaseByIdUsecase.execute(purchaseId);

    existingPurchase.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: PurchaseEntity) => {
        const resData = PurchaseMapper.toEntity(result, true);

        const updatedPurchaseEntity: PurchaseEntity = PurchaseMapper.toEntity(
          purchaseData,
          true,
          resData
        );

        const updatedPurchase: Either<ErrorClass, PurchaseEntity> =
          await this.updatePurchaseUsecase.execute(
            purchaseId,
            updatedPurchaseEntity
          );

        updatedPurchase.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: PurchaseEntity) => {
            const responseData = PurchaseMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deletePurchase(req: Request, res: Response): Promise<void> {
    const purchaseId: string = req.params.purchaseId;

    const response: Either<ErrorClass, void> =
      await this.deletePurchaseUsecase.execute(purchaseId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Purchase deleted successfully." });
      }
    );
  }
}