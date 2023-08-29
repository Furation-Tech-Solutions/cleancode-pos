// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InventoryItemService } from "@presentation/services/inventoryItem-services";
import { InventoryItemDataSourceImpl } from "@data/inventoryItem/datasource/inventoryItem-data-source";
import { InventoryItemRepositoryImpl } from "@data/inventoryItem/repositories/inventoryItem-repository-impl";
import { CreateInventoryItem } from "@domain/inventoryItem/usecases/create-inventoryItem";
import { GetInventoryItemById } from "@domain/inventoryItem/usecases/get-inventoryItem-by-id";
import { GetAllInventoryItems } from "@domain/inventoryItem/usecases/get-all-inventroyItems";
import { UpdateInventoryItem } from "@domain/inventoryItem/usecases/update-inventoryItem";
import { DeleteInventoryItem } from "@domain/inventoryItem/usecases/delete-InventoryItem";

const inventoryItemDataSource = new InventoryItemDataSourceImpl(mongoose.connection);

const inventoryItemRepository = new InventoryItemRepositoryImpl(inventoryItemDataSource);


const createInventoryItemUsecase = new CreateInventoryItem(inventoryItemRepository);
const getInventoryItemByIdUsecase = new GetInventoryItemById(inventoryItemRepository);
const getAllInventoryItemsUsecase = new GetAllInventoryItems(inventoryItemRepository);
const updateInventoryItemUsecase = new UpdateInventoryItem(inventoryItemRepository);
const deleteInventoryItemUsecase = new DeleteInventoryItem(inventoryItemRepository);

const inventoryItemService = new InventoryItemService(
  createInventoryItemUsecase,
  getInventoryItemByIdUsecase,
  getAllInventoryItemsUsecase,
  updateInventoryItemUsecase,
  deleteInventoryItemUsecase,
);

// Create an Express router
export const inventoryItemRouter = Router();

// Route handling for creating a new inventory Item
inventoryItemRouter.post("/create",inventoryItemService.createInventoryItem.bind(inventoryItemService));

// Route handling for getting all inventory Items
inventoryItemRouter.get("/getAllInventoryItems", inventoryItemService.getAllInventoryItems.bind(inventoryItemService));

// Route handling for getting an inventory Item by ID
inventoryItemRouter.get("/getById/:inventoryItemId",inventoryItemService.getInventoryItemById.bind(inventoryItemService));


// Route handling for updating an inventory Item by ID
inventoryItemRouter.put("/update/:inventoryItemId",inventoryItemService.updateInventoryItem.bind(inventoryItemService));

// Route handling for deleting an inventory Item by ID
inventoryItemRouter.delete("/delete/:inventoryItemId", inventoryItemService.deleteInventoryItem.bind(inventoryItemService));