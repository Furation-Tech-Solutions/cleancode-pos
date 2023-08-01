import { NextFunction, Request, Response } from "express";
import {
  CompanyModel,
  CompanyEntity,
  CompanyMapper,
} from "@domain/company/entinies/company";

import { CreateCompanyUsecase } from "@domain/company/usecases/create-company";
import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";

import ApiError from "@presentation/error-handling/api-error";

export class CompanyServices {
  private readonly createCompanyUsecases: CreateCompanyUsecase;
  private readonly deleteCompanyUsecases: DeleteAdminUsecase;

  constructor(
    createCompanyUsecases: CreateCompanyUsecase,
    deleteCompanyUsecases: DeleteAdminUsecase
  ) {
    (this.createCompanyUsecases = createCompanyUsecases),
      (this.deleteCompanyUsecases = deleteCompanyUsecases);
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
      // console.log(error);
      
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

     const err =  ApiError.internalError();
     res.status(err.status).json(err.message)
    }
  }

  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyID: string = req.params.companyId;

      // Call the DeleteAdminUsecase to delete the admin
      await this.deleteCompanyUsecases.execute(companyID);

      // Send a success message as a JSON response
      res.json({ message: "Company deleted successfully." });
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err =  ApiError.internalError();
      res.status(err.status).json(err.message)
    }
  }
}
