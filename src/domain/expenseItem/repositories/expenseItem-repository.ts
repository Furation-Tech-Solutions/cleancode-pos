import { ExpenseItemModel, ExpenseItemEntity } from "@domain/expenseItem/entities/expenseItem";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface ExpenseItemRepository {
  createExpenseItem(ExpenseItem: ExpenseItemModel): Promise<Either<ErrorClass, ExpenseItemEntity>>;
  deleteExpenseItem(id: string): Promise<Either<ErrorClass, void>>;
  updateExpenseItem(id: string, data: ExpenseItemModel): Promise<Either<ErrorClass, ExpenseItemEntity>>;
  getExpenseItems(): Promise<Either<ErrorClass, ExpenseItemEntity[]>>;
  getExpenseItemById(id: string): Promise<Either<ErrorClass, ExpenseItemEntity | null>>;
}

