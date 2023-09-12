// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ExpenseService } from "@presentation/services/expense-services";
import { ExpenseDataSourceImpl } from "@data/expense/datasource/expense-data-source";
import { ExpenseRepositoryImpl } from "@data/expense/repositories/expense-repository-impl";
import { CreateExpense } from "@domain/expense/usecases/create-expense";
import { DeleteExpense } from "@domain/expense/usecases/delete-expense";
import { GetExpenseById } from "@domain/expense/usecases/get-expense-by-id";
import { GetAllExpenses } from "@domain/expense/usecases/get-all-expenses";
import { UpdateExpense } from "@domain/expense/usecases/update-expense";
import validateExpenseMiddleware from "@presentation/middlewares/expense/validation-middleware";

// Create an instance of the ExpenseDataSourceImpl and pass the mongoose connection
const expenseDataSource = new ExpenseDataSourceImpl(mongoose.connection);

// Create an instance of the ExpenseRepositoryImpl and pass the ExpenseDataSourceImpl
const expenseRepository = new ExpenseRepositoryImpl(expenseDataSource);

// Create instances of the required use cases and pass the ExpenseRepositoryImpl
const createExpenseUsecase = new CreateExpense(expenseRepository);
const deleteExpenseUsecase = new DeleteExpense(expenseRepository);
const getExpenseByIdUsecase = new GetExpenseById(expenseRepository);
const updateExpenseUsecase = new UpdateExpense(expenseRepository);
const getAllExpensesUsecase = new GetAllExpenses(expenseRepository);

// Initialize ExpenseService and inject required dependencies
const expenseService = new ExpenseService(
  createExpenseUsecase,
  deleteExpenseUsecase,
  getExpenseByIdUsecase,
  updateExpenseUsecase,
  getAllExpensesUsecase
);

// Create an Express router
export const expenseRouter = Router();

// Route handling for creating a new expense
expenseRouter.post("/new", validateExpenseMiddleware, expenseService.createExpense.bind(expenseService));

// Route handling for getting an expense by ID
expenseRouter.get("/show/:expenseId", expenseService.getExpenseById.bind(expenseService));

// Route handling for updating an expense by ID
expenseRouter.put("/update/:expenseId", expenseService.updateExpense.bind(expenseService));

// Route handling for deleting an expense by ID
expenseRouter.delete("/delete/:expenseId", expenseService.deleteExpense.bind(expenseService));

// Route handling for getting all expenses
expenseRouter.get("/list", expenseService.getAllExpenses.bind(expenseService));
