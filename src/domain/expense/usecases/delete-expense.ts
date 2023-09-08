import {type ExpenseRepository } from "@domain/expense/repositories/expense-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteExpenseUsecase {
  execute: (expenseId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteExpense implements DeleteExpenseUsecase {
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseId: string): Promise<Either<ErrorClass, void>> {
    return await this.expenseRepository.deleteExpense(expenseId);
  }
}
