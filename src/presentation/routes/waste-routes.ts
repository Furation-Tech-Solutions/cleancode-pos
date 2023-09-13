// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { WasteService } from "@presentation/services/waste-services";
import { WasteDataSourceImpl } from "@data/waste/datasource/waste-data-source";
import { WasteRepositoryImpl } from "@data/waste/repositories/waste-repository-impl";
import { CreateWaste } from "@domain/waste/usecases/create-waste";
import { DeleteWaste } from "@domain/waste/usecases/delete-waste";
import { GetWasteById } from "@domain/waste/usecases/get-waste-by-id";
import { UpdateWaste } from "@domain/waste/usecases/update-waste";
import { GetAllWastes } from "@domain/waste/usecases/get-all-wastes";

// Create an instance of the WasteDataSourceImpl and pass the mongoose connection
const wasteDataSource = new WasteDataSourceImpl(mongoose.connection);

// Create an instance of the WasteRepositoryImpl and pass the WasteDataSourceImpl
const wasteRepository = new WasteRepositoryImpl(wasteDataSource);

// Create instances of the required use cases and pass the WasteRepositoryImpl
const createWasteUsecase = new CreateWaste(wasteRepository);
const getWasteByIdUsecase = new GetWasteById(wasteRepository);
const getAllWasteUsecase = new GetAllWastes(wasteRepository);
const updateWasteUsecase = new UpdateWaste(wasteRepository);
const deleteWasteUsecase = new DeleteWaste(wasteRepository);

// Initialize WasteService and inject required dependencies
const wasteService = new WasteService(
  createWasteUsecase,
  getWasteByIdUsecase,
  getAllWasteUsecase,
  updateWasteUsecase,
  deleteWasteUsecase
);

// Create an Express router
export const wasteRouter = Router();

// Route handling for creating a new waste
wasteRouter.post("/create", wasteService.createWaste.bind(wasteService));

// Route handling for getting an waste by ID
wasteRouter.get(
  "/getById/:wasteId",
  wasteService.getWasteById.bind(wasteService)
);

// Route handling for updating an waste by ID
wasteRouter.put(
  "/update/:wasteId",
  wasteService.updateWaste.bind(wasteService)
);

// Route handling for deleting an waste by ID
wasteRouter.delete(
  "/delete/:wasteId",
  wasteService.deleteWaste.bind(wasteService)
);

// Route handling for getting all wastes
wasteRouter.get("/getAllwastes", wasteService.getAllWastes.bind(wasteService));
