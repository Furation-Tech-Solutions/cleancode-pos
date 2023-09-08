// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ExpenseItemService } from "@presentation/services/expenseItem-services";
import { ExpenseItemDataSourceImpl } from "@data/expenseItem/datasource/expenseItem-data-source";
import { ExpenseItemRepositoryImpl } from "@data/expenseItem/repositories/expenseItem-repository-impl";
import { CreateExpenseItem } from "@domain/expenseItem/usecases/create-expenseItem";
import { DeleteExpenseItem } from "@domain/expenseItem/usecases/delete-expenseItem";
import { GetExpenseItemById } from "@domain/expenseItem/usecases/get-expenseItem-by-id";
import { GetAllExpenseItems } from "@domain/expenseItem/usecases/get-all-expenseItems";
import { UpdateExpenseItem } from "@domain/expenseItem/usecases/update-expenseItem";
import validateExpenseItemMiddleware from "@presentation/middlewares/expenseItem/validation-middleware";

// Create an instance of the ExpenseItemDataSourceImpl and pass the mongoose connection
const expenseItemDataSource = new ExpenseItemDataSourceImpl(mongoose.connection);

// Create an instance of the ExpenseItemRepositoryImpl and pass the ExpenseItemDataSourceImpl
const expenseItemRepository = new ExpenseItemRepositoryImpl(expenseItemDataSource);

// Create instances of the required use cases and pass the ExpenseItemRepositoryImpl
const createExpenseItemUsecase = new CreateExpenseItem(expenseItemRepository);
const deleteExpenseItemUsecase = new DeleteExpenseItem(expenseItemRepository);
const getExpenseItemByIdUsecase = new GetExpenseItemById(expenseItemRepository);
const updateExpenseItemUsecase = new UpdateExpenseItem(expenseItemRepository);
const getAllExpenseItemsUsecase = new GetAllExpenseItems(expenseItemRepository);

// Initialize ExpenseItemService and inject required dependencies
const expenseItemService = new ExpenseItemService(
  createExpenseItemUsecase,
  deleteExpenseItemUsecase,
  getExpenseItemByIdUsecase,
  updateExpenseItemUsecase,
  getAllExpenseItemsUsecase
);

// Create an Express router
export const expenseItemRouter = Router();

// Route handling for creating a new expenseItem
expenseItemRouter.post("/new", validateExpenseItemMiddleware, expenseItemService.createExpenseItem.bind(expenseItemService));

// Route handling for getting an expenseItem by ID
expenseItemRouter.get("/show/:expenseItemId", expenseItemService.getExpenseItemById.bind(expenseItemService));

// Route handling for updating an expenseItem by ID
expenseItemRouter.put("/update/:expenseItemId", expenseItemService.updateExpenseItem.bind(expenseItemService));

// Route handling for deleting an expenseItem by ID
expenseItemRouter.delete("/delete/:expenseItemId", expenseItemService.deleteExpenseItem.bind(expenseItemService));

// Route handling for getting all expenseItems
expenseItemRouter.get("/list", expenseItemService.getAllExpenseItems.bind(expenseItemService));
