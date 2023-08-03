// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { OutletService } from "@presentation/services/outlet-services";
import { OutletDataSourceImpl } from "@data/outlet/datasources/outlet-data-source";
import { OutletRepositoryImpl } from "@data/outlet/repositories/outlet-repositories-impl";
import { CreateOutlet } from "@domain/outlet/usecases/create-outlet";
import { DeleteOutlet } from "@domain/outlet/usecases/delete-outlet";
import { GetOutletById } from "@domain/outlet/usecases/get-outlet-by-id";
import { GetAllOutlets } from "@domain/outlet/usecases/get -all-outlet";
import { UpdateOutlet } from "@domain/outlet/usecases/update-outlet";

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

// Create an instance of the OutletDataSourceImpl and pass the mongoose connection
const outletDataSource = new OutletDataSourceImpl(mongoose.connection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
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
outletRouter.post("/new", outletService.createOutlet.bind(outletService));

// Route handling for getting an outlet by ID
outletRouter.get("/:outletId", outletService.getOutletById.bind(outletService));

// Route handling for updating an outlet by ID
outletRouter.put("/:outletId", outletService.updateOutlet.bind(outletService));

// Route handling for deleting an outlet by ID
outletRouter.delete("/:outletId", outletService.deleteOutlet.bind(outletService));

// Route handling for getting all outlets
outletRouter.get("/", outletService.getAllOutlets.bind(outletService));
