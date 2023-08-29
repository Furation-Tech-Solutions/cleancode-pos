import { ErrorClass } from "@presentation/error-handling/api-error";
import { CompanyModel, CompanyEntity } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";
import {Either,Right,Left} from "monet";


export interface CreateCompanyUsecase {
  execute: (comapnyData: CompanyModel) => Promise<Either<ErrorClass,CompanyEntity>>;
}

export class CreateCompany implements CreateCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyData: CompanyModel): Promise<Either<ErrorClass,CompanyEntity>> {
    return await this.companyRepository.createCompany(companyData);
  }
}
