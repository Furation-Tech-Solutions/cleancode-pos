import { TableEntity, TableModel } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
export interface UpdateTableUsecase {
  execute: (tableId: string,
    tableData: TableModel
  ) => Promise<Either<ErrorClass, TableEntity>>;
}

export class UpdateTable implements UpdateTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }
   async execute(tableId: string, tableData: TableModel): Promise<Either<ErrorClass, TableEntity>> {
    return await this.tableRepository.updateTable(tableId, tableData);
  }
}
