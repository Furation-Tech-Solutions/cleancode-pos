// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { AdminService } from "@presentation/services/admin-services";
import { AdminDataSourceImpl } from "@data/admin/datasources/admin-data-source";
import { AdminRepositoryImpl } from "@data/admin/repositories/admin-repository-impl";
import { CreateAdmin } from "@domain/admin/usecases/create-admin";
import { DeleteAdmin } from "@domain/admin/usecases/delete-admin";
import { GetAdminById } from "@domain/admin/usecases/get-admin-by-id";
import { GetAllAdmins } from "@domain/admin/usecases/get-all-admins";
import { UpdateAdmin } from "@domain/admin/usecases/update-admin";
import { LoginAdmin } from "@domain/admin/usecases/login-admin";
import { LogoutAdmin} from "@domain/admin/usecases/logout-admin";
import { isAuthenticated } from "@presentation/middlewares/jwtAuthentication/auth";


// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const adminDataSource = new AdminDataSourceImpl(mongoose.connection);

// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const adminRepository = new AdminRepositoryImpl(adminDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createAdminUsecase = new CreateAdmin(adminRepository);
const deleteAdminUsecase = new DeleteAdmin(adminRepository);
const getAdminByIdUsecase = new GetAdminById(adminRepository);
const updateAdminUsecase = new UpdateAdmin(adminRepository);
const getAllAdminsUsecase = new GetAllAdmins(adminRepository);
const loginAdminUsecase = new LoginAdmin(adminRepository);
const logoutAdminUsecase = new LogoutAdmin(adminRepository);


// Initialize AdminService and inject required dependencies
const adminService = new AdminService(
  createAdminUsecase,
  deleteAdminUsecase,
  getAdminByIdUsecase,
  updateAdminUsecase,
  getAllAdminsUsecase,
  loginAdminUsecase,
  logoutAdminUsecase
);

// Create an Express router
export const adminRouter = Router();

// Route handling for creating a new admin
adminRouter.post("/create", adminService.createAdmin.bind(adminService));

// Route handling for getting an admin by ID
adminRouter.get(
  "/getById/:adminId",
  adminService.getAdminById.bind(adminService)
);

// Route handling for updating an admin by ID
adminRouter.put("/update/:adminId", adminService.updateAdmin.bind(adminService));

// Route handling for deleting an admin by ID
adminRouter.delete("/delete/:adminId", adminService.deleteAdmin.bind(adminService));

// Route handling for getting all admins
adminRouter.get("/getAllAdmins", adminService.getAllAdmins.bind(adminService));

//Route handling for login
adminRouter.post("/login", adminService.loginAdmin.bind(adminService));

//route handling for logout
adminRouter.get("/logout", adminService.logOut.bind(adminService));