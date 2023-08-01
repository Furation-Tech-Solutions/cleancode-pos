import mongoose from "mongoose";
import { Router } from "express";
import { CompanyServices } from "@presentation/services/company-services";
import { CompanyDataSourceImpl } from "@data/company/datasources/company-data-source";
import { CompanyRepositoryImpl } from "@data/company/repositories/company-repositories-impl";
import { CreateCompany } from "@domain/company/usecases/create-company";
import { DeleteCompany } from "@domain/company/usecases/delete-company";

// Create an instance of the CompanyDataSourceImpl and pass the mongoose connection
const companyDataSource = new CompanyDataSourceImpl(mongoose.connection);

// Create an instance of the CompanyRepositoryImpl and pass the CompanyDataSourceImpl
const companyRepository = new CompanyRepositoryImpl(companyDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createCompanyUsecase = new CreateCompany(companyRepository);
const deleteCompanyUsecase = new DeleteCompany(companyRepository);

// Initialize AdminService and inject required dependencies
const companyService = new CompanyServices(
  createCompanyUsecase,
  deleteCompanyUsecase
);

// Create an Express router
export const companyRouter = Router();

// Route handling for creating a new admin
companyRouter.post(
  "/new",
  companyService.createCompany.bind(companyService)
);

// Route handling for getting an admin by ID
// companyRouter.get("/:companyId", companyService.getAdminById.bind(companyService));

// // Route handling for updating an admin by ID
// companyRouter.put("/:adminId", companyService.updateAdmin.bind(companyService));

// Route handling for deleting an admin by ID
companyRouter.delete(
  "/:companyId",
  companyService.deleteCompany.bind(companyService)
);

// // Route handling for getting all admins
// companyRouter.get("/", companyService.getAllAdmins.bind(companyService));
