// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { PurchaseService } from "@presentation/services/purchase-services";
import { PurchaseDataSourceImpl } from "@data/purchase/datasource/purchase-data-source";
import { PurchaseRepositoryImpl } from "@data/purchase/repositories/purchase-repository-impl";
import { CreatePurchase } from "@domain/purchase/usecases/create-purchase";
import { DeletePurchase } from "@domain/purchase/usecases/delete-purchase";
import { GetPurchaseById } from "@domain/purchase/usecases/get-puchase-by-id";
import { UpdatePurchase } from "@domain/purchase/usecases/update-purchase";
import { GetAllPurchases } from "@domain/purchase/usecases/get-all-purchases";


// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const purchaseDataSource = new PurchaseDataSourceImpl(mongoose.connection);

// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const purchaseRepository = new PurchaseRepositoryImpl(purchaseDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createPurchaseUsecase = new CreatePurchase(purchaseRepository);
const getPurchaseByIdUsecase = new GetPurchaseById(purchaseRepository);
const getAllPurchaseUsecase = new GetAllPurchases(purchaseRepository);
const updatePurchaseUsecase = new UpdatePurchase(purchaseRepository);
const deletePurchaseUsecase = new DeletePurchase(purchaseRepository);

// Initialize AdminService and inject required dependencies
const purchaseService = new PurchaseService(
  createPurchaseUsecase,
  getPurchaseByIdUsecase,
  getAllPurchaseUsecase,
  updatePurchaseUsecase,
  deletePurchaseUsecase
);

// Create an Express router
export const purchaseRouter = Router();

// Route handling for creating a new purchase
purchaseRouter.post("/create",purchaseService.createPurchase.bind(purchaseService));

// Route handling for getting an inventory by ID
purchaseRouter.get("/getById/:purchaseId",purchaseService.getPurchaseById.bind(purchaseService));

// Route handling for updating an inventory by ID
purchaseRouter.put("/update/:purchaseId",purchaseService.updatePurchase.bind(purchaseService));

// Route handling for deleting an inventory by ID
purchaseRouter.delete("/delete/:purchaseId",purchaseService.deletePurchase.bind(purchaseService));

// Route handling for getting all inventories
purchaseRouter.get("/getAllPurchases",purchaseService.getAllPurchases.bind(purchaseService));
