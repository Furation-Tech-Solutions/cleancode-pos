import { CompanyEntity } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";

export interface GetAllCompanysUsecase {
  execute: () => Promise<CompanyEntity[]>;
}

export class GetAllCompanys implements GetAllCompanysUsecase {
  private readonly companyRepository: CompanyRepository;
  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(): Promise<CompanyEntity[]> {
    return await this.companyRepository.getCompanies();
  }
}
