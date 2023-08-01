import { NextFunction, Request, Response } from "express";
import {
  CompanyModel,
  CompanyEntity,
  CompanyMapper,
} from "@domain/company/entinies/company";

import { CreateCompanyUsecase } from "@domain/company/usecases/create-company";
import { DeleteCompanyUsecase } from "@domain/company/usecases/delete-company";
import { GetCompanyByIdUsecase } from "@domain/company/usecases/get-company-by-id";
import { GetAllCompanysUsecase } from "@domain/company/usecases/get-all-companys";

import ApiError from "@presentation/error-handling/api-error";

export class CompanyServices {
  private readonly createCompanyUsecases: CreateCompanyUsecase;
  private readonly deleteCompanyUsecases: DeleteCompanyUsecase;
  private readonly getCompanyByIdUsecases: GetCompanyByIdUsecase;
  private readonly getAllCompanysUsecases: GetAllCompanysUsecase;

  constructor(
    createCompanyUsecases: CreateCompanyUsecase,
    deleteCompanyUsecases: DeleteCompanyUsecase,
    getCompanyByIdUsecases: GetCompanyByIdUsecase,
    getAllCompanysUsecases: GetAllCompanysUsecase
  ) {
    (this.createCompanyUsecases = createCompanyUsecases),
      (this.deleteCompanyUsecases = deleteCompanyUsecases),
      (this.getCompanyByIdUsecases = getCompanyByIdUsecases),
      (this.getAllCompanysUsecases = getAllCompanysUsecases);
  }

  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      // Extract company data from the request body and convert it to Company Model
      const comapnyData: CompanyModel = CompanyMapper.toModel(req.body);

      // Call the CreateAdminUsecase to create the admin
      const newCompany: CompanyEntity =
        await this.createCompanyUsecases.execute(comapnyData);

      // Convert newAdmin from AdminEntity to the desired format using AdminMapper
      const responseData = CompanyMapper.toEntity(newCompany, true);

      // Send the created admin as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyID: string = req.params.companyId;

      // Call the DeleteCompanyUsecase to delete the admin
      await this.deleteCompanyUsecases.execute(companyID);

      // Send a success message as a JSON response
      res.json({ message: "Company deleted successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getCompanyById(req: Request, res: Response): Promise<void> {
    try {
      const companyId: string = req.params.companyId;

      // Call the GetCompanyByIdUsecase to get the company by ID
      const company: CompanyEntity | null =
        await this.getCompanyByIdUsecases.execute(companyId);

      if (company) {
        // Convert company from CompanyEntity to plain JSON object using ComapnyMapper
        const responseData = CompanyMapper.toModel(company);

        // Send the comapny as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        ApiError.notFound();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getAllCompanys(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Call the GetAllCompanysUsecase to get all companys
      const companys: CompanyEntity[] =
        await this.getAllCompanysUsecases.execute();

      // Convert compnays from an array of CompanyEntity to an array of plain JSON objects using CompanyMapper
      const responseData = companys.map((company) =>
        CompanyMapper.toModel(company)
      );

      // Send the admins as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  



}
