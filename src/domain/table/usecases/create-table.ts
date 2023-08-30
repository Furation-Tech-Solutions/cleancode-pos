import { TableEntity, TableModel } from "@domain/table/entities/table";
import { TableRepository } from "@domain/table/repositories/table-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface CreateTableUsecase {
  execute: (tableData: TableModel) => Promise<Either<ErrorClass, TableEntity>>;
}

export class CreateTable implements CreateTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableData: TableModel): Promise<Either<ErrorClass, TableEntity>> {
    return await this.tableRepository.createTable(tableData);
  }
}
