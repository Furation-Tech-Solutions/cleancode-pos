import { ErrorClass } from "@presentation/error-handling/api-error";
import { CompanyEntity } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";
import { Either } from "monet";

export interface GetAllCompanysUsecase {
  execute: () => Promise<Either<ErrorClass, CompanyEntity[]>>;
}

export class GetAllCompanys implements GetAllCompanysUsecase {
  private readonly companyRepository: CompanyRepository;
  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(): Promise<Either<ErrorClass, CompanyEntity[]>> {
    return await this.companyRepository.getCompanies();
  }
}
