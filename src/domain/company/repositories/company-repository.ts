import { CompanyModel, CompanyEntity } from "../entinies/company";

export interface CompanyRepository {
  createCompany(company: CompanyModel): Promise<CompanyEntity>;
  deleteCompany(id: string): Promise<void>;
  getCompanies(): Promise<CompanyEntity[]>;
  getCompanyById(id: string): Promise<CompanyEntity | null>;
}
