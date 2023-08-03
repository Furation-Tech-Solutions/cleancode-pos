import { CompanyModel, CompanyEntity } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";

export interface CreateCompanyUsecase {
  execute: (comapnyData: CompanyModel) => Promise<CompanyEntity>;
}

export class CreateCompany implements CreateCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyData: CompanyModel): Promise<CompanyEntity> {
    return await this.companyRepository.createCompany(companyData);
  }
}
