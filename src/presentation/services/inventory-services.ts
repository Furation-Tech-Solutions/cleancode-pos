import { NextFunction, Request, Response } from "express";
import { InventoryEntity, InventoryModel, InventoryMapper } from "@domain/inventory/entities/inventory";
import { CreateInventoryUsecase } from "@domain/inventory/usecases/create-inventory";
import { DeleteInventoryUsecase } from "@domain/inventory/usecases/delete-inventory";
import { GetInventoryByIdUsecase } from "@domain/inventory/usecases/get-inventory-by-id";
import { UpdateInventoryUsecase } from "@domain/inventory/usecases/update-inventory";
import { GetAllInventorysUsecase } from "@domain/inventory/usecases/get-all-inventories";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class InventoryService {
  private readonly createInventoryUsecase: CreateInventoryUsecase;
  private readonly deleteInventoryUsecase: DeleteInventoryUsecase;
  private readonly getInventoryByIdUsecase: GetInventoryByIdUsecase;
  private readonly updateInventoryUsecase: UpdateInventoryUsecase;
  private readonly getAllInventoriesUsecase: GetAllInventorysUsecase;

  constructor(
    createInventoryUsecase: CreateInventoryUsecase,
    deleteInventoryUsecase: DeleteInventoryUsecase,
    getInventoryByIdUsecase: GetInventoryByIdUsecase,
    updateInventoryUsecase: UpdateInventoryUsecase,
    getAllInventoriesUsecase: GetAllInventorysUsecase
  ) {
    this.createInventoryUsecase = createInventoryUsecase;
    this.deleteInventoryUsecase = deleteInventoryUsecase;
    this.getInventoryByIdUsecase = getInventoryByIdUsecase;
    this.updateInventoryUsecase = updateInventoryUsecase;
    this.getAllInventoriesUsecase = getAllInventoriesUsecase;
  }

  async createInventory(req: Request, res: Response): Promise<void> {
    const inventoryData: InventoryModel = InventoryMapper.toModel(req.body);

    const newInventory: Either<ErrorClass, InventoryEntity> =
      await this.createInventoryUsecase.execute(inventoryData);

    newInventory.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryEntity) => {
        const resData = InventoryMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async deleteInventory(req: Request, res: Response): Promise<void> {
    const inventoryId: string = req.params.inventoryId;

    const response: Either<ErrorClass, void> =
      await this.deleteInventoryUsecase.execute(inventoryId);

    response.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      () => {
        return res.json({ message: "Inventory deleted successfully." });
      }
    );
  }

  async getInventoryById(req: Request, res: Response): Promise<void> {
    const inventoryId: string = req.params.inventoryId;

    const inventory: Either<ErrorClass, InventoryEntity> =
      await this.getInventoryByIdUsecase.execute(inventoryId);

    inventory.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: InventoryEntity) => {
        const resData = InventoryMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async updateInventory(req: Request, res: Response): Promise<void> {

    
    const inventoryId: string = req.params.inventoryId;
    const inventoryData: InventoryModel = req.body;
   
    const existingInventory: Either<ErrorClass, InventoryEntity> =
      await this.getInventoryByIdUsecase.execute(inventoryId);

    existingInventory.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: InventoryEntity) => {
        const resData = InventoryMapper.toEntity(result, true);

        
        const updatedInventoryEntity: InventoryEntity = InventoryMapper.toEntity(
          inventoryData,
          true,
          resData
        );

        const updatedInventory: Either<ErrorClass, InventoryEntity> =
          await this.updateInventoryUsecase.execute(
            inventoryId,
            updatedInventoryEntity
          );

        updatedInventory.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: InventoryEntity) => {
            const responseData = InventoryMapper.toModel(response);

            res.json(responseData);
           
            
          }
        );
      }
    );
  }

  async getAllInventories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const inventories: Either<ErrorClass, InventoryEntity[]> =
      await this.getAllInventoriesUsecase.execute();

    inventories.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (inventories: InventoryEntity[]) => {
        const resData = inventories.map((inventory: any) =>
          InventoryMapper.toEntity(inventory)
        );
        return res.json(resData);
      }
    );
  }
}


