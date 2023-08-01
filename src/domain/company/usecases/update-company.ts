import { CompanyEntity, CompanyModel } from "../entinies/company";
import { CompanyRepository } from "../repositories/company-repository";

export interface UpdateCompanyUsecase {
  execute: (
    companyId: string,
    companyyData: Partial<CompanyModel>
  ) => Promise<CompanyEntity>;
}

export class updateCompany implements UpdateCompanyUsecase {
  private readonly companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  // async execute(adminId: string, adminData: AdminModel): Promise<AdminEntity> {
  //   return await this.adminRepository.updateAdmin(adminId, adminData);
  // }
  // UpdateAdminUsecase
  async execute(
    companyId: string,
    companyData: Partial<CompanyModel>
  ): Promise<CompanyEntity> {
    const existingCompany: CompanyEntity | null =
      await this.companyRepository.getCompanyById(companyId);

    if (!existingCompany) {
      throw new Error("Company not found.");
    }

    // Perform the partial update by merging adminData with existingAdmin
    const updatedCompanyData: CompanyModel = {
      ...existingCompany,
      ...companyData,
    };

    // Save the updatedAdminData to the repository
    await this.companyRepository.updateCompany(companyId, updatedCompanyData);

    // Fetch the updated company entity from the repository
    const updatedCompanyEntity: CompanyEntity | null =
      await this.companyRepository.getCompanyById(companyId);

    if (!updatedCompanyEntity) {
      throw new Error("Company not found after update.");
    }

    return updatedCompanyEntity;
  }
}
