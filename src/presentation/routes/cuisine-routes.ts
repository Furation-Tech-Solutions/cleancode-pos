// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { CuisineService } from "@presentation/services/cuisine-services";
import { CuisineDataSourceImpl } from "@data/cuisine/datasource/cuisine-data-source";
import { CuisineRepositoryImpl } from "@data/cuisine/repositories/cuisine-repository-impl";
import { CreateCuisine } from "@domain/cuisine/usecases/create-cuisine";
import { DeleteCuisine } from "@domain/cuisine/usecases/delete-cuisine";
import { GetCuisineById } from "@domain/cuisine/usecases/get-cuisine-by-id";
import { GetAllCuisines } from "@domain/cuisine/usecases/get-all-cuisine";
import { UpdateCuisine } from "@domain/cuisine/usecases/update-cuisine";
import validateCuisineMiddleware from "@presentation/middlewares/cuisine/validation-middleware";

// Create an instance of the CuisineDataSourceImpl and pass the mongoose connection
const cuisineDataSource = new CuisineDataSourceImpl(mongoose.connection);

// Create an instance of the CuisineRepositoryImpl and pass the CuisineDataSourceImpl
const cuisineRepository = new CuisineRepositoryImpl(cuisineDataSource);

// Create instances of the required use cases and pass the CuisineRepositoryImpl
const createCuisineUsecase = new CreateCuisine(cuisineRepository);
const deleteCuisineUsecase = new DeleteCuisine(cuisineRepository);
const getCuisineByIdUsecase = new GetCuisineById(cuisineRepository);
const updateCuisineUsecase = new UpdateCuisine(cuisineRepository);
const getAllCuisinesUsecase = new GetAllCuisines(cuisineRepository);

// Initialize CuisineService and inject required dependencies
const cuisineService = new CuisineService(
  createCuisineUsecase,
  deleteCuisineUsecase,
  getCuisineByIdUsecase,
  updateCuisineUsecase,
  getAllCuisinesUsecase
);

// Create an Express router
export const cuisineRouter = Router();

// Route handling for creating a new cuisine
cuisineRouter.post("/new", validateCuisineMiddleware, cuisineService.createCuisine.bind(cuisineService));

// Route handling for getting an cuisine by ID
cuisineRouter.get("/show/:cuisineId", cuisineService.getCuisineById.bind(cuisineService));

// Route handling for updating an cuisine by ID
cuisineRouter.put("/update/:cuisineId", cuisineService.updateCuisine.bind(cuisineService));

// Route handling for deleting an cuisine by ID
cuisineRouter.delete("/delete/:cuisineId", cuisineService.deleteCuisine.bind(cuisineService));

// Route handling for getting all cuisines
cuisineRouter.get("/list", cuisineService.getAllCuisines.bind(cuisineService));
