// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { FoodComboService } from "@presentation/services/foodCombo-services";
import { FoodComboDataSourceImpl } from "@data/foodCombo/datasource/foodCombo-data-source";
import { FoodComboRepositoryImpl } from "@data/foodCombo/repositories/foodCombo-repository-impl";
import { CreateFoodCombo } from "@domain/foodCombo/usecases/create-foodCombo";
import { DeleteFoodCombo } from "@domain/foodCombo/usecases/delete-foodCombo";
import { GetFoodComboById } from "@domain/foodCombo/usecases/get-foodCombo-by-id";
import { GetAllFoodCombos } from "@domain/foodCombo/usecases/get-all-foodCombos";
import { UpdateFoodCombo } from "@domain/foodCombo/usecases/update-foodCombo";
import validateFoodComboMiddleware from "@presentation/middlewares/foodCombo/validation-middleware";

// Create an instance of the FoodComboDataSourceImpl and pass the mongoose connection
const foodComboDataSource = new FoodComboDataSourceImpl(mongoose.connection);

// Create an instance of the FoodComboRepositoryImpl and pass the FoodComboDataSourceImpl
const foodComboRepository = new FoodComboRepositoryImpl(foodComboDataSource);

// Create instances of the required use cases and pass the FoodComboRepositoryImpl
const createFoodComboUsecase = new CreateFoodCombo(foodComboRepository);
const deleteFoodComboUsecase = new DeleteFoodCombo(foodComboRepository);
const getFoodComboByIdUsecase = new GetFoodComboById(foodComboRepository);
const updateFoodComboUsecase = new UpdateFoodCombo(foodComboRepository);
const getAllFoodCombosUsecase = new GetAllFoodCombos(foodComboRepository);

// Initialize FoodComboService and inject required dependencies
const foodComboService = new FoodComboService(
  createFoodComboUsecase,
  deleteFoodComboUsecase,
  getFoodComboByIdUsecase,
  updateFoodComboUsecase,
  getAllFoodCombosUsecase
);

// Create an Express router
export const foodComboRouter = Router();

// Route handling for creating a new foodCombo
foodComboRouter.post("/new", validateFoodComboMiddleware, foodComboService.createFoodCombo.bind(foodComboService));

// Route handling for getting an foodCombo by ID
foodComboRouter.get("/show/:foodComboId", foodComboService.getFoodComboById.bind(foodComboService));

// Route handling for updating an foodCombo by ID
foodComboRouter.put("/update/:foodComboId", foodComboService.updateFoodCombo.bind(foodComboService));

// Route handling for deleting an foodCombo by ID
foodComboRouter.delete("/delete/:foodComboId", foodComboService.deleteFoodCombo.bind(foodComboService));

// Route handling for getting all foodCombos
foodComboRouter.get("/list", foodComboService.getAllFoodCombos.bind(foodComboService));
