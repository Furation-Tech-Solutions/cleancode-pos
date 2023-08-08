import { Either } from "monet";
import { CompanyEntity, CompanyModel } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UpdateCompanyUsecase {
  execute: (
    companyId: string,
    comapnyData: CompanyModel
  ) => Promise<Either<ErrorClass, CompanyEntity>>;
}

export class UpdateCompany implements UpdateCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(
    companyId: string,
    companyData: CompanyModel
  ): Promise<Either<ErrorClass, CompanyEntity>> {
    return await this.companyRepository.updateCompany(companyId, companyData);
  }
}
