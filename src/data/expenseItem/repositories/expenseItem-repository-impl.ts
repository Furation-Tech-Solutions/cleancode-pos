import { ExpenseItemModel, ExpenseItemEntity } from "@domain/expenseItem/entities/expenseItem";
import { ExpenseItemRepository } from "@domain/expenseItem/repositories/expenseItem-repository"; 
import { ExpenseItemDataSource } from "@data/expenseItem/datasource/expenseItem-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class ExpenseItemRepositoryImpl implements ExpenseItemRepository {
  private readonly dataSource: ExpenseItemDataSource;

  constructor(dataSource: ExpenseItemDataSource) {
    this.dataSource = dataSource;
  }

  async createExpenseItem(expenseItem: ExpenseItemModel): Promise<Either<ErrorClass, ExpenseItemEntity>> {
    // return await this.dataSource.create(expenseItem);
    try {
      let i = await this.dataSource.create(expenseItem);
      return Right<ErrorClass, ExpenseItemEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "expenseItemName_conflict"){
        return Left<ErrorClass, ExpenseItemEntity>(ApiError.expenseItemNameExists());
      }
      return Left<ErrorClass, ExpenseItemEntity>(ApiError.badRequest());
    }
  }

  async deleteExpenseItem(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateExpenseItem(id: string, data: ExpenseItemModel): Promise<Either<ErrorClass, ExpenseItemEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, ExpenseItemEntity>(i);
    } catch {
      return Left<ErrorClass, ExpenseItemEntity>(ApiError.badRequest());
    }
  }

  async getExpenseItems(): Promise<Either<ErrorClass, ExpenseItemEntity[]>> {
    // return await this.dataSource.getAllExpenseItems();
    try {
      let i = await this.dataSource.getAllExpenseItems();
      return Right<ErrorClass, ExpenseItemEntity[]>(i);
    } catch {
      return Left<ErrorClass, ExpenseItemEntity[]>(ApiError.badRequest());
    }
  }

  async getExpenseItemById(id: string): Promise<Either<ErrorClass, ExpenseItemEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, ExpenseItemEntity | null>(i);
    } catch {
      return Left<ErrorClass, ExpenseItemEntity | null>(ApiError.badRequest());
    }
  }
}
