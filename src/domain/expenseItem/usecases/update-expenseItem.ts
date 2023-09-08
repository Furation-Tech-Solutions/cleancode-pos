import { ExpenseItemModel, ExpenseItemEntity } from "@domain/expenseItem/entities/expenseItem";
import { ExpenseItemRepository } from "@domain/expenseItem/repositories/expenseItem-repository"; 
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateExpenseItemUsecase {
  execute: (
    expenseItemId: string,
    expenseItemData: ExpenseItemModel
  ) => Promise<Either<ErrorClass, ExpenseItemEntity>>;
}

export class UpdateExpenseItem implements UpdateExpenseItemUsecase {
  private readonly expenseItemRepository: ExpenseItemRepository;

  constructor(expenseItemRepository: ExpenseItemRepository) {
    this.expenseItemRepository = expenseItemRepository;
  }
  async execute(expenseItemId: string, expenseItemData: ExpenseItemModel): Promise<Either<ErrorClass, ExpenseItemEntity>> {
   return await this.expenseItemRepository.updateExpenseItem(expenseItemId, expenseItemData);
 }
}
