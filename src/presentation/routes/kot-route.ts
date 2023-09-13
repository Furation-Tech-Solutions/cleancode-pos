// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { KotService } from "@presentation/services/kot-serivces";
import { KotDataSourceImpl } from "@data/kot/datasources/kot-data-sources";
import { KotRepositoryImpl } from "@data/kot/repositories/kot-reposiotries-impl";
import { CreateKot } from "@domain/kot/usecases/create-kot";
import { DeleteKot } from "@domain/kot/usecases/delete-kot";
import { GetKotById } from "@domain/kot/usecases/get-kot-by-id";
import { GetAllKot } from "@domain/kot/usecases/get-all-kot";
import { UpdateKot } from "@domain/kot/usecases/update-kot";

// Create an instance of the KotDataSourceImpl and pass the mongoose connection
const kotDataSource = new KotDataSourceImpl(mongoose.connection);

// Create an instance of the KotRepositoryImpl and pass the KotDataSourceImpl
const kotRepository = new KotRepositoryImpl(kotDataSource);

// Create instances of the required use cases and pass the KotRepositoryImpl
const createKotUsecase = new CreateKot(kotRepository);
const deleteKotUsecase = new DeleteKot(kotRepository);
const getKotByIdUsecase = new GetKotById(kotRepository);
const updateKotUsecase = new UpdateKot(kotRepository);
const getAllKotUsecase = new GetAllKot(kotRepository);

// Initialize KotService and inject required dependencies
const kotService = new KotService(
  createKotUsecase,
  getAllKotUsecase,
  getKotByIdUsecase,
  updateKotUsecase,
  deleteKotUsecase
);

// Create an Express router
export const kotRouter = Router();

// Route handling for creating a new kot
kotRouter.post(
  "/create",
  kotService.createKot.bind(kotService)
);

// Route handling for getting an kot by ID
kotRouter.get("/getById/:kotId", kotService.getKotById.bind(kotService));

// Route handling for updating an kot by ID
kotRouter.put("/update/:kotId", kotService.updateKot.bind(kotService));

// Route handling for deleting an kot by ID
kotRouter.delete("/delete/:kotId", kotService.deleteKot.bind(kotService));

// Route handling for getting all Kot
kotRouter.get("/getAllKot", kotService.getAllKot.bind(kotService));
