// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { StockAdjustmentService } from "@presentation/services/stockAdjustment-services";
import { StockAdjustmentDataSourceImpl } from "@data/stockAdjustment/datasources/stockAdjustment-data-source";
import { StockAdjustmentRepositoryImpl } from "@data/stockAdjustment/repositories/stockAdjustment-repositories-impl";
import { CreateStockAdjustment } from "@domain/stockAdjustment/usecases/create-stockAdjustment";
import { DeleteStockAdjustment } from "@domain/stockAdjustment/usecases/delete-stockAdjustment";
import { GetStockAdjustmentById } from "@domain/stockAdjustment/usecases/get-stockAdjustment-by-id";
import { GetAllStockAdjustments } from "@domain/stockAdjustment/usecases/get-all-stockAdjustments";
import { UpdateStockAdjustment } from "@domain/stockAdjustment/usecases/update-stockAdjustment";
import validateStockAdjustmentMiddleware from "@presentation/middlewares/stockAdjustment/validation-middleware";

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

// Create an instance of the StockAdjustmentDataSourceImpl and pass the mongoose connection
const stockAdjustmentDataSource = new StockAdjustmentDataSourceImpl(mongoose.connection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const stockAdjustmentRepository = new StockAdjustmentRepositoryImpl(stockAdjustmentDataSource);

// Create instances of the required use cases and pass the StockAdjustmentRepositoryImpl
const createStockAdjustmentUsecase = new CreateStockAdjustment(stockAdjustmentRepository);
const deleteStockAdjustmentUsecase = new DeleteStockAdjustment(stockAdjustmentRepository);
const getStockAdjustmentByIdUsecase = new GetStockAdjustmentById(stockAdjustmentRepository);
const updateStockAdjustmentUsecase = new UpdateStockAdjustment(stockAdjustmentRepository);
const getAllStockAdjustmentsUsecase = new GetAllStockAdjustments(stockAdjustmentRepository);

// Initialize StockAdjustmentService and inject required dependencies
const stockAdjustmentService = new StockAdjustmentService(
  createStockAdjustmentUsecase,
  deleteStockAdjustmentUsecase,
  getStockAdjustmentByIdUsecase,
  updateStockAdjustmentUsecase,
  getAllStockAdjustmentsUsecase
);

// Create an Express router
export const stockAdjustmentRouter = Router();

// Route handling for creating a new stockAdjustment
stockAdjustmentRouter.post("/new", validateStockAdjustmentMiddleware, stockAdjustmentService.createStockAdjustment.bind(stockAdjustmentService));

// Route handling for getting an StockAdjustment by ID
stockAdjustmentRouter.get("/show/:stockAdjustmentId", stockAdjustmentService.getStockAdjustmentById.bind(stockAdjustmentService));

// Route handling for updating an stockAdjustment by ID
stockAdjustmentRouter.put("/update/:stockAdjustmentId", stockAdjustmentService.updateStockAdjustment.bind(stockAdjustmentService));

// Route handling for deleting an stockAdjustment by ID
stockAdjustmentRouter.delete("/delete/:stockAdjustmentId", stockAdjustmentService.deleteStockAdjustment.bind(stockAdjustmentService));

// Route handling for getting all stockAdjustments
stockAdjustmentRouter.get("/list", stockAdjustmentService.getAllStockAdjustments.bind(stockAdjustmentService));
