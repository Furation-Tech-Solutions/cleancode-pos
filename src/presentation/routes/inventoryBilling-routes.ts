// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InventoryBillingService } from "@presentation/services/inventoryBilling-services";
import { InventoryBillingDataSourceImpl } from "@data/inventoryBilling/datasources/inventoryBilling-data-source";
import { InventoryBillingRepositoryImpl } from "@data/inventoryBilling/repositories/inventoryBilling-repository-impl";
import { CreateInventoryBilling } from "@domain/inventoryBilling/usecases/create-inventoryBilling";
import { DeleteInventoryBilling } from "@domain/inventoryBilling/usecases/delete-inventoryBilling";
import { GetInventoryBillingById } from "@domain/inventoryBilling/usecases/get-inventoryBilling-by-id";
import { GetAllInventoryBillings } from "@domain/inventoryBilling/usecases/get-all-inventoryBilling";
import { UpdateInventoryBilling } from "@domain/inventoryBilling/usecases/update-inventoryBillling";

// Create an instance of the InventoryBillingDataSourceImpl and pass the mongoose connection
const inventoryBillingDataSource = new InventoryBillingDataSourceImpl(
  mongoose.connection
);

// Create an instance of the InventoryBillingRepositoryImpl and pass the InventoryBillingDataSourceImpl
const inventoryBillingRepository = new InventoryBillingRepositoryImpl(
  inventoryBillingDataSource
);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createInventoryBillingUsecase = new CreateInventoryBilling(
  inventoryBillingRepository
);
const deleteInventoryBillingUsecase = new DeleteInventoryBilling(
  inventoryBillingRepository
);
const getInventoryBillingByIdUsecase = new GetInventoryBillingById(
  inventoryBillingRepository
);
const updateInventoryBillingUsecase = new UpdateInventoryBilling(
  inventoryBillingRepository
);
const getAllInventoryBillingUsecase = new GetAllInventoryBillings(
  inventoryBillingRepository
);

// Initialize inventoryBillingService and inject required dependencies
const inventoryBillingService = new InventoryBillingService(
  createInventoryBillingUsecase,
  deleteInventoryBillingUsecase,
  getInventoryBillingByIdUsecase,
  updateInventoryBillingUsecase,
  getAllInventoryBillingUsecase
);

// Create an Express router
export const inventoryBillingRouter = Router();

// Route handling for creating a new inventoryBilling
inventoryBillingRouter.post(
  "/create",
  inventoryBillingService.createInventoryBilling.bind(inventoryBillingService)
);

// Route handling for getting an inventoryBilling by ID
inventoryBillingRouter.get(
  "/getById/:inventoryBillingId",
  inventoryBillingService.getInventoryBillingById.bind(inventoryBillingService)
);

// Route handling for updating an inventoryBilling by ID
inventoryBillingRouter.put(
  "/update/:inventoryBillingId",
  inventoryBillingService.updateInventoryBilling.bind(inventoryBillingService)
);

// Route handling for deleting an inventoryBilling by ID
inventoryBillingRouter.delete(
  "/delete/:inventoryBillingId",
  inventoryBillingService.deleteInventoryBilling.bind(inventoryBillingService)
);

// Route handling for getting all inventoryBillings
inventoryBillingRouter.get(
  "/getAllInventoryBillings",
  inventoryBillingService.getAllInventoryBillings.bind(inventoryBillingService)
);
