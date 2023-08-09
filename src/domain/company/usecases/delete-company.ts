import { Either } from "monet";
import { CompanyRepository } from "../repositories/company-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface DeleteCompanyUsecase {
  execute: (companyID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteCompany implements DeleteCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyID: string): Promise<Either<ErrorClass, void>> {
    return await this.companyRepository.deleteCompany(companyID);
  }
}
