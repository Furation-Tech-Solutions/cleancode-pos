import { ReportEntity, ReportModel } from "@domain/report/entities/report";
import { ReportRepository } from "@domain/report/repositories/report-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateReportUsecase {
  execute: (reportData: ReportModel) => Promise<Either<ErrorClass, ReportEntity>>;
}

export class CreateReport implements CreateReportUsecase {
  private readonly ReportRepository: ReportRepository;

  constructor(ReportRepository: ReportRepository) {
    this.ReportRepository = ReportRepository;
  }

  async execute(reportData: ReportModel): Promise<Either<ErrorClass, ReportEntity>> {
    return await this.ReportRepository.createReport(reportData);
  }
}