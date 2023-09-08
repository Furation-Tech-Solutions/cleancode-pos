import { ExpenseItemModel, ExpenseItemEntity } from "@domain/expenseItem/entities/expenseItem";
import { ExpenseItemRepository } from "@domain/expenseItem/repositories/expenseItem-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateExpenseItemUsecase {
  execute: (expenseItemData: ExpenseItemModel) => Promise<Either<ErrorClass, ExpenseItemEntity>>;
}

export class CreateExpenseItem implements CreateExpenseItemUsecase {
  private readonly expenseItemRepository: ExpenseItemRepository;

  constructor(expenseItemRepository: ExpenseItemRepository) {
    this.expenseItemRepository = expenseItemRepository;
  }

  async execute(expenseItemData: ExpenseItemModel): Promise<Either<ErrorClass, ExpenseItemEntity>> {
    return await this.expenseItemRepository.createExpenseItem(expenseItemData);
  }
}
