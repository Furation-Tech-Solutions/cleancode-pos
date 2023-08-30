// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { IngredientCategoryService } from "@presentation/services/ingredientCategory-services";
import { IngredientCategoryDataSourceImpl } from "@data/ingredientCategory/datasources/ingredientCategory-data-source";
import { IngredientCategoryRepositoryImpl } from "@data/ingredientCategory/repositories/ingredientCategory-repository-impl";
import { CreateIngredientCategory } from "@domain/ingredientCategory/usecases/create-ingredientCategory";
import { DeleteIngredientCategory } from "@domain/ingredientCategory/usecases/delete-ingredientCategory";
import { GetIngredientCategoryById } from "@domain/ingredientCategory/usecases/get-ingredientCategory-by-id";
import { GetAllIngredientCategorys } from "@domain/ingredientCategory/usecases/get-all-ingredientCategorys";
import { UpdateIngredientCategory } from "@domain/ingredientCategory/usecases/update-ingredientCategory";
import validateIngredientCategoryMiddleware from "@presentation/middlewares/ingredientCategory/validation-middleware";

// Create an instance of the IngredientCategoryDataSourceImpl and pass the mongoose connection
const ingredientCategoryDataSource = new IngredientCategoryDataSourceImpl(mongoose.connection);

// Create an instance of the IngredientCategoryRepositoryImpl and pass the IngredientCategoryDataSourceImpl
const ingredientCategoryRepository = new IngredientCategoryRepositoryImpl(ingredientCategoryDataSource);

// Create instances of the required use cases and pass the IngredientCategoryRepositoryImpl
const createIngredientCategoryUsecase = new CreateIngredientCategory(ingredientCategoryRepository);
const deleteIngredientCategoryUsecase = new DeleteIngredientCategory(ingredientCategoryRepository);
const getIngredientCategoryByIdUsecase = new GetIngredientCategoryById(ingredientCategoryRepository);
const updateIngredientCategoryUsecase = new UpdateIngredientCategory(ingredientCategoryRepository);
const getAllIngredientCategorysUsecase = new GetAllIngredientCategorys(ingredientCategoryRepository);

// Initialize IngredientCategoryService and inject required dependencies
const ingredientCategoryService = new IngredientCategoryService(
  createIngredientCategoryUsecase,
  deleteIngredientCategoryUsecase,
  getIngredientCategoryByIdUsecase,
  updateIngredientCategoryUsecase,
  getAllIngredientCategorysUsecase
);

// Create an Express router
export const ingredientCategoryRouter = Router();

// Route handling for creating a new ingredientCategory
ingredientCategoryRouter.post("/new", validateIngredientCategoryMiddleware, ingredientCategoryService.createIngredientCategory.bind(ingredientCategoryService));

// Route handling for getting an ingredientCategory by ID
ingredientCategoryRouter.get("/show/:ingredientCategoryId", ingredientCategoryService.getIngredientCategoryById.bind(ingredientCategoryService));

// Route handling for updating an ingredientCategory by ID
ingredientCategoryRouter.put("/update/:ingredientCategoryId", ingredientCategoryService.updateIngredientCategory.bind(ingredientCategoryService));

// Route handling for deleting an ingredientCategory by ID
ingredientCategoryRouter.delete("/delete/:ingredientCategoryId", ingredientCategoryService.deleteIngredientCategory.bind(ingredientCategoryService));

// Route handling for getting all ingredientCategorys
ingredientCategoryRouter.get("/list", ingredientCategoryService.getAllIngredientCategorys.bind(ingredientCategoryService));
