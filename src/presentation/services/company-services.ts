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
import { UpdateCompanyUsecase } from "@domain/company/usecases/update-company";
import { Either } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import companyRequestBodyValidator from "@presentation/middlewares/company/validator-middleware";

export class CompanyServices {
  private readonly createCompanyUsecases: CreateCompanyUsecase;
  private readonly deleteCompanyUsecases: DeleteCompanyUsecase;
  private readonly getCompanyByIdUsecases: GetCompanyByIdUsecase;
  private readonly getAllCompanysUsecases: GetAllCompanysUsecase;
  private readonly updateCompnayUsecases: UpdateCompanyUsecase;

  constructor(
    createCompanyUsecases: CreateCompanyUsecase,
    deleteCompanyUsecases: DeleteCompanyUsecase,
    getCompanyByIdUsecases: GetCompanyByIdUsecase,
    getAllCompanysUsecases: GetAllCompanysUsecase,
    updateCompnayUsecases: UpdateCompanyUsecase
  ) {
    (this.createCompanyUsecases = createCompanyUsecases),
      (this.deleteCompanyUsecases = deleteCompanyUsecases),
      (this.getCompanyByIdUsecases = getCompanyByIdUsecases),
      (this.getAllCompanysUsecases = getAllCompanysUsecases),
      (this.updateCompnayUsecases = updateCompnayUsecases);
  }

  async createCompany(req: Request, res: Response): Promise<void> {
    // Extract company data from the request body and convert it to Company Model
    const comapnyData: CompanyModel = CompanyMapper.toModel(req.body);
    // Call the CreateCompanyUsecase to create the compnay
    const newCompany: Either<ErrorClass, CompanyEntity> =
      await this.createCompanyUsecases.execute(comapnyData);

    newCompany.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CompanyEntity) => {
        const resData = CompanyMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
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

  async updateCompany(req: Request, res: Response): Promise<void> {
    // try {
    const companyId: string = req.params.companyId;
    const companyData: CompanyModel = req.body;

    // Get the existing company by ID
    const existingCompany: CompanyEntity | null =
      await this.getCompanyByIdUsecases.execute(companyId);

    if (!existingCompany) {
      // If company is not found, send a not found message as a JSON response
      ApiError.notFound();
      return;
    }

    // Convert companyData from CompanyModel to CompanyEntity using CompanyMapper
    const updatedCompanyEntity: CompanyEntity = CompanyMapper.toEntity(
      companyData,
      true,
      existingCompany
    );

    // Call the UpdateCompanyUsecase to update the
    const updatedCompany: Either<ErrorClass, CompanyEntity> =
      await this.updateCompnayUsecases.execute(companyId, updatedCompanyEntity);

    updatedCompany.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CompanyEntity) => {
        const resData = CompanyMapper.toEntity(result, true);
        return res.json(resData);
      }
    );

    // Convert updatedCompany from CompanyEntity to plain JSON object using CompanyMapper
    // const responseData = CompanyMapper.toModel(updatedCompany);

    // Send the updated admin as a JSON response
    // res.json(responseData);
    // } catch (error) {
    //   if (error instanceof ApiError) {
    //     res.status(error.status).json({ error: error.message });
    //   }
    //   ApiError.internalError();
    // }
  }
}
