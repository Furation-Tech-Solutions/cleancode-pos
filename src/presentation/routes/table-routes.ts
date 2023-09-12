// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { TableService } from "@presentation/services/table-services";
import { TableDataSourceImpl } from "@data/table/datasources/table-data-source";
import { TableRepositoryImpl } from "@data/table/repositories/table-repository-impl";
import { CreateTable } from "@domain/table/usecases/create-table";
import { DeleteTable } from "@domain/table/usecases/delete-table";
import { GetTableById } from "@domain/table/usecases/get-table-by-id";
import { GetAllTables } from "@domain/table/usecases/get-all-tables";
import { UpdateTable } from "@domain/table/usecases/update-table";
// import { TableModel } from "@domain/table/entities/table";
import validateTableMiddleware from "@presentation/middlewares/table/validation-middleware";

// Create an instance of the TableDataSourceImpl and pass the mongoose connection
const tableDataSource = new TableDataSourceImpl(mongoose.connection);

// Create an instance of the TableRepositoryImpl and pass the TableDataSourceImpl
const tableRepository = new TableRepositoryImpl(tableDataSource);

// Create instances of the required use cases and pass the TableRepositoryImpl
const createTableUsecase = new CreateTable(tableRepository);
const deleteTableUsecase = new DeleteTable(tableRepository);
const getTableByIdUsecase = new GetTableById(tableRepository);
const updateTableUsecase = new UpdateTable(tableRepository);
const getAllTablesUsecase = new GetAllTables(tableRepository);

// Initialize TableService and inject required dependencies
const tableService = new TableService(
  createTableUsecase,
  deleteTableUsecase,
  getTableByIdUsecase,
  updateTableUsecase,
  getAllTablesUsecase
);

// Create an Express router
export const tableRouter = Router();

// Route handling for creating a new table
// tableRouter.post("/new", tableService.createTable.bind(tableService));
tableRouter.post("/new", validateTableMiddleware, tableService.createTable.bind(tableService));


// Route handling for getting an table by ID
tableRouter.get("/show/:tableId", tableService.getTableById.bind(tableService));

// Route handling for updating an table by ID
tableRouter.put("/update/:tableId", tableService.updateTable.bind(tableService));

// Route handling for deleting an table by ID
tableRouter.delete("/delete/:tableId", tableService.deleteTable.bind(tableService));

// Route handling for getting all tables
tableRouter.get("/list", tableService.getAllTables.bind(tableService));
