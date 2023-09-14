import { ReportModel, ReportEntity } from "@domain/report/entities/report";
import { ReportRepository } from "@domain/report/repositories/report-repository";
import { ReportDataSource } from "@data/report/datasources/report-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class ReportRepositoryImpl implements ReportRepository {
  private readonly dataSource: ReportDataSource;

  constructor(dataSource: ReportDataSource) {
    this.dataSource = dataSource;
  }

  async createReport(report: ReportModel): Promise<Either<ErrorClass, ReportEntity>> {
    // return await this.dataSource.create(report);
    try {
      let i = await this.dataSource.create(report);
      return Right<ErrorClass, ReportEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, ReportEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, ReportEntity>(ApiError.badRequest());
    }
  }

  async deleteReport(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateReport(id: string, data: ReportModel): Promise<Either<ErrorClass, ReportEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, ReportEntity>(i);
    } catch {
      return Left<ErrorClass, ReportEntity>(ApiError.badRequest());
    }
  }

  async getReports(): Promise<Either<ErrorClass, ReportEntity[]>> {
    // return await this.dataSource.getAllReports();
    try {
      let i = await this.dataSource.getAllReports();
      return Right<ErrorClass, ReportEntity[]>(i);
    } catch {
      return Left<ErrorClass, ReportEntity[]>(ApiError.badRequest());
    }
  }

  async getReportById(id: string): Promise<Either<ErrorClass, ReportEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, ReportEntity | null>(i);
    } catch {
      return Left<ErrorClass, ReportEntity | null>(ApiError.badRequest());
    }
  }
}