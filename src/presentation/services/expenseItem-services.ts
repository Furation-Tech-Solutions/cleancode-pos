import { NextFunction, Request, Response } from "express";
import {
  ExpenseItemModel,
  ExpenseItemEntity,
  ExpenseItemMapper,
} from "@domain/expenseItem/entities/expenseItem";
import { CreateExpenseItemUsecase } from "@domain/expenseItem/usecases/create-expenseItem";
import { DeleteExpenseItemUsecase } from "@domain/expenseItem/usecases/delete-expenseItem";
import { GetExpenseItemByIdUsecase } from "@domain/expenseItem/usecases/get-expenseItem-by-id";
import { UpdateExpenseItemUsecase } from "@domain/expenseItem/usecases/update-expenseItem";
import { GetAllExpenseItemsUsecase } from "@domain/expenseItem/usecases/get-all-expenseItems";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class ExpenseItemService {
  private readonly createExpenseItemUsecase: CreateExpenseItemUsecase;
  private readonly deleteExpenseItemUsecase: DeleteExpenseItemUsecase;
  private readonly getExpenseItemByIdUsecase: GetExpenseItemByIdUsecase;
  private readonly updateExpenseItemUsecase: UpdateExpenseItemUsecase;
  private readonly getAllExpenseItemsUsecase: GetAllExpenseItemsUsecase;

  constructor(
    createExpenseItemUsecase: CreateExpenseItemUsecase,
    deleteExpenseItemUsecase: DeleteExpenseItemUsecase,
    getExpenseItemByIdUsecase: GetExpenseItemByIdUsecase,
    updateExpenseItemUsecase: UpdateExpenseItemUsecase,
    getAllExpenseItemsUsecase: GetAllExpenseItemsUsecase
  ) {
    this.createExpenseItemUsecase = createExpenseItemUsecase;
    this.deleteExpenseItemUsecase = deleteExpenseItemUsecase;
    this.getExpenseItemByIdUsecase = getExpenseItemByIdUsecase;
    this.updateExpenseItemUsecase = updateExpenseItemUsecase;
    this.getAllExpenseItemsUsecase = getAllExpenseItemsUsecase;
  }

  async createExpenseItem(req: Request, res: Response): Promise<void> {
      
      // Extract expenseItem data from the request body and convert it to ExpenseItemModel
      const expenseItemData: ExpenseItemModel = ExpenseItemMapper.toModel(req.body);

      // Call the createExpenseItemUsecase to create the expenseItem
      const newExpenseItem: Either<ErrorClass, ExpenseItemEntity> = await this.createExpenseItemUsecase.execute(
        expenseItemData
      );

      newExpenseItem.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseItemEntity) =>{
          const responseData = ExpenseItemMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async deleteExpenseItem(req: Request, res: Response): Promise<void> {
    
      const expenseItemId: string = req.params.expenseItemId;
    

      const updatedExpenseItemEntity: ExpenseItemEntity = ExpenseItemMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateExpenseItemUsecase to update the expenseItem
      const updatedExpenseItem: Either<ErrorClass, ExpenseItemEntity> = await this.updateExpenseItemUsecase.execute(
        expenseItemId,
        updatedExpenseItemEntity
      );

      updatedExpenseItem.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseItemEntity) =>{
          const responseData = ExpenseItemMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getExpenseItemById(req: Request, res: Response): Promise<void> {
      const expenseItemId: string = req.params.expenseItemId;

      // Call the GetExpenseItemByIdUsecase to get the expenseItem by ID
      const expenseItem: Either<ErrorClass, ExpenseItemEntity | null> = await this.getExpenseItemByIdUsecase.execute(
        expenseItemId
      );

      expenseItem.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseItemEntity | null) =>{
          const responseData = ExpenseItemMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateExpenseItem(req: Request, res: Response): Promise<void> {
    
      const expenseItemId: string = req.params.expenseItemId;
      const expenseItemData: ExpenseItemModel = req.body;

      // Get the existing expenseItem by ID
      const existingExpenseItem: Either<ErrorClass, ExpenseItemEntity | null> =
        await this.getExpenseItemByIdUsecase.execute(expenseItemId);

      if (!existingExpenseItem) {
        // If expenseItem is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert expenseItemData from ExpenseItemModel to ExpenseItemEntity using ExpenseItemMapper
      const updatedExpenseItemEntity: ExpenseItemEntity = ExpenseItemMapper.toEntity(
        expenseItemData,
        true,
      );

      // Call the UpdateExpenseItemUsecase to update the expenseItem
      const updatedExpenseItem: Either<ErrorClass, ExpenseItemEntity> = await this.updateExpenseItemUsecase.execute(
        expenseItemId,
        updatedExpenseItemEntity
      );

      updatedExpenseItem.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: ExpenseItemEntity) =>{
          const responseData = ExpenseItemMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getAllExpenseItems(req: Request, res: Response, next: NextFunction): Promise<void> {
    
      // Call the GetAllExpenseItemsUsecase to get all expenseItems
      const expenseItems: Either<ErrorClass, ExpenseItemEntity[]> = await this.getAllExpenseItemsUsecase.execute();

      expenseItems.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: ExpenseItemEntity[]) => {
            // Filter out expenseItems with del_status set to "Deleted"
            const nonDeletedExpenseItems = result.filter((expenseItem) => expenseItem.del_status !== false);

            // Convert non-deleted expenseItems from an array of ExpenseItemEntity to an array of plain JSON objects using ExpenseItemMapper
            const responseData = nonDeletedExpenseItems.map((expenseItem) => ExpenseItemMapper.toEntity(expenseItem));
            return res.json(responseData);
        }
    );
  }
}
