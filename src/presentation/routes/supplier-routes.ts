// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { SupplierService } from "@presentation/services/supplier-services";
import { SupplierDataSourceImpl } from "@data/supplier/datasource/supplier-data-source";
import { SupplierRepositoryImpl } from "@data/supplier/repositories/supplier-repository-impl";
import { CreateSupplier } from "@domain/supplier/usecases/create-supplier";
import { DeleteSupplier } from "@domain/supplier/usecases/delete-supplier";
import { GetSupplierById } from "@domain/supplier/usecases/get-supplier-by-id";
import { GetAllSuppliers } from "@domain/supplier/usecases/get-all-suppliers";
import { UpdateSupplier } from "@domain/supplier/usecases/update-supplier";
import validateSupplierMiddleware from "@presentation/middlewares/supplier/validation-middleware";

// Create an instance of the SupplierDataSourceImpl and pass the mongoose connection
const supplierDataSource = new SupplierDataSourceImpl(mongoose.connection);

// Create an instance of the SupplierRepositoryImpl and pass the SupplierDataSourceImpl
const supplierRepository = new SupplierRepositoryImpl(supplierDataSource);

// Create instances of the required use cases and pass the SupplierRepositoryImpl
const createSupplierUsecase = new CreateSupplier(supplierRepository);
const deleteSupplierUsecase = new DeleteSupplier(supplierRepository);
const getSupplierByIdUsecase = new GetSupplierById(supplierRepository);
const updateSupplierUsecase = new UpdateSupplier(supplierRepository);
const getAllSuppliersUsecase = new GetAllSuppliers(supplierRepository);

// Initialize SupplierService and inject required dependencies
const supplierService = new SupplierService(
  createSupplierUsecase,
  deleteSupplierUsecase,
  getSupplierByIdUsecase,
  updateSupplierUsecase,
  getAllSuppliersUsecase
);

// Create an Express router
export const supplierRouter = Router();

// Route handling for creating a new supplier
supplierRouter.post("/create", validateSupplierMiddleware, supplierService.createSupplier.bind(supplierService));

// Route handling for getting an supplier by ID
supplierRouter.get("/getById/:supplierId", supplierService.getSupplierById.bind(supplierService));

// Route handling for updating an supplier by ID
supplierRouter.put("/update/:supplierId", supplierService.updateSupplier.bind(supplierService));

// Route handling for deleting an supplier by ID
supplierRouter.delete("/delete/:supplierId", supplierService.deleteSupplier.bind(supplierService));

// Route handling for getting all suppliers
supplierRouter.get("/getAllSuppliers", supplierService.getAllSuppliers.bind(supplierService));
