import { ExpenseModel, ExpenseEntity } from "@domain/expense/entities/expense";
import { ExpenseRepository } from "@domain/expense/repositories/expense-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateExpenseUsecase {
  execute: (
    expenseId: string,
    expenseData: ExpenseModel
  ) => Promise<Either<ErrorClass, ExpenseEntity>>;
}

export class UpdateExpense implements UpdateExpenseUsecase {
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }
  async execute(expenseId: string, expenseData: ExpenseModel): Promise<Either<ErrorClass, ExpenseEntity>> {
   return await this.expenseRepository.updateExpense(expenseId, expenseData);
 }
}
