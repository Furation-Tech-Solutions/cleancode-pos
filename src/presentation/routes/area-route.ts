// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { AreaService } from "@presentation/services/area-services";
import { AreaDataSourceImpl } from "@data/area/datasources/area-data-source";
import { AreaRepositoryImpl } from "@data/area/repositories/area-repositories-impl";
import { CreateArea } from "@domain/area/usecases/create-area";
import { DeleteArea } from "@domain/area/usecases/delete-area";
import { GetAreaById } from "@domain/area/usecases/get-area-by-id";
import { GetAllAreas } from "@domain/area/usecases/get-all-area";
import { UpdateArea } from "@domain/area/usecases/update-area";
import validateAreaMiddleware from "@presentation/middlewares/area/validation-middleware";

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

// Create an instance of the AreaDataSourceImpl and pass the mongoose connection
const areaDataSource = new AreaDataSourceImpl(mongoose.connection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const areaRepository = new AreaRepositoryImpl(areaDataSource);

// Create instances of the required use cases and pass the AreaRepositoryImpl
const createAreaUsecase = new CreateArea(areaRepository);
const deleteAreaUsecase = new DeleteArea(areaRepository);
const getAreaByIdUsecase = new GetAreaById(areaRepository);
const updateAreaUsecase = new UpdateArea(areaRepository);
const getAllAreasUsecase = new GetAllAreas(areaRepository);

// Initialize AreaService and inject required dependencies
const areaService = new AreaService(
  createAreaUsecase,
  deleteAreaUsecase,
  getAreaByIdUsecase,
  updateAreaUsecase,
  getAllAreasUsecase
);

// Create an Express router
export const areaRouter = Router();

// Route handling for creating a new area
areaRouter.post("/new", validateAreaMiddleware, areaService.createArea.bind(areaService));

// Route handling for getting an Area by ID
areaRouter.get("/show/:areaId", areaService.getAreaById.bind(areaService));

// Route handling for updating an area by ID
areaRouter.put("/update/:areaId", areaService.updateArea.bind(areaService));

// Route handling for deleting an area by ID
areaRouter.delete("/delete/:areaId", areaService.deleteArea.bind(areaService));

// Route handling for getting all areas
areaRouter.get("/list", areaService.getAllAreas.bind(areaService));
