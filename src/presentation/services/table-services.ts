import { NextFunction, Request, Response } from "express";
import { TableModel, TableEntity, TableMapper } from "@domain/table/entities/table";
import { CreateTableUsecase } from "@domain/table/usecases/create-table";
import { DeleteTableUsecase } from "@domain/table/usecases/delete-table";
import { GetTableByIdUsecase } from "@domain/table/usecases/get-table-by-id";
import { UpdateTableUsecase } from "@domain/table/usecases/update-table";
import { GetAllTablesUsecase } from "@domain/table/usecases/get-all-tables";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export class TableService {
  private readonly createTableUsecase: CreateTableUsecase;
  private readonly deleteTableUsecase: DeleteTableUsecase;
  private readonly getTableByIdUsecase: GetTableByIdUsecase;
  private readonly updateTableUsecase: UpdateTableUsecase;
  private readonly getAllTablesUsecase: GetAllTablesUsecase;

  constructor(
    createTableUsecase: CreateTableUsecase,
    deleteTableUsecase: DeleteTableUsecase,
    getTableByIdUsecase: GetTableByIdUsecase,
    updateTableUsecase: UpdateTableUsecase,
    getAllTablesUsecase: GetAllTablesUsecase
  ) {
    this.createTableUsecase = createTableUsecase;
    this.deleteTableUsecase = deleteTableUsecase;
    this.getTableByIdUsecase = getTableByIdUsecase;
    this.updateTableUsecase = updateTableUsecase;
    this.getAllTablesUsecase = getAllTablesUsecase;
  }

  async createTable(req: Request, res: Response): Promise<void> {
    // Extract Table data from the request body and convert it to TableModel    
    const tableData: TableModel = TableMapper.toModel(req.body);

    // Call the createTableUsecase to create the Table
    const newTable: Either<ErrorClass, TableEntity> = await this.createTableUsecase.execute(
      tableData
    );

    newTable.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: TableEntity) =>{
        const responseData = TableMapper.toEntity(result, true);
        return res.json(responseData)
      }
    )
  }

  async deleteTable(req: Request, res: Response): Promise<void> {
      const tableId: string = req.params.tableId;
      // const tableData: TableModel = req.body;
    

      const updatedTableEntity: TableEntity = TableMapper.toEntity(
        { del_status: false },
        true
      );
      
      // Call the UpdateTableUsecase to update the table
      const updatedTable: Either<ErrorClass, TableEntity> = await this.updateTableUsecase.execute(
        tableId,
        updatedTableEntity
      );

      updatedTable.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: TableEntity) =>{
          const responseData = TableMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }

  async getTableById(req: Request, res: Response): Promise<void> {
      const tableId: string = req.params.tableId;

      // Call the GetTableByIdUsecase to get the table by ID
      const table: Either<ErrorClass, TableEntity | null> = await this.getTableByIdUsecase.execute(
        tableId
      );

      table.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: TableEntity | null) =>{
          const responseData = TableMapper.toEntity(result, true);
          return res.json(responseData)
        }
      )
  }

  async updateTable(req: Request, res: Response): Promise<void> {
      const tableId: string = req.params.tableId;
      const tableData: TableModel = req.body;

      // Get the existing table by ID
      const existingTable: Either<ErrorClass, TableEntity | null> =
        await this.getTableByIdUsecase.execute(tableId);

      if (!existingTable) {
        // If table is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert tableData from TableModel to TableEntity using TableMapper
      const updatedTableEntity: TableEntity = TableMapper.toEntity(
        tableData,
        true,
        // existingTable
      );

      // Call the UpdateTableUsecase to update the table
      const updatedTable: Either<ErrorClass, TableEntity> = await this.updateTableUsecase.execute(
        tableId,
        updatedTableEntity
      );

      updatedTable.cata(
        (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
        (result: TableEntity) =>{
          const responseData = TableMapper.toModel(result);
          return res.json(responseData)
        }
      )
  }


  async getAllTables(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Call the GetAllTablesUsecase to get all tables
    const tables: Either<ErrorClass, TableEntity[]> = await this.getAllTablesUsecase.execute();

    tables.cata(
        (error: ErrorClass) => res.status(error.status).json({ error: error.message }),
        (result: TableEntity[]) => {
            // Filter out tables with del_status set to "Deleted"
            const nonDeletedTables = result.filter((table) => table.del_status !== false);

            // Convert non-deleted tables from an array of TableEntity to an array of plain JSON objects using TableMapper
            const responseData = nonDeletedTables.map((table) => TableMapper.toEntity(table));
            return res.json(responseData);
        }
    );
}

}