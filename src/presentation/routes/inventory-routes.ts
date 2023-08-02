// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { InventoryService } from "@presentation/services/inventory-services";
import { InventoryDataSource, InventoryDataSourceImpl } from "@data/inventory/datasource/inventory-data-source";
import { InventoryRepositoryImpl } from "@data/inventory/repositories/inventory-repository-impl";
import { CreateInventory } from "@domain/inventory/usecases/create-inventory";
import { DeleteInventory } from "@domain/inventory/usecases/delete-inventory";
import { GetInventoryById } from "@domain/inventory/usecases/get-inventory-by-id";
import { GetAllInventory } from "@domain/inventory/usecases/get-all-inventories";
import { UpdateInventory } from "@domain/inventory/usecases/update-inventory";



// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const inventoryDataSource = new InventoryDataSourceImpl(mongoose.connection);

// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const inventoryRepository = new InventoryRepositoryImpl(inventoryDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createInventoryUsecase = new CreateInventory(inventoryRepository);
const deleteInventoryUsecase = new DeleteInventory(inventoryRepository);
const getInventoryByIdUsecase = new GetAdminById(adminRepository);
const updateInventoryUsecase = new UpdateAdmin(adminRepository);
const getAllAdminsUsecase = new GetAllAdmins(adminRepository);

// Initialize AdminService and inject required dependencies
const adminService = new AdminService(
  createAdminUsecase,
  deleteAdminUsecase,
  getAdminByIdUsecase,
  updateAdminUsecase,
  getAllAdminsUsecase
);

// Create an Express router
export const adminRouter = Router();

// Route handling for creating a new admin
adminRouter.post("/", adminService.createAdmin.bind(adminService));

// Route handling for getting an admin by ID
adminRouter.get("/:adminId", adminService.getAdminById.bind(adminService));

// Route handling for updating an admin by ID
adminRouter.put("/:adminId", adminService.updateAdmin.bind(adminService));

// Route handling for deleting an admin by ID
adminRouter.delete("/:adminId", adminService.deleteAdmin.bind(adminService));

// Route handling for getting all admins
adminRouter.get("/", adminService.getAllAdmins.bind(adminService));
