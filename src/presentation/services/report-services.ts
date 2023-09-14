import { NextFunction, Request, Response } from "express";
import {
  ReportModel,
  ReportEntity,
  ReportMapper,
} from "@domain/report/entities/report";
import { CreateReportUsecase } from "@domain/report/usecases/create-report";
import { DeleteReportUsecase } from "@domain/report/usecases/delete-report";
import { GetReportByIdUsecase } from "@domain/report/usecases/get-report-by-id";
import { UpdateReportUsecase } from "@domain/report/usecases/update-report";
import { GetAllReportsUsecase } from "@domain/report/usecases/get-all-reports";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class ReportService {
  private readonly CreateReportUsecase: CreateReportUsecase;
  private readonly DeleteReportUsecase: DeleteReportUsecase;
  private readonly GetReportByIdUsecase: GetReportByIdUsecase;
  private readonly UpdateReportUsecase: UpdateReportUsecase;
  private readonly GetAllReportsUsecase: GetAllReportsUsecase;

  constructor(
    CreateReportUsecase: CreateReportUsecase,
    DeleteReportUsecase: DeleteReportUsecase,
    GetReportByIdUsecase: GetReportByIdUsecase,
    UpdateReportUsecase: UpdateReportUsecase,
    GetAllReportsUsecase: GetAllReportsUsecase
  ) {
    this.CreateReportUsecase = CreateReportUsecase;
    this.DeleteReportUsecase = DeleteReportUsecase;
    this.GetReportByIdUsecase = GetReportByIdUsecase;
    this.UpdateReportUsecase = UpdateReportUsecase;
    this.GetAllReportsUsecase = GetAllReportsUsecase;
  }

  async createReport(req: Request, res: Response): Promise<void> {
      // Extract Report data from the request body and convert it to ReportModel
      const reportData: ReportModel = ReportMapper.toModel(req.body);

      // Call the CreateReportUsecase to create the report
      const newReport: Either<ErrorClass, ReportEntity> = await this.CreateReportUsecase.execute(
        reportData
      );

      newReport.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ReportEntity) =>{
          const responseData = ReportMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteReport(req: Request, res: Response): Promise<void> {
      const reportId: string = req.params.reportId;
    

      const updatedReportEntity: ReportEntity = ReportMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateTableUsecase to update the table
      const updatedAre: Either<ErrorClass, ReportEntity> = await this.UpdateReportUsecase.execute(
        reportId,
        updatedReportEntity
      );

      updatedAre.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ReportEntity) =>{
          const responseData = ReportMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getReportById(req: Request, res: Response): Promise<void> {
      const reportId: string = req.params.reportId;

      // Call the GetReportByIdUsecase to get the report by ID
      const report: Either<ErrorClass, ReportEntity | null> = await this.GetReportByIdUsecase.execute(
        reportId
      );

      report.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ReportEntity | null) =>{
          const responseData = ReportMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateReport(req: Request, res: Response): Promise<void> {
      const reportId: string = req.params.reportId;
      const reportData: ReportModel = req.body;

      // Get the existing report by ID
      const existingReport: Either<ErrorClass, ReportEntity | null> =
        await this.GetReportByIdUsecase.execute(reportId);

      if (!existingReport) {
        // If report is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert reportData from ReportModel to ReportEntity using ReportMapper
      const updatedReportEntity: ReportEntity = ReportMapper.toEntity(
        reportData,
        true
      );

      // Call the UpdateReportUsecase to update the Report
      const updatedReport: Either<ErrorClass, ReportEntity> = await this.UpdateReportUsecase.execute(
        reportId,
        updatedReportEntity
      );

      updatedReport.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ReportEntity) =>{
          const responseData = ReportMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllReports(req: Request, res: Response, next: NextFunction): Promise<void> {
      // Call the GetAllReportsUsecase to get all Reports
      const reports: Either<ErrorClass, ReportEntity[]> = await this.GetAllReportsUsecase.execute();
      
      reports.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: ReportEntity[]) => {
            // Filter out reports with del_status set to "Deleted"
            const nonDeletedReports = result.filter((report) => report.del_status !== false);

            // Convert non-deleted reports from an array of ReportEntity to an array of plain JSON objects using FoodCategoryMapper
            const responseData = nonDeletedReports.map((report) => ReportMapper.toEntity(report));
            return res.json(responseData);
        }
    );
  }
}
