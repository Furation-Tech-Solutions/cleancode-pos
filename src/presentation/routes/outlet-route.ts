// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { OutletService } from "@presentation/services/outlet-services";
import { OutletDataSourceImpl } from "@data/outlet/datasources/outlet-data-source";
import { OutletRepositoryImpl } from "@data/outlet/repositories/outlet-repository-impl";
import { CreateOutlet } from "@domain/outlet/usecases/create-outlet";
import { DeleteOutlet } from "@domain/outlet/usecases/delete-outlet";
import { GetOutletById } from "@domain/outlet/usecases/get-outlet-by-id";
import { GetAllOutlets } from "@domain/outlet/usecases/get-all-outlet";
import { UpdateOutlet } from "@domain/outlet/usecases/update-outlet";
import validateOutletMiddleware from "@presentation/middlewares/outlet/validation-middleware";

// Create an instance of the outletDataSourceImpl and pass the mongoose connection
const outletDataSource = new OutletDataSourceImpl(mongoose.connection);

// Create an instance of the outletRepositoryImpl and pass the outletDataSourceImpl
const outletRepository = new OutletRepositoryImpl(outletDataSource);

// Create instances of the required use cases and pass the OutletRepositoryImpl
const createOutletUsecase = new CreateOutlet(outletRepository);
const deleteOutletUsecase = new DeleteOutlet(outletRepository);
const getOutletByIdUsecase = new GetOutletById(outletRepository);
const updateOutletUsecase = new UpdateOutlet(outletRepository);
const getAllOutletsUsecase = new GetAllOutlets(outletRepository);

// Initialize OutletService and inject required dependencies
const outletService = new OutletService(
  createOutletUsecase,
  deleteOutletUsecase,
  getOutletByIdUsecase,
  updateOutletUsecase,
  getAllOutletsUsecase
);

// Create an Express router
export const outletRouter = Router();

// Route handling for creating a new outlet
outletRouter.post("/new", validateOutletMiddleware, outletService.createOutlet.bind(outletService));

// Route handling for getting an outlet by ID
outletRouter.get("/show/:outletId", outletService.getOutletById.bind(outletService));

// Route handling for updating an outlet by ID
outletRouter.put("/update/:outletId", outletService.updateOutlet.bind(outletService));

// Route handling for deleting an outlet by ID
outletRouter.delete("/delete/:outletId", outletService.deleteOutlet.bind(outletService));

// Route handling for getting all outlets
outletRouter.get("/list", outletService.getAllOutlets.bind(outletService));
