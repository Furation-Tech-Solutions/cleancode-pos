import { type ReportRepository } from "@domain/report/repositories/report-repository";
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";
export interface DeleteReportUsecase {
  execute: (reportId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteReport implements DeleteReportUsecase {
  private readonly reportRepository: ReportRepository;

  constructor(reportRepository: ReportRepository) {
    this.reportRepository = reportRepository;
  }

  async execute(reportId: string): Promise<Either<ErrorClass, void>> {
    return await this.reportRepository.deleteReport(reportId);
  }
}
