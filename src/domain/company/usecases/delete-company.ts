import { CompanyRepository } from "../repositories/company-repository";

export interface DeleteCompanyUsecase {
  execute: (companyID: string) => Promise<void>;
}

export class DeleteCompany implements DeleteCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyID: string): Promise<void> {
    await this.companyRepository.deleteCompany(companyID);
  }
}
