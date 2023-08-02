import { CompanyEntity } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";

export interface GetCompanyByIdUsecase {
  execute: (companyId: string) => Promise<CompanyEntity | null>;
}


export class GetCompanyById implements GetCompanyByIdUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyId: string): Promise<CompanyEntity | null> {
    return await this.companyRepository.getCompanyById(companyId);
  }
}
