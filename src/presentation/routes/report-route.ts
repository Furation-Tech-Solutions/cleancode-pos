// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ReportService } from "@presentation/services/report-services";
import { ReportDataSourceImpl } from "@data/report/datasources/report-data-source";
import { ReportRepositoryImpl } from "@data/report/repositories/report-repositories-impl";
import { CreateReport } from "@domain/report/usecases/create-report";
import { DeleteReport } from "@domain/report/usecases/delete-report";
import { GetReportById } from "@domain/report/usecases/get-report-by-id";
import { GetAllReports } from "@domain/report/usecases/get-all-reports";
import { UpdateReport } from "@domain/report/usecases/update-report";
import validateReportMiddleware from "@presentation/middlewares/report/validation-middleware";

// const dbURL =
//   "mongodb+srv://mongodb+srv://satansharma:satansharma@cluster0.ncc9mtu.mongodb.net/?retryWrites=true&w=majority"; // Replace with your actual MongoDB connection URL

// // Set up the required options for the connection
// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "myDatabase", // Replace with the name of your database
//   // Other options like user and password can also be added if necessary
// };

// // Create the mongoose connection
// mongoose.connect(dbURL, dbOptions).then(() => {
//   console.log("Connected to MongoDB successfully!");
// });

// Create an instance of the ReportDataSourceImpl and pass the mongoose connection
const reportDataSource = new ReportDataSourceImpl(mongoose.connection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const reportRepository = new ReportRepositoryImpl(reportDataSource);

// Create instances of the required use cases and pass the ReportRepositoryImpl
const createReportUsecase = new CreateReport(reportRepository);
const deleteReportUsecase = new DeleteReport(reportRepository);
const getReportByIdUsecase = new GetReportById(reportRepository);
const updateReportUsecase = new UpdateReport(reportRepository);
const getAllReportsUsecase = new GetAllReports(reportRepository);

// Initialize ReportService and inject required dependencies
const reportService = new ReportService(
  createReportUsecase,
  deleteReportUsecase,
  getReportByIdUsecase,
  updateReportUsecase,
  getAllReportsUsecase
);

// Create an Express router
export const reportRouter = Router();

// Route handling for creating a new report
reportRouter.post("/new", validateReportMiddleware, reportService.createReport.bind(reportService));

// Route handling for getting an Report by ID
reportRouter.get("/show/:reportId", reportService.getReportById.bind(reportService));

// Route handling for updating an report by ID
reportRouter.put("/update/:reportId", reportService.updateReport.bind(reportService));

// Route handling for deleting an report by ID
reportRouter.delete("/delete/:reportId", reportService.deleteReport.bind(reportService));

// Route handling for getting all reports
reportRouter.get("/list", reportService.getAllReports.bind(reportService));
