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
kitchenRouter.get("/:kitchenId", kitchenService.getTableById.bind(kitchenService));

// Route handling for updating an kitchen by ID
kitchenRouter.put("/:kitchenId", kitchenService.updateKitchen.bind(kitchenService));

// Route handling for deleting an kitchen by ID
kitchenRouter.delete("/:kitchenId", kitchenService.deleteKitchen.bind(kitchenService));

// Route handling for getting all kitchens
kitchenRouter.get("/", kitchenService.getAllKitchens.bind(kitchenService));
