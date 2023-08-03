import { NextFunction, Request, Response } from "express";
import { InventoryEntity, InventoryModel, InventoryMapper } from "@domain/inventory/entities/inventory";
import { CreateInventoryUsecase } from "@domain/inventory/usecases/create-inventory";
import { DeleteInventoryUsecase } from "@domain/inventory/usecases/delete-inventory";
import { GetInventoryByIdUsecase } from "@domain/inventory/usecases/get-inventory-by-id";
import { UpdateInventoryUsecase } from "@domain/inventory/usecases/update-inventory";
import { GetAllInventorysUsecase } from "@domain/inventory/usecases/get-all-inventories";
import ApiError from "@presentation/error-handling/api-error";

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
    try {

      // Extract Inventory data from the request body and convert it to InventoryModel
      const inventoryData: InventoryModel = InventoryMapper.toModel(req.body);

      // Call the CreateInventoryUsecase to create the Inventory
      const newInventory: InventoryEntity = await this.createInventoryUsecase.execute(
        inventoryData
      );

      // Convert newInventory from InventoryEntity to the desired format using InventoryMapper
      const responseData = InventoryMapper.toEntity(newInventory, true);

      // Send the created Inventory as a JSON response
      res.json(responseData);

    } catch (error) {

      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async deleteInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: string = req.params.inventoryId;

      // Call the DeleteInventoryUsecase to delete the Inventory
      await this.deleteInventoryUsecase.execute(inventoryId);

      // Send a success message as a JSON response
      res.json({ message: "Inventory deleted successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getInventoryById(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: string = req.params.inventoryId;

      // Call the GetInventoryByIdUsecase to get the Inventory by ID
      const inventory: InventoryEntity | null = await this.getInventoryByIdUsecase.execute(
        inventoryId
      );

      if (inventory) {
        // Convert Inventory from InventoryEntity to plain JSON object using InventoryMapper
        const responseData = InventoryMapper.toModel(inventory);

        // Send the Inventory as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        ApiError.notFound()
      }
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async updateInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: string = req.params.inventoryId;
      const inventoryData: InventoryModel = req.body;

      // Get the existing Inventory by ID
      const existingInventory: InventoryEntity | null =
        await this.getInventoryByIdUsecase.execute(inventoryId);

      if (!existingInventory) {
        // If Inventory is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert InventoryData from InventoryModel to InventoryEntity using InventoryMapper
      const updatedInventoryEntity: InventoryEntity = InventoryMapper.toEntity(
        inventoryData,
        true,
        existingInventory
      );

      // Call the UpdateInventoryUsecase to update the Inventory
      const updateInventory: InventoryEntity = await this.updateInventoryUsecase.execute(
        inventoryId,
        updatedInventoryEntity
      );

      // Convert updatedInventory from InventoryEntity to plain JSON object using InventoryMapper
      const responseData = InventoryMapper.toModel(updateInventory);

      // Send the updated Inventory as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }


  
  async getAllInventories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Call the GetAllInventorisUsecase to get all Inventories
      const inventories: InventoryEntity[] = await this.getAllInventoriesUsecase.execute();

      // Convert Inventories from an array of InventoryEntity to an array of plain JSON objects using InventoryMapper
      const responseData = inventories.map((inventory) => InventoryMapper.toModel(inventory));

      // Send the Inventors as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }
}


