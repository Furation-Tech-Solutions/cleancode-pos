import { Either } from "monet";
import { CompanyEntity, CompanyModel } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UpdateCompanyUsecase {
  execute: (
    companyId: string,
    // companyData: Partial<CompanyModel>
    comapnyData:CompanyModel
  ) => Promise<Either<ErrorClass, CompanyEntity>>;
}

export class UpdateCompany implements UpdateCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  // async execute: (companyId: string, companyData: Partial<CompanyModel>) => Promise<Either<ErrorClass,CompanyEntity>>{
  //   return await this.companyRepository.updateCompany(companyId, updatedCompcompanyDataanyData);
  // };

  async execute(
    companyId: string,
    companyData: CompanyModel
  ): Promise<Either<ErrorClass, CompanyEntity>> {
    return await this.companyRepository.updateCompany(companyId, companyData);
  }

  // async execute(
  //   companyId: string,
  //   companyData: Partial<CompanyModel>
  // ): Promise<Either<ErrorClass,CompanyEntity>> {
  //   const existingCompany: CompanyEntity | null =
  //     await this.companyRepository.getCompanyById(companyId);

  //   if (!existingCompany) {
  //     throw new Error("Company not found.");
  //   }

  //   // Perform the partial update by merging companyData with existingCompany
  //   const updatedCompanyData: CompanyModel = {
  //     ...existingCompany,
  //     ...companyData,
  //   };

  //   // Save the updatedCompanyData to the repository
  //   await this.companyRepository.updateCompany(companyId, updatedCompanyData);

  //   // Fetch the updated company entity from the repository
  //   const updatedCompanyEntity: CompanyEntity | null =
  //     await this.companyRepository.getCompanyById(companyId);

  //   if (!updatedCompanyEntity) {
  //     throw new Error("Company not found after update.");
  //   }

  //   return updatedCompanyEntity;
  // }
}
