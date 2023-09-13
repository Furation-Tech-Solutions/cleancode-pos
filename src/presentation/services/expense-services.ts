import { NextFunction, Request, Response } from "express";
import {
  ExpenseModel,
  ExpenseEntity,
  ExpenseMapper,
} from "@domain/expense/entities/expense";
import { CreateExpenseUsecase } from "@domain/expense/usecases/create-expense";
import { DeleteExpenseUsecase } from "@domain/expense/usecases/delete-expense";
import { GetExpenseByIdUsecase } from "@domain/expense/usecases/get-expense-by-id";
import { UpdateExpenseUsecase } from "@domain/expense/usecases/update-expense";
import { GetAllExpensesUsecase } from "@domain/expense/usecases/get-all-expenses";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class ExpenseService {
  private readonly createExpenseUsecase: CreateExpenseUsecase;
  private readonly deleteExpenseUsecase: DeleteExpenseUsecase;
  private readonly getExpenseByIdUsecase: GetExpenseByIdUsecase;
  private readonly updateExpenseUsecase: UpdateExpenseUsecase;
  private readonly getAllExpensesUsecase: GetAllExpensesUsecase;

  constructor(
    createExpenseUsecase: CreateExpenseUsecase,
    deleteExpenseUsecase: DeleteExpenseUsecase,
    getExpenseByIdUsecase: GetExpenseByIdUsecase,
    updateExpenseUsecase: UpdateExpenseUsecase,
    getAllExpensesUsecase: GetAllExpensesUsecase
  ) {
    this.createExpenseUsecase = createExpenseUsecase;
    this.deleteExpenseUsecase = deleteExpenseUsecase;
    this.getExpenseByIdUsecase = getExpenseByIdUsecase;
    this.updateExpenseUsecase = updateExpenseUsecase;
    this.getAllExpensesUsecase = getAllExpensesUsecase;
  }

  async createExpense(req: Request, res: Response): Promise<void> {
      
      // Extract expense data from the request body and convert it to ExpenseModel
      const expenseData: ExpenseModel = ExpenseMapper.toModel(req.body);

      // Call the createExpenseUsecase to create the expense
      const newExpense: Either<ErrorClass, ExpenseEntity> = await this.createExpenseUsecase.execute(
        expenseData
      );

      newExpense.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseEntity) =>{
          const responseData = ExpenseMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }
  

  async deleteExpense(req: Request, res: Response): Promise<void> {
    
      const expenseId: string = req.params.expenseId;
    

      const updatedExpenseEntity: ExpenseEntity = ExpenseMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateExpenseUsecase to update the Expense
      const updatedExpense: Either<ErrorClass, ExpenseEntity> = await this.updateExpenseUsecase.execute(
        expenseId,
        updatedExpenseEntity
      );

      updatedExpense.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseEntity) =>{
          const responseData = ExpenseMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getExpenseById(req: Request, res: Response): Promise<void> {
      const expenseId: string = req.params.expenseId;

      // Call the GetExpenseByIdUsecase to get the expense by ID
      const expense: Either<ErrorClass, ExpenseEntity | null> = await this.getExpenseByIdUsecase.execute(
        expenseId
      );

      expense.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseEntity | null) =>{
          const responseData = ExpenseMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateExpense(req: Request, res: Response): Promise<void> {
    
      const expenseId: string = req.params.expenseId;
      const expenseData: ExpenseModel = req.body;

      // Get the existing Expense by ID
      const existingExpense: Either<ErrorClass, ExpenseEntity | null> =
        await this.getExpenseByIdUsecase.execute(expenseId);

      if (!existingExpense) {
        // If expense is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert expensefData from ExpenseModel to ExpenseEntity using ExpenseMapper
      const updatedExpenseEntity: ExpenseEntity = ExpenseMapper.toEntity(
        expenseData,
        true,
      );

      // Call the UpdateExpenseUsecase to update the Expense
      const updatedExpense: Either<ErrorClass, ExpenseEntity> = await this.updateExpenseUsecase.execute(
        expenseId,
        updatedExpenseEntity
      );

      updatedExpense.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseEntity) =>{
          const responseData = ExpenseMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllExpensesUsecase to get all Expenses
      const expenses: Either<ErrorClass, ExpenseEntity[]> = await this.getAllExpensesUsecase.execute();

      expenses.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: ExpenseEntity[]) => {
            // Filter out expenses with del_status set to "Deleted"
            const nonDeletedExpenses = result.filter((expense) => expense.del_status !== false);

            // Convert non-deleted expenses from an array of ExpenseEntity to an array of plain JSON objects using ExpenseMapper
            const responseData = nonDeletedExpenses.map((expense) => ExpenseMapper.toEntity(expense));
            return res.json(responseData);
        }
    );
  }
}
