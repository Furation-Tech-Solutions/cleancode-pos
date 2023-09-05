import { ExpenseModel, ExpenseEntity } from "@domain/expense/entities/expense";
import { ExpenseRepository } from "@domain/expense/repositories/expense-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllExpensesUsecase {
  execute: () => Promise<Either<ErrorClass, ExpenseEntity[]>>;
}

export class GetAllExpenses implements GetAllExpensesUsecase {
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(): Promise<Either<ErrorClass, ExpenseEntity[]>> {
    return await this.expenseRepository.getExpenses();
  }
}
