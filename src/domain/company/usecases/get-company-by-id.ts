import { Either } from "monet";
import { CompanyEntity } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetCompanyByIdUsecase {
  execute: (companyId: string) => Promise<Either<ErrorClass, CompanyEntity>>;
}

export class GetCompanyById implements GetCompanyByIdUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyId: string): Promise<Either<ErrorClass, CompanyEntity>> {
    return await this.companyRepository.getCompanyById(companyId);
  }
}
