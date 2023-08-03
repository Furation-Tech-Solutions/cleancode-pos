import { NextFunction, Request, Response } from "express";
import {
  TableModel,
  TableEntity,
  TableMapper,
} from "@domain/table/entities/table";
import { CreateTableUsecase } from "@domain/table/usecases/create-table";
import { DeleteTableUsecase } from "@domain/table/usecases/delete-table";
import { GetTableByIdUsecase } from "@domain/table/usecases/get-table-by-id";
import { UpdateTableUsecase } from "@domain/table/usecases/update-table";
import { GetAllTablesUsecase } from "@domain/table/usecases/get-all-tables";
import ApiError from "@presentation/error-handling/api-error";

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
    try {
      
      // Extract table data from the request body and convert it to TableModel
      const tableData: TableModel = TableMapper.toModel(req.body);

      // Call the CreateTableUsecase to create the table
      const newTable: TableEntity = await this.createTableUsecase.execute(
        tableData
      );

      // Convert newTable from TableEntity to the desired format using TableMapper
      const responseData = TableMapper.toEntity(newTable, true);

      // Send the created table as a JSON response
      res.json(responseData);

    } catch (error) {

      if(error instanceof ApiError){
       res.status(error.status).json({ error: error.message });
      }

         ApiError.internalError()
    }
  }

  // async deleteTable(req: Request, res: Response): Promise<void> {
  //   try {
  //     const tableId: string = req.params.TableId;
  
  //     // Get the existing table by ID
  //     const existingTable: TableModel | null = await this.GetTableByIdUsecase.execute(tableId);
  
  //     if (!existingTable) {
  //       // If table is not found, send a not found message as a JSON response
  //       ApiError.notFound();
  //       return;
  //     }
  
  //     // Update the del_status to "Deleted"
  //     existingTable.del_status = "Deleted";
  
  //     // Save the updated table back to the database
  //     // await existingTable.save();
  //     const updatedTable: TableEntity = await this.UpdateTableUsecase.execute(
  //       tableId,
  //       existingTable
  //     );

  //     // Convert updatedTable from TableEntity to plain JSON object using TableMapper
  //     const responseData = TableMapper.toModel(updatedTable);
  
  //     // Send a success message as a JSON response
  //     res.json({ message: "Table deleted successfully.",responseData });
  //   } catch (error) {
  //     console.log(error);
  //     if (error instanceof ApiError) {
  //       res.status(error.status).json({ error: error.message });
  //     } else {
  //       ApiError.internalError();
  //     }
  //   }
  // }

  async deleteTable(req: Request, res: Response): Promise<void> {
    try {
      const tableId: string = req.params.tableId;

      // Call the DeleteTableUsecase to delete the table
      await this.deleteTableUsecase.execute(tableId);

      // Send a success message as a JSON response
      res.json({ message: "Table deleted successfully." });
    } catch (error) {

      //console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
         ApiError.internalError();
      
    }
  }

  async getTableById(req: Request, res: Response): Promise<void> {
    try {
      const tableId: string = req.params.tableId;

      // Call the GetTableByIdUsecase to get the table by ID
      const table: TableEntity | null = await this.getTableByIdUsecase.execute(
        tableId
      );

      if (table) {
        // Convert table from TableEntity to plain JSON object using TableMapper
        const responseData = TableMapper.toModel(table);

        // Send the table as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        ApiError.notFound()
      }
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
       
    }
  }

  async updateTable(req: Request, res: Response): Promise<void> {
    try {
      const tableId: string = req.params.tableId;
      const tableData: TableModel = req.body;

      // Get the existing table by ID
      const existingTable: TableEntity | null =
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
        existingTable
      );

      // Call the UpdateTableUsecase to update the table
      const updatedTable: TableEntity = await this.updateTableUsecase.execute(
        tableId,
        updatedTableEntity
      );

      // Convert updatedTable from TableEntity to plain JSON object using TableMapper
      const responseData = TableMapper.toModel(updatedTable);

      // Send the updated table as a JSON response
      res.json(responseData);
    } catch (error) {

      console.log(error);
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }

  async getAllTables(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      // Call the GetAllTablesUsecase to get all tables
      const tables: TableEntity[] = await this.getAllTablesUsecase.execute();

      // Convert tables from an array of TableEntity to an array of plain JSON objects using TableMapper
      const responseData = tables.map((table) => TableMapper.toModel(table));

      // Send the tables as a JSON response
      res.json(responseData);
    } catch (error) {
      if(error instanceof ApiError){
        res.status(error.status).json({ error: error.message });
       }
          ApiError.internalError()
    }
  }
}