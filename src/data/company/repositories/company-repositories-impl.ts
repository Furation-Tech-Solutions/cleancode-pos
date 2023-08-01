import { CompanyModel, CompanyEntity } from "@domain/company/entinies/company";
import { CompanyRepository } from "@domain/company/repositories/company-repository";
import { CompanyDataSource } from "../datasources/company-data-source";

export class CompanyRepositoryImpl implements CompanyRepository {
  private readonly dataSource: CompanyDataSource;

  constructor(dataSourse: CompanyDataSource) {
    this.dataSource = dataSourse;
  }

  async createCompany(company: CompanyModel): Promise<CompanyEntity> {
    return await this.dataSource.create(company);
  }

  async deleteCompany(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateCompany(id: string, data: CompanyModel): Promise<CompanyEntity> {
    return await this.dataSource.update(id, data);
  }

  async getCompanies(): Promise<CompanyEntity[]> {
    return await this.dataSource.getAllCompany();
  }

  async getCompanyById(id: string): Promise<CompanyEntity | null> {
    return await this.dataSource.read(id);
  }
}
