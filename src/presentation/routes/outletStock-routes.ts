// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { OutletStockService } from "@presentation/services/outletStock-services";
import { OutletStockDataSourceImpl } from "@data/outletStock/datasource/outletStock-data-source";
import { OutletStockRepositoryImpl } from "@data/outletStock/repositories/outletStock-repository-impl";
import { CreateOutletStock } from "@domain/outletStock/usecases/create-outletStock";
import { DeleteOutletStock } from "@domain/outletStock/usecases/delete-outletStock";
import { GetOutletStockById } from "@domain/outletStock/usecases/get-outletStock-by-id";
import { GetAllOutletStocks } from "@domain/outletStock/usecases/get-all-outletStocks";
import { UpdateOutletStock } from "@domain/outletStock/usecases/update-outletStock";
import validateOutletStockMiddleware from "@presentation/middlewares/outletStock/validation-middleware";

// Create an instance of the OutletStockDataSourceImpl and pass the mongoose connection
const outletStockDataSource = new OutletStockDataSourceImpl(mongoose.connection);

// Create an instance of the OutletStockRepositoryImpl and pass the OutletStockDataSourceImpl
const outletStockRepository = new OutletStockRepositoryImpl(outletStockDataSource);

// Create instances of the required use cases and pass the OutletStockRepositoryImpl
const createOutletStockUsecase = new CreateOutletStock(outletStockRepository);
const deleteOutletStockUsecase = new DeleteOutletStock(outletStockRepository);
const getOutletStockByIdUsecase = new GetOutletStockById(outletStockRepository);
const updateOutletStockUsecase = new UpdateOutletStock(outletStockRepository);
const getAllOutletStocksUsecase = new GetAllOutletStocks(outletStockRepository);

// Initialize OutletStockService and inject required dependencies
const outletStockService = new OutletStockService(
  createOutletStockUsecase,
  deleteOutletStockUsecase,
  getOutletStockByIdUsecase,
  updateOutletStockUsecase,
  getAllOutletStocksUsecase
);

// Create an Express router
export const outletStockRouter = Router();

// Route handling for creating a new outletStock
outletStockRouter.post("/new", validateOutletStockMiddleware, outletStockService.createOutletStock.bind(outletStockService));

// Route handling for getting an outletStock by ID
outletStockRouter.get("/show/:outletStockId", outletStockService.getOutletStockById.bind(outletStockService));

// Route handling for updating an outletStock by ID
outletStockRouter.put("/update/:outletStockId", outletStockService.updateOutletStock.bind(outletStockService));

// Route handling for deleting an outletStock by ID
outletStockRouter.delete("/delete/:outletStockId", outletStockService.deleteOutletStock.bind(outletStockService));

// Route handling for getting all outletStocks
outletStockRouter.get("/list", outletStockService.getAllOutletStocks.bind(outletStockService));
