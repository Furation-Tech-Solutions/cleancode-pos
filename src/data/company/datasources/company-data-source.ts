import mongoose from "mongoose";
import { CompanyModel } from "@domain/company/entinies/company";
import { Company } from "../models/company-model";
import ApiError from "@presentation/error-handling/api-error";

//Create AdminDataSourse Interface
export interface CompanyDataSource {
  create(company: CompanyModel): Promise<any>;
  update(id: String, company: CompanyModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAllCompany(): Promise<any[]>;
}

//Company Data Source is comunicate with data base

export class CompanyDataSourceImpl implements CompanyDataSource {
  constructor(private db: mongoose.Connection) {}
  
  async create(company: CompanyModel): Promise<any> {
    const existingCompany = await Company.findOne({ email: company.email });
    if (existingCompany) {
      throw ApiError.emailExits();
    }

    const companyData = new Company(company);
    const createdCompany = await companyData.save();

    return createdCompany.toObject();
  }

  async update(id: string, company: CompanyModel): Promise<any> {
    const updatedCompany = await Company.findByIdAndUpdate(id, company, {
      new: true,
    }); // No need for conversion here
    return updatedCompany ? updatedCompany.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Company.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const company = await Company.findById(id);
    return company ? company.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllCompany(): Promise<any[]> {
    const company = await Company.find();
    return company.map((company) => company.toObject()); // Convert to plain JavaScript objects before returning
  }
}
