import { CompanyModel, CompanyEntity } from "../entinies/company";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface CompanyRepository {
  createCompany(
    company: CompanyModel
  ): Promise<Either<ErrorClass, CompanyEntity>>;
  deleteCompany(id: string): Promise<void>;
  getCompanies(): Promise<CompanyEntity[]>;
  getCompanyById(id: string): Promise<CompanyEntity | null>;
  updateCompany(id: string, data: CompanyModel): Promise<Either<ErrorClass, CompanyEntity>>;
}
