import { ExpenseModel, ExpenseEntity } from "@domain/expense/entities/expense";
import { ExpenseRepository } from "@domain/expense/repositories/expense-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetExpenseByIdUsecase {
  execute: (expenseId: string) => Promise<Either<ErrorClass, ExpenseEntity | null>>;
}

export class GetExpenseById implements GetExpenseByIdUsecase {
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseId: string): Promise<Either<ErrorClass, ExpenseEntity | null>> {
    return await this.expenseRepository.getExpenseById(expenseId);
  }
}
