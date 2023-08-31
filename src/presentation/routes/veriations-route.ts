// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { VeriationsService } from "@presentation/services/veriations-services";
import { VeriationsDataSourceImpl } from "@data/veriations/datasource/veriations-data-source";
import { VeriationsRepositoryImpl } from "@data/veriations/repositories/veriations-repository-impl";
import { CreateVeriations } from "@domain/veriations/usecases/create-veriations";
import { DeleteVeriations } from "@domain/veriations/usecases/delete-veriations";
import { GetVeriationsById } from "@domain/veriations/usecases/get-veriations-by-id";
import { GetAllVeriationss } from "@domain/veriations/usecases/get-all-veriations";
import { UpdateVeriations } from "@domain/veriations/usecases/update-veriations";
import validateVeriationsMiddleware from "@presentation/middlewares/veriations/validation-middleware";

// Create an instance of the VeriationsDataSourceImpl and pass the mongoose connection
const veriationsDataSource = new VeriationsDataSourceImpl(mongoose.connection);

// Create an instance of the VeriationsRepositoryImpl and pass the VeriationsDataSourceImpl
const veriationsRepository = new VeriationsRepositoryImpl(veriationsDataSource);

// Create instances of the required use cases and pass the VeriationsRepositoryImpl
const createVeriationsUsecase = new CreateVeriations(veriationsRepository);
const deleteVeriationsUsecase = new DeleteVeriations(veriationsRepository);
const getVeriationsByIdUsecase = new GetVeriationsById(veriationsRepository);
const updateVeriationsUsecase = new UpdateVeriations(veriationsRepository);
const getAllVeriationssUsecase = new GetAllVeriationss(veriationsRepository);

// Initialize VeriationsService and inject required dependencies
const veriationsService = new VeriationsService(
  createVeriationsUsecase,
  deleteVeriationsUsecase,
  getVeriationsByIdUsecase,
  updateVeriationsUsecase,
  getAllVeriationssUsecase
);

// Create an Express router
export const veriationsRouter = Router();

// Route handling for creating a new veriations
veriationsRouter.post("/new", validateVeriationsMiddleware, veriationsService.createVeriations.bind(veriationsService));

// Route handling for getting an veriations by ID
veriationsRouter.get("/show/:veriationsId", veriationsService.getVeriationsById.bind(veriationsService));

// Route handling for updating an veriations by ID
veriationsRouter.put("/update/:veriationsId", veriationsService.updateVeriations.bind(veriationsService));

// Route handling for deleting an veriations by ID
veriationsRouter.delete("/delete/:veriationsId", veriationsService.deleteVeriations.bind(veriationsService));

// Route handling for getting all veriationss
veriationsRouter.get("/list", veriationsService.getAllVeriationss.bind(veriationsService));
