// Express API request populate the Company Model
import { Date } from "mongoose";
export class CompanyModel {
  constructor(
    public name: string = "",
    public email: string = "",
    public phone: string = "",
    public gstNo: string = "",
    public companyLogo: string | null = null,
    public ownerName: string = "",
    public brand: string = "",
    public active: boolean,
    public createdAt: Date
  ) {}
}

// Company Entity provided by Company Repository is converted to Express API Response
export class CompanyEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public email: string,
    public phone: string, // Changed the type to string as phone numbers can contain characters like '+', '-', etc.
    public gstNo: string = "",
    public companyLogo: string | null,
    public ownerName: string = "",
    public brand: string,
    public active: boolean,
    public createdAt: Date
  ) {}
}

/* ================================================= */
export class CompanyMapper {
  static toEntity(
    companyData: any,
    includeId?: boolean,
    existingCompany?: CompanyEntity
  ): CompanyEntity {
    if (existingCompany != null) {
      // If existingCompany is provided, merge the data from companyData with the existingCompany
      return {
        ...existingCompany,
        name:
          companyData.name !== undefined
            ? companyData.name
            : existingCompany.name,
        email:
          companyData.email !== undefined
            ? companyData.email
            : existingCompany.email,
        phone:
          companyData.phone !== undefined
            ? companyData.phone
            : existingCompany.phone,
        gstNo:
          companyData.gstNo !== undefined
            ? companyData.gstNo
            : existingCompany.gstNo,
        companyLogo:
          companyData.companyLogo !== undefined
            ? companyData.companyLogo
            : existingCompany.companyLogo,
        ownerName:
          companyData.ownerName !== undefined
            ? companyData.ownerName
            : existingCompany.ownerName,
        brand:
          companyData.brand !== undefined
            ? companyData.brand
            : existingCompany.brand,
        active:
          companyData.active !== undefined
            ? companyData.active
            : existingCompany.active,
        createdAt:
          companyData.createdAt !== undefined
            ? companyData.createdAt
            : existingCompany.createdAt,
      };
    } else {
      // If existingCompany is not provided, create a new CompanyEntity using companyData
      const companyEntity: CompanyEntity = {
        id: includeId
          ? companyData._id
            ? companyData._id.toString()
            : undefined
          : companyData._id.toString(),
        name: companyData.name,
        email: companyData.email,
        phone: companyData.phone,
        gstNo: companyData.gstNo,
        companyLogo: companyData.companyLogo,
        ownerName: companyData.ownerName,
        brand: companyData.brand,
        active: companyData.active,
        createdAt: companyData.createdAt,
      };
      return companyEntity;
    }
  }
  static toModel(company: CompanyEntity): any {
    return {
      name: company.name,
      email: company.email,
      phone: company.phone,
      gstNo: company.gstNo,
      companyLogo: company.companyLogo,
      ownerName: company.ownerName,
      brand: company.brand,
      // active: company.active,
      // createdAt: company.createdAt,
    };
  }
}
