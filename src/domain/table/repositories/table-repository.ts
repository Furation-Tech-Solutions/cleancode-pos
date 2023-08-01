import { TableModel, TableEntity } from "@domain/table/entities/table";

export interface TableRepository {
  createTable(table: TableModel): Promise<TableEntity>;
  deleteTable(id: string): Promise<void>;
  updateTable(id: string, data: TableModel): Promise<TableEntity>;
  getTables(): Promise<TableEntity[]>;
  getTableById(id: string): Promise<TableEntity | null>;
}
