// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InventoryStockService } from "@presentation/services/inventoryStock-services";
import { InventoryStockDataSourceImpl } from "@data/inventoryStock/datasource/inventoryStock-data-source";
import { InventoryStockRepositoryImpl } from "@data/inventoryStock/repositories/inventoryStock-repository-impl";
import { CreateInventoryStock } from "@domain/inventoryStock/usecases/create-inventoryStock";
import { GetInventoryStockById } from "@domain/inventoryStock/usecases/get-inventoryStock-by-id";
import { GetAllInventoryStocks } from "@domain/inventoryStock/usecases/get-all-inventroyStocks";
import { UpdateInventoryStock } from "@domain/inventoryStock/usecases/update-inventoryStock";
import { DeleteInventoryStock } from "@domain/inventoryStock/usecases/delete-InventoryStock";

const inventoryStockDataSource = new InventoryStockDataSourceImpl(
  mongoose.connection
);

const inventoryStockRepository = new InventoryStockRepositoryImpl(
  inventoryStockDataSource
);


const createInventoryStockUsecase = new CreateInventoryStock(
  inventoryStockRepository
);
const getInventoryStockByIdUsecase = new GetInventoryStockById(
  inventoryStockRepository
);
const getAllInventoryStocksUsecase = new GetAllInventoryStocks(
  inventoryStockRepository
);
const updateInventoryStockUsecase = new UpdateInventoryStock(
  inventoryStockRepository
);
const deleteInventoryStockUsecase = new DeleteInventoryStock(
  inventoryStockRepository
);

const inventoryStockService = new InventoryStockService(
  createInventoryStockUsecase,
  getInventoryStockByIdUsecase,
  getAllInventoryStocksUsecase,
  updateInventoryStockUsecase,
  deleteInventoryStockUsecase
);

// Create an Express router
export const inventoryStockRouter = Router();

// Route handling for creating a new inventory Stock
inventoryStockRouter.post(
  "/create",
  inventoryStockService.createInventoryStock.bind(inventoryStockService)
);

// Route handling for getting all inventory Stocks
inventoryStockRouter.get(
  "/getAllInventoryStocks",
  inventoryStockService.getAllInventoryStocks.bind(inventoryStockService)
);

// Route handling for getting an inventory Stock by ID
inventoryStockRouter.get(
  "/getById/:inventoryStockId",
  inventoryStockService.getInventoryStockById.bind(inventoryStockService)
);


// Route handling for updating an inventory Stock by ID
inventoryStockRouter.put(
  "/update/:inventoryStockId",
  inventoryStockService.updateInventoryStock.bind(inventoryStockService)
);

// Route handling for deleting an inventory Stock by ID
inventoryStockRouter.delete(
  "/delete/:inventoryStockId",
  inventoryStockService.deleteInventoryStock.bind(inventoryStockService)
);