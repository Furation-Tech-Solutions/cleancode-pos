// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InventoryService } from "@presentation/services/inventory-services";
import { InventoryDataSourceImpl } from "@data/inventory/datasource/inventory-data-source";
import { InventoryRepositoryImpl } from "@data/inventory/repositories/inventory-repository-impl";
import { CreateInventory } from "@domain/inventory/usecases/create-inventory";
import { DeleteInventory } from "@domain/inventory/usecases/delete-inventory";
import { GetInventoryById } from "@domain/inventory/usecases/get-inventory-by-id";
import { GetAllInventories } from "@domain/inventory/usecases/get-all-inventories";
import { UpdateInventory } from "@domain/inventory/usecases/update-inventory";



// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const inventoryDataSource = new InventoryDataSourceImpl(mongoose.connection);

// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const inventoryRepository = new InventoryRepositoryImpl(inventoryDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createInventoryUsecase = new CreateInventory(inventoryRepository);
const deleteInventoryUsecase = new DeleteInventory(inventoryRepository);
const getInventoryByIdUsecase = new GetInventoryById(inventoryRepository);
const updateInventoryUsecase = new UpdateInventory(inventoryRepository);
const getAllInventoryUsecase = new GetAllInventories(inventoryRepository);

// Initialize AdminService and inject required dependencies
const inventoryService = new InventoryService(
  createInventoryUsecase,
  deleteInventoryUsecase,
  getInventoryByIdUsecase,
  updateInventoryUsecase,
  getAllInventoryUsecase
);

// Create an Express router
export const inventoryRouter = Router();

// Route handling for creating a new inventory
inventoryRouter.post("/create", inventoryService.createInventory.bind(inventoryService));

// Route handling for getting an inventory by ID
inventoryRouter.get("/getById/:inventoryId", inventoryService.getInventoryById.bind(inventoryService));

// Route handling for updating an inventory by ID
inventoryRouter.put("/update/:inventoryId", inventoryService.updateInventory.bind(inventoryService));

// Route handling for deleting an inventory by ID
inventoryRouter.delete("/delete/:inventoryId", inventoryService.deleteInventory.bind(inventoryService));

// Route handling for getting all inventories
inventoryRouter.get("/getAllInventories", inventoryService.getAllInventories.bind(inventoryService));




