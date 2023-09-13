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
import { ErrorClass } from "@presentation/error-handling/api-error";

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
    const companyID: string = req.params.companyId;

    // Call the DeleteCompanyUsecase to get the company by ID and delete    
    const updatedCompanyEntity: CompanyEntity = CompanyMapper.toEntity(
      { active: false },
      true
    );

    const updatedCompany: Either<ErrorClass, CompanyEntity> = await this.updateCompnayUsecases.execute(
      companyID,
      updatedCompanyEntity
    );

    updatedCompany.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CompanyEntity) => {
        const responseData = CompanyMapper.toModel(result);
        return res.json(responseData)
      }
    );
  }

  async getCompanyById(req: Request, res: Response): Promise<void> {
    const companyId: string = req.params.companyId;

    // Call the GetCompanyByIdUsecase to get the company by ID
    const company: Either<ErrorClass, CompanyEntity | null> =
      await this.getCompanyByIdUsecases.execute(companyId);

    company.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CompanyEntity | null) => {
        const resData = CompanyMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllCompanys(
    req: Request,
    res: Response, next: NextFunction
  ): Promise<void> {
    // Call the GetAllCompanysUsecase to get all companys
    const companys: Either<ErrorClass, CompanyEntity[]> =
      await this.getAllCompanysUsecases.execute();

    companys.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CompanyEntity[]) => {
        // Filter out tables with del_status set to "Deleted"
        const nonDeletedCompanys = result.filter((company) => company.active !== false);

        // Convert compnays from an array of CompanyEntity to an array of plain JSON objects using CompanyMapper
        const responseData = nonDeletedCompanys.map((company) =>
          CompanyMapper.toEntity(company)
        );
        // Send the admins as a JSON response
        return res.json(responseData);
      }
    );
  }

  async updateCompany(req: Request, res: Response): Promise<void> {
    const companyId: string = req.params.companyId;
    const companyData: CompanyModel = req.body;

    // Get the existing company by ID
    const existingCompany: Either<ErrorClass, CompanyEntity> =
      await this.getCompanyByIdUsecases.execute(companyId);

    existingCompany.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (existingCompanyData: CompanyEntity) => {
        // Convert companyData from CompanyModel to CompanyEntity using CompanyMapper
        const updatedCompanyEntity: CompanyEntity = CompanyMapper.toEntity(
          companyData,
          true,
          existingCompanyData
        );

        // Call the UpdateCompanyUsecase to update the company
        const updatedCompany: Either<ErrorClass, CompanyEntity> =
          await this.updateCompnayUsecases.execute(
            companyId,
            updatedCompanyEntity
          );

        updatedCompany.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (result: CompanyEntity) => {
            const resData = CompanyMapper.toEntity(result, true);
            res.json(resData);
          }
        );
      }
    );
  }
}
