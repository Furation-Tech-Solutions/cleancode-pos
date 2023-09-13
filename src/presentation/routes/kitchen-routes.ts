// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { KitchenService } from "@presentation/services/kitchen-services";
import { KitchenDataSourceImpl } from "@data/kitchen/datasources/kitchen-data-source";
// import { KitchenRepositoryImpl } from "@data/kitchen/repositories/kitchen-repositories-impl";
import { CreateKitchen } from "@domain/kitchen/usecases/create-kitchen";
import { DeleteKitchen } from "@domain/kitchen/usecases/delete-kitchen";
import { GetKitchenById } from "@domain/kitchen/usecases/get-kitchen-by-id";
import { GetAllKitchens } from "@domain/kitchen/usecases/get-all-kitchen";
import { UpdateKitchen } from "@domain/kitchen/usecases/update-kitchen";
import validateKitchenMiddleware from "@presentation/middlewares/kitchen/validation-middleware";
import { KitchenRepowsitoryImpl } from "@data/kitchen/repositories/kitchen-repositories-impl";


// Create an instance of the KitchenDataSourceImpl and pass the mongoose connection
const kitchenDataSource = new KitchenDataSourceImpl(mongoose.connection);

// Create an instance of the KitchenRepositoryImpl and pass the KitchenDataSourceImpl
const kitchenRepository = new KitchenRepowsitoryImpl(kitchenDataSource);

// Create instances of the required use cases and pass the KitchenRepositoryImpl
const createKitchenUsecase = new CreateKitchen(kitchenRepository);
const deleteKitchenUsecase = new DeleteKitchen(kitchenRepository);
const getKitchenByIdUsecase = new GetKitchenById(kitchenRepository);
const updateKitchenUsecase = new UpdateKitchen(kitchenRepository);
const getAllKitchensUsecase = new GetAllKitchens(kitchenRepository);

// Initialize KitchenService and inject required dependencies
const kitchenService = new KitchenService(
  createKitchenUsecase,
  deleteKitchenUsecase,
  getKitchenByIdUsecase,
  updateKitchenUsecase,
  getAllKitchensUsecase
);

// Create an Express router
export const kitchenRouter = Router();

// Route handling for creating a new kitchen
kitchenRouter.post("/new", validateKitchenMiddleware,kitchenService.createKitchen.bind(kitchenService));

// Route handling for getting an kitchen by ID
kitchenRouter.get("/show/:kitchenId", kitchenService.getTableById.bind(kitchenService));

// Route handling for updating an kitchen by ID
kitchenRouter.put("/update/:kitchenId", kitchenService.updateKitchen.bind(kitchenService));

// Route handling for deleting an kitchen by ID
kitchenRouter.delete("/delete/:kitchenId", kitchenService.deleteKitchen.bind(kitchenService));

// Route handling for getting all kitchens
kitchenRouter.get("/list", kitchenService.getAllKitchens.bind(kitchenService));
