import { ExpenseItemModel, ExpenseItemEntity } from "@domain/expenseItem/entities/expenseItem";
import { ExpenseItemRepository } from "@domain/expenseItem/repositories/expenseItem-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetAllExpenseItemsUsecase {
  execute: () => Promise<Either<ErrorClass, ExpenseItemEntity[]>>;
}

export class GetAllExpenseItems implements GetAllExpenseItemsUsecase {
  private readonly expenseItemRepository: ExpenseItemRepository;

  constructor(expenseItemRepository: ExpenseItemRepository) {
    this.expenseItemRepository = expenseItemRepository;
  }

  async execute(): Promise<Either<ErrorClass, ExpenseItemEntity[]>> {
    return await this.expenseItemRepository.getExpenseItems();
  }
}
