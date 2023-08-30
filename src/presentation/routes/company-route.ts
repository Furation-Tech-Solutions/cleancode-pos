import mongoose from "mongoose";
import { Router } from "express";
import { CompanyServices } from "@presentation/services/company-services";
import { CompanyDataSourceImpl } from "@data/company/datasources/company-data-source";
import { CompanyRepositoryImpl } from "@data/company/repositories/company-repositories-impl";
import { CreateCompany } from "@domain/company/usecases/create-company";
import { DeleteCompany } from "@domain/company/usecases/delete-company";
import { GetCompanyById } from "@domain/company/usecases/get-company-by-id";
import { GetAllCompanys } from "@domain/company/usecases/get-all-companys";
import { UpdateCompany } from "@domain/company/usecases/update-company";
import validateBodyMiddleware from "@presentation/middlewares/company/validator-middleware";

// Create an instance of the CompanyDataSourceImpl and pass the mongoose connection
const companyDataSource = new CompanyDataSourceImpl(mongoose.connection);

// Create an instance of the CompanyRepositoryImpl and pass the CompanyDataSourceImpl
const companyRepository = new CompanyRepositoryImpl(companyDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createCompanyUsecase = new CreateCompany(companyRepository);
const deleteCompanyUsecase = new DeleteCompany(companyRepository);
const getCompanyByIdUsecases = new GetCompanyById(companyRepository);
const getAllCompanys = new GetAllCompanys(companyRepository);
const updateCompany = new UpdateCompany(companyRepository);

// Initialize AdminService and inject required dependencies
const companyService = new CompanyServices(
  createCompanyUsecase,
  deleteCompanyUsecase,
  getCompanyByIdUsecases,
  getAllCompanys,
  updateCompany
);

// Create an Express router
export const companyRouter = Router();

// Route handling for creating a new company
companyRouter.post(
  "/new",
  validateBodyMiddleware,
  companyService.createCompany.bind(companyService)
);

// Route handling for getting an company by ID
companyRouter.get(
  "/show/:companyId",
  companyService.getCompanyById.bind(companyService)
);

// Route handling for getting all companies
companyRouter.get("/list", companyService.getAllCompanys.bind(companyService));

// Route handling for updating an compnay by ID
companyRouter.put(
  "/update/:companyId",
  companyService.updateCompany.bind(companyService)
);

// Route handling for deleting an company by ID
companyRouter.delete(
  "/delete/:companyId",
  companyService.deleteCompany.bind(companyService)
);
