import {type ExpenseItemRepository } from "@domain/expenseItem/repositories/expenseItem-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface DeleteExpenseItemUsecase {
  execute: (expenseItemId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteExpenseItem implements DeleteExpenseItemUsecase {
  private readonly expenseItemRepository: ExpenseItemRepository;

  constructor(expenseItemRepository: ExpenseItemRepository) {
    this.expenseItemRepository = expenseItemRepository;
  }

  async execute(expenseItemId: string): Promise<Either<ErrorClass, void>> {
    return await this.expenseItemRepository.deleteExpenseItem(expenseItemId);
  }
}
