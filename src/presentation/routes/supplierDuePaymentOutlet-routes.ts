// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { SupplierDuePaymentOutletService } from "@presentation/services/supplierDuePaymentOutlet-services";
import { SupplierDuePaymentOutletDataSourceImpl } from "@data/supplierDuePaymentOutlet/datasource/supplierDuePaymentOutlet-data-source";
import { SupplierDuePaymentOutletRepositoryImpl } from "@data/supplierDuePaymentOutlet/repositories/supplierDuePaymentOutlet-repository-impl";
import { CreateSupplierDuePaymentOutlet } from "@domain/supplierDuePaymentOutlet/usecases/create-supplierDuePaymentOutlet";
import { DeleteSupplierDuePaymentOutlet } from "@domain/supplierDuePaymentOutlet/usecases/delete-supplierDuePaymentOutlet";
import { GetSupplierDuePaymentOutletById } from "@domain/supplierDuePaymentOutlet/usecases/get-supplierDuePaymentOutlet-by-id";
import { GetAllSupplierDuePaymentOutlets } from "@domain/supplierDuePaymentOutlet/usecases/get-all-supplierDuePaymentOutlets";
import { UpdateSupplierDuePaymentOutlet } from "@domain/supplierDuePaymentOutlet/usecases/update-supplierDuePaymentOutlet";
import validateSupplierDuePaymentOutletMiddleware from "@presentation/middlewares/supplierDuePaymentOutlet/validation-middleware";

// Create an instance of the SupplierDuePaymentOutletDataSourceImpl and pass the mongoose connection
const supplierDuePaymentOutletDataSource = new SupplierDuePaymentOutletDataSourceImpl(mongoose.connection);

// Create an instance of the SupplierDuePaymentOutletRepositoryImpl and pass the SupplierDuePaymentOutletDataSourceImpl
const supplierDuePaymentOutletRepository = new SupplierDuePaymentOutletRepositoryImpl(supplierDuePaymentOutletDataSource);

// Create instances of the required use cases and pass the SupplierDuePaymentOutletRepositoryImpl
const createSupplierDuePaymentOutletUsecase = new CreateSupplierDuePaymentOutlet(supplierDuePaymentOutletRepository);
const deleteSupplierDuePaymentOutletUsecase = new DeleteSupplierDuePaymentOutlet(supplierDuePaymentOutletRepository);
const getSupplierDuePaymentOutletByIdUsecase = new GetSupplierDuePaymentOutletById(supplierDuePaymentOutletRepository);
const updateSupplierDuePaymentOutletUsecase = new UpdateSupplierDuePaymentOutlet(supplierDuePaymentOutletRepository);
const getAllSupplierDuePaymentOutletsUsecase = new GetAllSupplierDuePaymentOutlets(supplierDuePaymentOutletRepository);

// Initialize SupplierDuePaymentOutletService and inject required dependencies
const supplierDuePaymentOutletService = new SupplierDuePaymentOutletService(
  createSupplierDuePaymentOutletUsecase,
  deleteSupplierDuePaymentOutletUsecase,
  getSupplierDuePaymentOutletByIdUsecase,
  updateSupplierDuePaymentOutletUsecase,
  getAllSupplierDuePaymentOutletsUsecase
);

// Create an Express router
export const supplierDuePaymentOutletRouter = Router();

// Route handling for creating a new supplierDuePaymentOutlet
supplierDuePaymentOutletRouter.post("/new", validateSupplierDuePaymentOutletMiddleware, supplierDuePaymentOutletService.createSupplierDuePaymentOutlet.bind(supplierDuePaymentOutletService));

// Route handling for getting an supplierDuePaymentOutlet by ID
supplierDuePaymentOutletRouter.get("/show/:supplierDuePaymentOutletId", supplierDuePaymentOutletService.getSupplierDuePaymentOutletById.bind(supplierDuePaymentOutletService));

// Route handling for updating an supplierDuePaymentOutlet by ID
supplierDuePaymentOutletRouter.put("/update/:supplierDuePaymentOutletId", supplierDuePaymentOutletService.updateSupplierDuePaymentOutlet.bind(supplierDuePaymentOutletService));

// Route handling for deleting an supplierDuePaymentOutlet by ID
supplierDuePaymentOutletRouter.delete("/delete/:supplierDuePaymentOutletId", supplierDuePaymentOutletService.deleteSupplierDuePaymentOutlet.bind(supplierDuePaymentOutletService));

// Route handling for getting all supplierDuePaymentOutlets
supplierDuePaymentOutletRouter.get("/list", supplierDuePaymentOutletService.getAllSupplierDuePaymentOutlets.bind(supplierDuePaymentOutletService));
