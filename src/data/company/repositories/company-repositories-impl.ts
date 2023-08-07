import { CompanyModel, CompanyEntity } from "@domain/company/entinies/company";
import { CompanyRepository } from "@domain/company/repositories/company-repository";
import { CompanyDataSource } from "../datasources/company-data-source";
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class CompanyRepositoryImpl implements CompanyRepository {
  private readonly dataSource: CompanyDataSource;

  constructor(dataSourse: CompanyDataSource) {
    this.dataSource = dataSourse;
  }

  async createCompany(
    company: CompanyModel
  ): Promise<Either<ErrorClass, CompanyEntity>> {
    try {
      const i = await this.dataSource.create(company);
      return Right<ErrorClass, CompanyEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, CompanyEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, CompanyEntity>(ApiError.badRequest());
    }
  }

  async deleteCompany(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateCompany(
    id: string,
    data: CompanyModel
  ): Promise<Either<ErrorClass, CompanyEntity>> {
    try {
      const i = await this.dataSource.update(id, data);
      return Right<ErrorClass, CompanyEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, CompanyEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, CompanyEntity>(ApiError.badRequest());
    }
    // return await this.dataSource.update(id, data);
  }

  async getCompanies(): Promise<CompanyEntity[]> {
    return await this.dataSource.getAllCompany();
  }

  async getCompanyById(id: string): Promise<Either<ErrorClass, CompanyEntity>> {
    // return await this.dataSource.read(id);
    try {
      const i = await this.dataSource.read(id);
      return Right<ErrorClass, CompanyEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "notfound") {
        return Left<ErrorClass, CompanyEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, CompanyEntity>(ApiError.badRequest());
    }
  }
}
