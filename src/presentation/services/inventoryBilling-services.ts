import { NextFunction, Request, Response } from "express";
import {
  InventoryBillingEntity,
  InventoryBillingModel,
  InventoryBillingMapper,
} from "@domain/inventoryBilling/entities/inventoryBilling";
import { CreateInventoryBillingUsecase } from "@domain/inventoryBilling/usecases/create-inventoryBilling";
import { DeleteInventoryBillingUsecase } from "@domain/inventoryBilling/usecases/delete-inventoryBilling";
import { GetInventoryBillingByIdUsecase } from "@domain/inventoryBilling/usecases/get-inventoryBilling-by-id";
import { UpdateInventoryBillingUsecase } from "@domain/inventoryBilling/usecases/update-inventoryBillling";
import { GetAllInventoryBillingsUsecase } from "@domain/inventoryBilling/usecases/get-all-inventoryBilling";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class InventoryBillingService {
  private readonly createInventoryBillingUsecase: CreateInventoryBillingUsecase;
  private readonly deleteInventoryBillingUsecase: DeleteInventoryBillingUsecase;
  private readonly getInventoryBillingByIdUsecase: GetInventoryBillingByIdUsecase;
  private readonly updateInventoryBillingUsecase: UpdateInventoryBillingUsecase;
  private readonly getAllInventoryBillingsUsecase: GetAllInventoryBillingsUsecase;

  constructor(
    createInventoryBillingUsecase: CreateInventoryBillingUsecase,
    deleteInventoryBillingUsecase: DeleteInventoryBillingUsecase,
    getInventoryBillingByIdUsecase: GetInventoryBillingByIdUsecase,
    updateInventoryBillingUsecase: UpdateInventoryBillingUsecase,
    getAllInventoryBillingsUsecase: GetAllInventoryBillingsUsecase
  ) {
    this.createInventoryBillingUsecase = createInventoryBillingUsecase;
    this.deleteInventoryBillingUsecase = deleteInventoryBillingUsecase;
    this.getInventoryBillingByIdUsecase = getInventoryBillingByIdUsecase;
    this.updateInventoryBillingUsecase = updateInventoryBillingUsecase;
    this.getAllInventoryBillingsUsecase = getAllInventoryBillingsUsecase;
  }

  async createInventoryBilling(req: Request, res: Response): Promise<void> {
    const inventoryBillingData: InventoryBillingModel =
      InventoryBillingMapper.toModel(req.body);

    const newInventoryBilling: Either<ErrorClass, InventoryBillingEntity> =
      await this.createInventoryBillingUsecase.execute(inventoryBillingData);

    newInventoryBilling.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryBillingEntity) => {
        const resData = InventoryBillingMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async deleteInventoryBilling(req: Request, res: Response): Promise<void> {
    const inventoryBillingId: string = req.params.inventoryBillingId;

    const response: Either<ErrorClass, void> =
      await this.deleteInventoryBillingUsecase.execute(inventoryBillingId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "InventoryBilling deleted successfully." });
      }
    );
  }

  async getInventoryBillingById(req: Request, res: Response): Promise<void> {
    const inventoryBillingId: string = req.params.inventoryBillingId;

    const inventoryBilling: Either<ErrorClass, InventoryBillingEntity> =
      await this.getInventoryBillingByIdUsecase.execute(inventoryBillingId);

    inventoryBilling.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryBillingEntity) => {
        const resData = InventoryBillingMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async updateInventoryBilling(req: Request, res: Response): Promise<void> {
    const inventoryBillingId: string = req.params.inventoryBillingId;
    const inventoryBillingData: InventoryBillingModel = req.body;

    const existingInventoryBilling: Either<ErrorClass, InventoryBillingEntity> =
      await this.getInventoryBillingByIdUsecase.execute(inventoryBillingId);

    existingInventoryBilling.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: InventoryBillingEntity) => {
        const resData = InventoryBillingMapper.toEntity(result, true);

        const updatedInventoryBillingEntity: InventoryBillingEntity =
          InventoryBillingMapper.toEntity(inventoryBillingData, true, resData);

        const updatedInventoryBilling: Either<
          ErrorClass,
          InventoryBillingEntity
        > = await this.updateInventoryBillingUsecase.execute(
          inventoryBillingId,
          updatedInventoryBillingEntity
        );

        updatedInventoryBilling.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: InventoryBillingEntity) => {
            const responseData = InventoryBillingMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async getAllInventoryBillings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const inventoryBillings: Either<ErrorClass, InventoryBillingEntity[]> =
      await this.getAllInventoryBillingsUsecase.execute();

    inventoryBillings.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (inventoryBillings: InventoryBillingEntity[]) => {
        const resData = inventoryBillings.map((inventoryBilling: any) =>
          InventoryBillingMapper.toEntity(inventoryBilling)
        );
        return res.json(resData);
      }
    );
  }
}
