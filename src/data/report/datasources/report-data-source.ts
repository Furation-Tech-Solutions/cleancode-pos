import { ReportModel, ReportEntity } from "@domain/report/entities/report";
import { Report } from "../models/report-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface ReportDataSource {
  create(report: ReportModel): Promise<any>; // Return type should be Promise of ReportEntity
  update(id: string, report: ReportModel): Promise<any>; // Return type should be Promise of ReportEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of ReportEntity or null
  getAllReports(): Promise<any[]>; // Return type should be Promise of an array of ReportEntity
}

export class ReportDataSourceImpl implements ReportDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(report: ReportModel): Promise<any> {
    // const existingReport = await Report.findOne({outletCode_byId: report.outletCode_byId});
    // if (existingReport) {
    //   throw ApiError.reportNameExists()
    // }

    const reportData = new Report(report);

    const createReport = await reportData.save();
    
    return createReport.toObject();
  }

  async update(id: string, report: ReportModel): Promise<any> {
    const updatedReport = await Report.findByIdAndUpdate(id, report, {
      new: true,
    }); // No need for conversion here
    return updatedReport ? updatedReport.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Report.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const report = await Report.findById(id);
    return report ? report.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllReports(): Promise<any[]> {
    const reports = await Report.find();
    return reports.map((report) => report.toObject()); // Convert to plain JavaScript objects before returning
  }
}
