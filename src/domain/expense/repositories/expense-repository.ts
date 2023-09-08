import { ExpenseModel, ExpenseEntity } from "@domain/expense/entities/expense";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface ExpenseRepository {
  createExpense(expense: ExpenseModel): Promise<Either<ErrorClass, ExpenseEntity>>;
  deleteExpense(id: string): Promise<Either<ErrorClass, void>>;
  updateExpense(id: string, data: ExpenseModel): Promise<Either<ErrorClass, ExpenseEntity>>;
  getExpenses(): Promise<Either<ErrorClass, ExpenseEntity[]>>;
  getExpenseById(id: string): Promise<Either<ErrorClass, ExpenseEntity | null>>;
}

