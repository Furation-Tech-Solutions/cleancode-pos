// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { IngredientUnitService } from "@presentation/services/ingredientUnit-services";
import { IngredientUnitDataSourceImpl } from "@data/ingredientUnit/datasources/ingredientUnit-data-source";
import { IngredientUnitRepositoryImpl } from "@data/ingredientUnit/repositories/ingredientUnit-repository-impl";
import { CreateIngredientUnit } from "@domain/ingredientUnit/usecases/create-ingredientUnit";
import { DeleteIngredientUnit } from "@domain/ingredientUnit/usecases/delete-ingredientUnit";
import { GetIngredientUnitById } from "@domain/ingredientUnit/usecases/get-ingredientUnit-by-id";
import { GetAllIngredientUnits } from "@domain/ingredientUnit/usecases/get-all-ingredientUnits";
import { UpdateIngredientUnit } from "@domain/ingredientUnit/usecases/update-ingredientUnit";
import validateIngredientUnitMiddleware from "@presentation/middlewares/ingredientUnit/validation-middleware";

// Create an instance of the IngredientUnitDataSourceImpl and pass the mongoose connection
const ingredientUnitDataSource = new IngredientUnitDataSourceImpl(mongoose.connection);

// Create an instance of the IngredientUnitRepositoryImpl and pass the IngredientUnitDataSourceImpl
const ingredientUnitRepository = new IngredientUnitRepositoryImpl(ingredientUnitDataSource);

// Create instances of the required use cases and pass the IngredientUnitRepositoryImpl
const createIngredientUnitUsecase = new CreateIngredientUnit(ingredientUnitRepository);
const deleteIngredientUnitUsecase = new DeleteIngredientUnit(ingredientUnitRepository);
const getIngredientUnitByIdUsecase = new GetIngredientUnitById(ingredientUnitRepository);
const updateIngredientUnitUsecase = new UpdateIngredientUnit(ingredientUnitRepository);
const getAllIngredientUnitsUsecase = new GetAllIngredientUnits(ingredientUnitRepository);

// Initialize IngredientUnitService and inject required dependencies
const ingredientUnitService = new IngredientUnitService(
  createIngredientUnitUsecase,
  deleteIngredientUnitUsecase,
  getIngredientUnitByIdUsecase,
  updateIngredientUnitUsecase,
  getAllIngredientUnitsUsecase
);

// Create an Express router
export const ingredientUnitRouter = Router();

// Route handling for creating a new ingredientUnit
ingredientUnitRouter.post("/new", validateIngredientUnitMiddleware, ingredientUnitService.createIngredientUnit.bind(ingredientUnitService));

// Route handling for getting an ingredientUnit by ID
ingredientUnitRouter.get("/show/:ingredientUnitId", ingredientUnitService.getIngredientUnitById.bind(ingredientUnitService));

// Route handling for updating an ingredientUnit by ID
ingredientUnitRouter.put("/update/:ingredientUnitId", ingredientUnitService.updateIngredientUnit.bind(ingredientUnitService));

// Route handling for deleting an ingredientUnit by ID
ingredientUnitRouter.delete("/delete/:ingredientUnitId", ingredientUnitService.deleteIngredientUnit.bind(ingredientUnitService));

// Route handling for getting all ingredientUnits
ingredientUnitRouter.get("/list", ingredientUnitService.getAllIngredientUnits.bind(ingredientUnitService));
