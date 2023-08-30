// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { FoodMenuService } from "@presentation/services/foodMenu-services";
import { FoodMenuDataSourceImpl } from "@data/foodMenu/datasource/foodMenu-data-source";
import { FoodMenuRepositoryImpl } from "@data/foodMenu/repositories/foodMenu-repository-impl";
import { CreateFoodMenu } from "@domain/foodMenu/usecases/create-foodMenu";
import { DeleteFoodMenu } from "@domain/foodMenu/usecases/delete-foodMenu";
import { GetFoodMenuById } from "@domain/foodMenu/usecases/get-foodMenu-by-id";
import { GetAllFoodMenus } from "@domain/foodMenu/usecases/get-all-foodMenus";
import { UpdateFoodMenu } from "@domain/foodMenu/usecases/update-foodMenu";
import validateFoodMenuMiddleware from "@presentation/middlewares/foodMenu/validation-middleware";

// Create an instance of the FoodMenuDataSourceImpl and pass the mongoose connection
const foodMenuDataSource = new FoodMenuDataSourceImpl(mongoose.connection);

// Create an instance of the FoodMenuRepositoryImpl and pass the FoodMenuDataSourceImpl
const foodMenuRepository = new FoodMenuRepositoryImpl(foodMenuDataSource);

// Create instances of the required use cases and pass the FoodMenuRepositoryImpl
const createFoodMenuUsecase = new CreateFoodMenu(foodMenuRepository);
const deleteFoodMenuUsecase = new DeleteFoodMenu(foodMenuRepository);
const getFoodMenuByIdUsecase = new GetFoodMenuById(foodMenuRepository);
const updateFoodMenuUsecase = new UpdateFoodMenu(foodMenuRepository);
const getAllFoodMenusUsecase = new GetAllFoodMenus(foodMenuRepository);

// Initialize FoodMenuService and inject required dependencies
const foodMenuService = new FoodMenuService(
  createFoodMenuUsecase,
  deleteFoodMenuUsecase,
  getFoodMenuByIdUsecase,
  updateFoodMenuUsecase,
  getAllFoodMenusUsecase
);

// Create an Express router
export const foodMenuRouter = Router();

// Route handling for creating a new foodMenu
foodMenuRouter.post("/new", validateFoodMenuMiddleware, foodMenuService.createFoodMenu.bind(foodMenuService));

// Route handling for getting an foodMenu by ID
foodMenuRouter.get("/show/:foodMenuId", foodMenuService.getFoodMenuById.bind(foodMenuService));

// Route handling for updating an foodMenu by ID
foodMenuRouter.put("/update/:foodMenuId", foodMenuService.updateFoodMenu.bind(foodMenuService));

// Route handling for deleting an foodMenu by ID
foodMenuRouter.delete("/delete/:foodMenuId", foodMenuService.deleteFoodMenu.bind(foodMenuService));

// Route handling for getting all foodMenus
foodMenuRouter.get("/list", foodMenuService.getAllFoodMenus.bind(foodMenuService));
