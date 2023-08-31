// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { PreMadeFoodService } from "@presentation/services/preMadeFood-services";
import { PreMadeFoodDataSourceImpl } from "@data/preMadeFood/datasource/preMadeFood-data-source";
import { PreMadeFoodRepositoryImpl } from "@data/preMadeFood/repositories/preMadeFood-repository-impl";
import { CreatePreMadeFood } from "@domain/preMadeFood/usecases/create-preMadeFood";
import { DeletePreMadeFood } from "@domain/preMadeFood/usecases/delete-preMadeFood";
import { GetPreMadeFoodById } from "@domain/preMadeFood/usecases/get-preMadeFood-by-id";
import { GetAllPreMadeFoods } from "@domain/preMadeFood/usecases/get-all-preMadeFoods";
import { UpdatePreMadeFood } from "@domain/preMadeFood/usecases/update-preMadeFood";
import validatePreMadeFoodMiddleware from "@presentation/middlewares/preMadeFood/validation-middleware";

// Create an instance of the PreMadeFoodDataSourceImpl and pass the mongoose connection
const preMadeFoodDataSource = new PreMadeFoodDataSourceImpl(mongoose.connection);

// Create an instance of the PreMadeFoodRepositoryImpl and pass the PreMadeFoodDataSourceImpl
const preMadeFoodRepository = new PreMadeFoodRepositoryImpl(preMadeFoodDataSource);

// Create instances of the required use cases and pass the PreMadeFoodRepositoryImpl
const createPreMadeFoodUsecase = new CreatePreMadeFood(preMadeFoodRepository);
const deletePreMadeFoodUsecase = new DeletePreMadeFood(preMadeFoodRepository);
const getPreMadeFoodByIdUsecase = new GetPreMadeFoodById(preMadeFoodRepository);
const updatePreMadeFoodUsecase = new UpdatePreMadeFood(preMadeFoodRepository);
const getAllPreMadeFoodsUsecase = new GetAllPreMadeFoods(preMadeFoodRepository);

// Initialize PreMadeFoodService and inject required dependencies
const preMadeFoodService = new PreMadeFoodService(
  createPreMadeFoodUsecase,
  deletePreMadeFoodUsecase,
  getPreMadeFoodByIdUsecase,
  updatePreMadeFoodUsecase,
  getAllPreMadeFoodsUsecase
);

// Create an Express router
export const preMadeFoodRouter = Router();

// Route handling for creating a new preMadeFood
preMadeFoodRouter.post("/new", validatePreMadeFoodMiddleware, preMadeFoodService.createPreMadeFood.bind(preMadeFoodService));

// Route handling for getting an preMadeFood by ID
preMadeFoodRouter.get("/show/:preMadeFoodId", preMadeFoodService.getPreMadeFoodById.bind(preMadeFoodService));

// Route handling for updating an preMadeFood by ID
preMadeFoodRouter.put("/update/:preMadeFoodId", preMadeFoodService.updatePreMadeFood.bind(preMadeFoodService));

// Route handling for deleting an preMadeFood by ID
preMadeFoodRouter.delete("/delete/:preMadeFoodId", preMadeFoodService.deletePreMadeFood.bind(preMadeFoodService));

// Route handling for getting all preMadeFoods
preMadeFoodRouter.get("/list", preMadeFoodService.getAllPreMadeFoods.bind(preMadeFoodService));
