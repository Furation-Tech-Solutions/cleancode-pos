// Express API request populate the Report Model
import { Date } from "mongoose";
export class ReportModel {
    constructor(
      public reportDate: Date,
      public cashier: string[] = [],
      public totalSales: number = 0,
      public totalProfit: number = 0,
      public totalTax: number = 0,
      public totalDiscount: number = 0,
      public createdAt: Date,
      public del_status: boolean

    ) {}
  }
  
  // Report Entity provided by Report Repository is converted to Express API Response
  export class ReportEntity {
    constructor( 
      public id: string | undefined = undefined, // Set a default value for id
      public reportDate: Date,
      public cashier: string[],
      public totalSales: number,
      public totalProfit: number,
      public totalTax: number,
      public totalDiscount: number,
      public createdAt: Date,
      public del_status: boolean

      ) {}
  }
  
  
  export class ReportMapper {
    static toEntity(
        reportData: any,
      includeId?: boolean,
      existingReport?: ReportEntity
    ): ReportEntity {
      if (existingReport != null) {
        // If existingReport is provided, merge the data from reportData with the existingReport
        return {
          ...existingReport,
          reportDate:
            reportData.reportDate !==undefined ? reportData.reportDate : existingReport.reportDate,
          cashier:
            reportData.cashier !== undefined? reportData.cashier : existingReport.cashier,
          totalSales:
            reportData.totalSales !==undefined ? reportData.totalSales : existingReport.totalSales,
          totalProfit:
            reportData.totalProfit !== undefined? reportData.totalProfit: existingReport.totalProfit,
          totalTax:
            reportData.totalTax !== undefined ? reportData.totalTax: existingReport.totalTax,
          totalDiscount:
            reportData.totalDiscount !== undefined ? reportData.totalDiscount: existingReport.totalDiscount,
          createdAt:
            reportData.createdAt !== undefined ? reportData.createdAt: existingReport.createdAt,
          del_status:
            reportData.del_status !==undefined ? reportData.del_status : existingReport.del_status,
        };
      } else {
        // If existingReport is not provided, create a new reportEntity using reportData
        const reportEntity: ReportEntity = {
            id: includeId ? (reportData._id ? reportData._id.toString() : undefined) : reportData._id.toString(),
            reportDate: reportData.reportDate,
            cashier: reportData.cashier,
            totalSales: reportData.totalSales,
            totalProfit: reportData.totalProfit,
            totalTax: reportData.totalTax,
            totalDiscount: reportData.totalDiscount,
            createdAt: reportData.createdAt,
            del_status: reportData.del_status,
        };
        return reportEntity;
      }
    }
    static toModel(report: ReportEntity): any {
      return {
        id: report.id,
        reportDate: report.reportDate,
        cashier: report.cashier,
        totalSales: report.totalSales,
        totalProfit: report.totalProfit,
        totalTax: report.totalTax,
        totalDiscount: report.totalDiscount,
        createdAt: report.createdAt,
        del_status: report.del_status, 
      };
    }
  }
  