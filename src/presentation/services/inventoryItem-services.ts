import { NextFunction, Request, Response } from "express";
import { InventoryItemEntity, InventoryItemModel, InventoryItemMapper } from "@domain/inventoryItem/entities/inventoryItem";
import { CreateInventoryItemUsecase } from "@domain/inventoryItem/usecases/create-inventoryItem";
import { GetAllInventoryItemsUsecase } from "@domain/inventoryItem/usecases/get-all-inventroyItems";
import { GetInventoryItemByIdUsecase } from "@domain/inventoryItem/usecases/get-inventoryItem-by-id";
import { UpdateInventoryItemUsecase } from "@domain/inventoryItem/usecases/update-inventoryItem";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { DeleteInventoryItemUsecase } from "@domain/inventoryItem/usecases/delete-InventoryItem";


export class InventoryItemService {
  private readonly createInventoryItemUsecase: CreateInventoryItemUsecase;
  private readonly getInventoryItemByIdUsecase: GetInventoryItemByIdUsecase;
  private readonly deleteInventoryItemUsecase: DeleteInventoryItemUsecase;
  private readonly updateInventoryItemUsecase: UpdateInventoryItemUsecase;
  private readonly getAllInventoryItemsUsecase: GetAllInventoryItemsUsecase;

  constructor(
    createInventoryItemUsecase: CreateInventoryItemUsecase,
    getInventoryItemByIdUsecase: GetInventoryItemByIdUsecase,
    getAllInventoryItemsUsecase: GetAllInventoryItemsUsecase,
    updateInventoryItemUsecase: UpdateInventoryItemUsecase,
    deleteInventoryItemUsecase: DeleteInventoryItemUsecase
  ) {
    this.createInventoryItemUsecase = createInventoryItemUsecase;
    this.getInventoryItemByIdUsecase = getInventoryItemByIdUsecase;
    this.getAllInventoryItemsUsecase = getAllInventoryItemsUsecase;
    this.updateInventoryItemUsecase = updateInventoryItemUsecase;
    this.deleteInventoryItemUsecase = deleteInventoryItemUsecase;
  }

  async createInventoryItem(req: Request, res: Response): Promise<void> {
    const inventoryItemData: InventoryItemModel = InventoryItemMapper.toModel(
      req.body
    );

    const newInventoryItem: Either<ErrorClass, InventoryItemEntity> =
      await this.createInventoryItemUsecase.execute(inventoryItemData);

    newInventoryItem.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryItemEntity) => {
        const resData = InventoryItemMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getInventoryItemById(req: Request, res: Response): Promise<void> {
    const inventoryItemId: string = req.params.inventoryItemId;

    const inventoryItem: Either<ErrorClass, InventoryItemEntity> =
      await this.getInventoryItemByIdUsecase.execute(inventoryItemId);

    inventoryItem.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryItemEntity) => {
        const resData = InventoryItemMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllInventoryItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const inventoryItems: Either<ErrorClass, InventoryItemEntity[]> =
      await this.getAllInventoryItemsUsecase.execute();

    inventoryItems.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (inventoryItems: InventoryItemEntity[]) => {
        const resData = inventoryItems.map((inventoryItem: any) =>
          InventoryItemMapper.toEntity(inventoryItem)
        );
        return res.json(resData);
      }
    );
  }

  async updateInventoryItem(req: Request, res: Response): Promise<void> {
    const inventoryItemId: string = req.params.inventoryItemId;
    const inventoryItemData: InventoryItemModel = req.body;

    const existingInventoryItem: Either<ErrorClass, InventoryItemEntity> =
      await this.getInventoryItemByIdUsecase.execute(inventoryItemId);

    existingInventoryItem.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: InventoryItemEntity) => {
        const resData = InventoryItemMapper.toEntity(result, true);

        const updatedInventoryItemEntity: InventoryItemEntity =
          InventoryItemMapper.toEntity(inventoryItemData, true, resData);

        const updatedInventoryItem: Either<ErrorClass, InventoryItemEntity> =
          await this.updateInventoryItemUsecase.execute(
            inventoryItemId,
            updatedInventoryItemEntity
          );

        updatedInventoryItem.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: InventoryItemEntity) => {
            const responseData = InventoryItemMapper.toModel(response);

            res.json(responseData);
          }
        );
      }
    );
  }

  async deleteInventoryItem(req: Request, res: Response): Promise<void> {
    const inventoryItemId: string = req.params.inventoryItemId;

    const response: Either<ErrorClass, void> =
      await this.deleteInventoryItemUsecase.execute(inventoryItemId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Inventory Item deleted successfully." });
      }
    );
  }
}