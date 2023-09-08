import { ExpenseModel, ExpenseEntity } from "@domain/expense/entities/expense";
import { ExpenseRepository } from "@domain/expense/repositories/expense-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateExpenseUsecase {
  execute: (expenseData: ExpenseModel) => Promise<Either<ErrorClass, ExpenseEntity>>;
}

export class CreateExpense implements CreateExpenseUsecase {
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseData: ExpenseModel): Promise<Either<ErrorClass, ExpenseEntity>> {
    return await this.expenseRepository.createExpense(expenseData);
  }
}
