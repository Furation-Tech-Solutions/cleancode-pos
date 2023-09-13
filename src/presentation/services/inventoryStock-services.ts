import { NextFunction, Request, Response } from "express";
import {
  InventoryStockEntity,
  InventoryStockModel,
  InventoryStockMapper,
} from "@domain/inventoryStock/entities/inventoryStock";
import { CreateInventoryStockUsecase } from "@domain/inventoryStock/usecases/create-inventoryStock";
import { GetAllInventoryStocksUsecase } from "@domain/inventoryStock/usecases/get-all-inventroyStocks";
import { GetInventoryStockByIdUsecase } from "@domain/inventoryStock/usecases/get-inventoryStock-by-id";
import { UpdateInventoryStockUsecase } from "@domain/inventoryStock/usecases/update-inventoryStock";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { DeleteInventoryStockUsecase } from "@domain/inventoryStock/usecases/delete-InventoryStock";


export class InventoryStockService {
  private readonly createInventoryStockUsecase: CreateInventoryStockUsecase;
  private readonly getInventoryStockByIdUsecase: GetInventoryStockByIdUsecase;
  private readonly deleteInventoryStockUsecase: DeleteInventoryStockUsecase;
  private readonly updateInventoryStockUsecase: UpdateInventoryStockUsecase;
  private readonly getAllInventoryStocksUsecase: GetAllInventoryStocksUsecase;

  constructor(
    createInventoryStockUsecase: CreateInventoryStockUsecase,
    getInventoryStockByIdUsecase: GetInventoryStockByIdUsecase,
    getAllInventoryStocksUsecase: GetAllInventoryStocksUsecase,
    updateInventoryStockUsecase: UpdateInventoryStockUsecase,
    deleteInventoryStockUsecase: DeleteInventoryStockUsecase
  ) {
    this.createInventoryStockUsecase = createInventoryStockUsecase;
    this.getInventoryStockByIdUsecase = getInventoryStockByIdUsecase;
    this.getAllInventoryStocksUsecase = getAllInventoryStocksUsecase;
    this.updateInventoryStockUsecase = updateInventoryStockUsecase;
    this.deleteInventoryStockUsecase = deleteInventoryStockUsecase;
  }

  async createInventoryStock(req: Request, res: Response): Promise<void> {
    const inventoryStockData: InventoryStockModel =
      InventoryStockMapper.toModel(req.body);

    const newInventoryStock: Either<ErrorClass, InventoryStockEntity> =
      await this.createInventoryStockUsecase.execute(inventoryStockData);

    newInventoryStock.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryStockEntity) => {
        const resData = InventoryStockMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getInventoryStockById(req: Request, res: Response): Promise<void> {
    const inventoryStockId: string = req.params.inventoryStockId;

    const inventoryStock: Either<ErrorClass, InventoryStockEntity> =
      await this.getInventoryStockByIdUsecase.execute(inventoryStockId);

    inventoryStock.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryStockEntity) => {
        const resData = InventoryStockMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllInventoryStocks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const inventoryStocks: Either<ErrorClass, InventoryStockEntity[]> =
      await this.getAllInventoryStocksUsecase.execute();

    inventoryStocks.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (inventoryStocks: InventoryStockEntity[]) => {
        const resData = inventoryStocks.map((inventoryStock: any) =>
          InventoryStockMapper.toEntity(inventoryStock)
        );
        return res.json(resData);
      }
    );
  }

  async updateInventoryStock(req: Request, res: Response): Promise<void> {
    const inventoryStockId: string = req.params.inventoryStockId;
    const inventoryStockData: InventoryStockModel = req.body;

    const existingInventoryStock: Either<ErrorClass, InventoryStockEntity> =
      await this.getInventoryStockByIdUsecase.execute(inventoryStockId);

    existingInventoryStock.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: InventoryStockEntity) => {
        const resData = InventoryStockMapper.toEntity(result, true);

        const updatedInventoryStockEntity: InventoryStockEntity =
          InventoryStockMapper.toEntity(inventoryStockData, true, resData);

        const updatedInventoryStock: Either<ErrorClass, InventoryStockEntity> =
          await this.updateInventoryStockUsecase.execute(
            inventoryStockId,
            updatedInventoryStockEntity
          );

        updatedInventoryStock.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: InventoryStockEntity) => {
            const responseData = InventoryStockMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteInventoryStock(req: Request, res: Response): Promise<void> {
    const inventoryStockId: string = req.params.inventoryStockId;

    const response: Either<ErrorClass, void> =
      await this.deleteInventoryStockUsecase.execute(inventoryStockId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Inventory Stock deleted successfully." });
      }
    );
  }
}