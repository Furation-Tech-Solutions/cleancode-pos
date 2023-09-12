// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { IngredientService } from "@presentation/services/ingredient-services";
import { IngredientDataSourceImpl } from "@data/ingredient/datasources/ingredient-data-source";
import { IngredientRepositoryImpl } from "@data/ingredient/repositories/ingredient-repository-impl";
import { CreateIngredient } from "@domain/ingredient/usecases/create-ingredient";
import { DeleteIngredient } from "@domain/ingredient/usecases/delete-ingredient";
import { GetIngredientById } from "@domain/ingredient/usecases/get-ingredient-by-id";
import { GetAllIngredients } from "@domain/ingredient/usecases/get-all-ingredients";
import { UpdateIngredient } from "@domain/ingredient/usecases/update-ingredient";
import validateIngredientMiddleware from "@presentation/middlewares/ingredient/validation-middleware";

// Create an instance of the IngredientDataSourceImpl and pass the mongoose connection
const ingredientDataSource = new IngredientDataSourceImpl(mongoose.connection);

// Create an instance of the IngredientRepositoryImpl and pass the IngredientDataSourceImpl
const ingredientRepository = new IngredientRepositoryImpl(ingredientDataSource);

// Create instances of the required use cases and pass the IngredientRepositoryImpl
const createIngredientUsecase = new CreateIngredient(ingredientRepository);
const deleteIngredientUsecase = new DeleteIngredient(ingredientRepository);
const getIngredientByIdUsecase = new GetIngredientById(ingredientRepository);
const updateIngredientUsecase = new UpdateIngredient(ingredientRepository);
const getAllIngredientsUsecase = new GetAllIngredients(ingredientRepository);

// Initialize IngredientService and inject required dependencies
const ingredientService = new IngredientService(
  createIngredientUsecase,
  deleteIngredientUsecase,
  getIngredientByIdUsecase,
  updateIngredientUsecase,
  getAllIngredientsUsecase
);

// Create an Express router
export const ingredientRouter = Router();

// Route handling for creating a new ingredient
ingredientRouter.post("/new", validateIngredientMiddleware, ingredientService.createIngredient.bind(ingredientService));

// Route handling for getting an ingredient by ID
ingredientRouter.get("/show/:ingredientId", ingredientService.getIngredientById.bind(ingredientService));

// Route handling for updating an ingredient by ID
ingredientRouter.put("/update/:ingredientId", ingredientService.updateIngredient.bind(ingredientService));

// Route handling for deleting an ingredient by ID
ingredientRouter.delete("/delete/:ingredientId", ingredientService.deleteIngredient.bind(ingredientService));

// Route handling for getting all ingredient
ingredientRouter.get("/list", ingredientService.getAllIngredients.bind(ingredientService));
