import { ExpenseModel, ExpenseEntity } from "@domain/expense/entities/expense";
import { ExpenseRepository } from "@domain/expense/repositories/expense-repository"; 
import { ExpenseDataSource } from "@data/expense/datasource/expense-data-source";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";

export class ExpenseRepositoryImpl implements ExpenseRepository {
  private readonly dataSource: ExpenseDataSource;

  constructor(dataSource: ExpenseDataSource) {
    this.dataSource = dataSource;
  }

  async createExpense(expense: ExpenseModel): Promise<Either<ErrorClass, ExpenseEntity>> {
    // return await this.dataSource.create(expense);
    try {
      let i = await this.dataSource.create(expense);
      return Right<ErrorClass, ExpenseEntity>(i);
    } catch (e) {
      if(e instanceof ApiError && e.name === "unAuthorized"){
        return Left<ErrorClass, ExpenseEntity>(ApiError.unAuthorized());
      }
      return Left<ErrorClass, ExpenseEntity>(ApiError.badRequest());
    }
  }

  async deleteExpense(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    
    try {
      let i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateExpense(id: string, data: ExpenseModel): Promise<Either<ErrorClass, ExpenseEntity>> {
    // return await this.dataSource.update(id, data);
    try {
      let i = await this.dataSource.update(id, data);
      return Right<ErrorClass, ExpenseEntity>(i);
    } catch {
      return Left<ErrorClass, ExpenseEntity>(ApiError.badRequest());
    }
  }

  async getExpenses(): Promise<Either<ErrorClass, ExpenseEntity[]>> {
    // return await this.dataSource.getAllExpenses();
    try {
      let i = await this.dataSource.getAllExpenses();
      return Right<ErrorClass, ExpenseEntity[]>(i);
    } catch {
      return Left<ErrorClass, ExpenseEntity[]>(ApiError.badRequest());
    }
  }

  async getExpenseById(id: string): Promise<Either<ErrorClass, ExpenseEntity | null>> {
    // return await this.dataSource.read(id);
    try {
      let i = await this.dataSource.read(id);
      return Right<ErrorClass, ExpenseEntity | null>(i);
    } catch {
      return Left<ErrorClass, ExpenseEntity | null>(ApiError.badRequest());
    }
  }
}
