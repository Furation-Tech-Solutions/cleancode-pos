// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { FoodCategoryService } from "@presentation/services/foodCategory-services";
import { FoodCategoryDataSourceImpl } from "@data/foodCategory/datasources/foodCategory-data-source";
import { FoodCategoryRepositoryImpl } from "@data/foodCategory/repositories/foodCategory-repository-impl";
import { CreateFoodCategory } from "@domain/foodCategory/usecases/create-foodCategory";
import { DeleteFoodCategory } from "@domain/foodCategory/usecases/delete-foodCategory";
import { GetFoodCategoryById } from "@domain/foodCategory/usecases/get-foodCategory-by-id";
import { GetAllFoodCategorys } from "@domain/foodCategory/usecases/get-all-foodCategorys";
import { UpdateFoodCategory } from "@domain/foodCategory/usecases/update-foodCategory";
// import { FoodCategoryModel } from "@domain/foodCategory/entities/foodCategory";
import validateFoodCategoryMiddleware from "@presentation/middlewares/foodCategory/validation-middleware";

// Create an instance of the FoodCategoryDataSourceImpl and pass the mongoose connection
const foodCategoryDataSource = new FoodCategoryDataSourceImpl(mongoose.connection);

// Create an instance of the FoodCategoryRepositoryImpl and pass the FoodCategoryDataSourceImpl
const foodCategoryRepository = new FoodCategoryRepositoryImpl(foodCategoryDataSource);

// Create instances of the required use cases and pass the FoodCategoryRepositoryImpl
const createFoodCategoryUsecase = new CreateFoodCategory(foodCategoryRepository);
const deleteFoodCategoryUsecase = new DeleteFoodCategory(foodCategoryRepository);
const getFoodCategoryByIdUsecase = new GetFoodCategoryById(foodCategoryRepository);
const updateFoodCategoryUsecase = new UpdateFoodCategory(foodCategoryRepository);
const getAllFoodCategorysUsecase = new GetAllFoodCategorys(foodCategoryRepository);

// Initialize FoodCategoryService and inject required dependencies
const foodCategoryService = new FoodCategoryService(
  createFoodCategoryUsecase,
  deleteFoodCategoryUsecase,
  getFoodCategoryByIdUsecase,
  updateFoodCategoryUsecase,
  getAllFoodCategorysUsecase
);

// Create an Express router
export const foodCategoryRouter = Router();

// Route handling for creating a new foodCategory
// foodCategoryRouter.post("/new", foodCategoryService.createFoodCategory.bind(foodCategoryService));
foodCategoryRouter.post("/new", validateFoodCategoryMiddleware, foodCategoryService.createFoodCategory.bind(foodCategoryService));


// Route handling for getting an foodCategory by ID
foodCategoryRouter.get("/show/:foodCategoryId", foodCategoryService.getFoodCategoryById.bind(foodCategoryService));

// Route handling for updating an foodCategory by ID
foodCategoryRouter.put("/update/:foodCategoryId", foodCategoryService.updateFoodCategory.bind(foodCategoryService));

// Route handling for deleting an foodCategory by ID
foodCategoryRouter.delete("/delete/:foodCategoryId", foodCategoryService.deleteFoodCategory.bind(foodCategoryService));

// Route handling for getting all foodCategorys
foodCategoryRouter.get("/list", foodCategoryService.getAllFoodCategorys.bind(foodCategoryService));
