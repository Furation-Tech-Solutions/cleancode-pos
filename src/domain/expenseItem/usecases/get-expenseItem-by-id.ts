import { ExpenseItemModel, ExpenseItemEntity } from "@domain/expenseItem/entities/expenseItem";
import { ExpenseItemRepository } from "@domain/expenseItem/repositories/expenseItem-repository"; 
import { Either } from "monet";
import  ErrorClass  from "@presentation/error-handling/api-error";

export interface GetExpenseItemByIdUsecase {
  execute: (expenseItemId: string) => Promise<Either<ErrorClass, ExpenseItemEntity | null>>;
}

export class GetExpenseItemById implements GetExpenseItemByIdUsecase {
  private readonly expenseItemRepository: ExpenseItemRepository;

  constructor(expenseItemRepository: ExpenseItemRepository) {
    this.expenseItemRepository = expenseItemRepository;
  }

  async execute(expenseItemId: string): Promise<Either<ErrorClass, ExpenseItemEntity | null>> {
    return await this.expenseItemRepository.getExpenseItemById(expenseItemId);
  }
}
