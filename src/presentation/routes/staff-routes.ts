// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { StaffService } from "@presentation/services/staff-services";
import { StaffDataSourceImpl } from "@data/staff/datasource/staff-data-source";
import { StaffRepositoryImpl } from "@data/staff/repositories/staff-repository-impl";
import { CreateStaff } from "@domain/staff/usecases/create-staff";
import { DeleteStaff } from "@domain/staff/usecases/delete-staff";
import { GetStaffById } from "@domain/staff/usecases/get-staff-by-id";
import { GetAllStaffs } from "@domain/staff/usecases/get-all-staff";
import { UpdateStaff } from "@domain/staff/usecases/update-staff";
import validateStaffMiddleware from "@presentation/middlewares/staff/validation-middleware";

// Create an instance of the staffDataSourceImpl and pass the mongoose connection
const staffDataSource = new StaffDataSourceImpl(mongoose.connection);

// Create an instance of the staffRepositoryImpl and pass the staffDataSourceImpl
const staffRepository = new StaffRepositoryImpl(staffDataSource);

// Create instances of the required use cases and pass the StaffRepositoryImpl
const createStaffUsecase = new CreateStaff(staffRepository);
const deleteStaffUsecase = new DeleteStaff(staffRepository);
const getStaffByIdUsecase = new GetStaffById(staffRepository);
const updateStaffUsecase = new UpdateStaff(staffRepository);
const getAllStaffsUsecase = new GetAllStaffs(staffRepository);

// Initialize StaffService and inject required dependencies
const staffService = new StaffService(
  createStaffUsecase,
  deleteStaffUsecase,
  getStaffByIdUsecase,
  updateStaffUsecase,
  getAllStaffsUsecase
);

// Create an Express router
export const staffRouter = Router();

// Route handling for creating a new staff
staffRouter.post("/new", validateStaffMiddleware, staffService.createStaff.bind(staffService));

// Route handling for getting an staff by ID
staffRouter.get("/show/:staffId", staffService.getStaffById.bind(staffService));

// Route handling for updating an staff by ID
staffRouter.put("/update/:staffId", staffService.updateStaff.bind(staffService));

// Route handling for deleting an staff by ID
staffRouter.delete("/delete/:staffId", staffService.deleteStaff.bind(staffService));

// Route handling for getting all staffs
staffRouter.get("/list", staffService.getAllStaffs.bind(staffService));
