import { ReportEntity } from "@domain/report/entities/report";
import { ReportRepository } from "@domain/report/repositories/report-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetReportByIdUsecase {
  execute: (reportId: string) => Promise<Either<ErrorClass, ReportEntity | null>>;
}

export class GetReportById implements GetReportByIdUsecase {
  private readonly reportRepository:ReportRepository;

  constructor(reportRepository: ReportRepository) {
    this.reportRepository = reportRepository;
  }

  async execute(reportId: string): Promise<Either<ErrorClass, ReportEntity | null>> {
    return await this.reportRepository.getReportById(reportId);
  }
}