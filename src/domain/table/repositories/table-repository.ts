import { TableModel, TableEntity } from "@domain/table/entities/table";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface TableRepository {
  createTable(personName: TableModel): Promise<Either<ErrorClass, TableEntity>>;
  deleteTable(id: string): Promise<Either<ErrorClass, void>>;
  updateTable(id: string, data: TableModel): Promise<Either<ErrorClass, TableEntity>>;
  getTables(): Promise<Either<ErrorClass, TableEntity[]>>;
  getTableById(id: string): Promise<Either<ErrorClass, TableEntity | null>>;
}
